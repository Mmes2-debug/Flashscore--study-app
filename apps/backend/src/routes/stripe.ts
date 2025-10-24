import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import Stripe from 'stripe';
import Payment from '../models/Payment';

const MINIMUM_AGE_FOR_PAYMENTS = 18;
const MINIMUM_AGE_WITH_CONSENT = 13;
const MAX_MINOR_TRANSACTION = 50;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-09-30.clover',
});

interface CreatePaymentIntentBody {
  amount: number;
  currency?: string;
  description?: string;
  userAge?: number;
  isMinor?: boolean;
  parentalConsent?: boolean;
  userId: string;
}

interface ConfirmPaymentBody {
  paymentIntentId: string;
  userId: string;
}

interface WebhookRequest extends FastifyRequest {
  rawBody?: Buffer;
}

const stripeRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * POST /create-payment-intent
   * Create a Stripe Payment Intent
   */
  fastify.post<{ Body: CreatePaymentIntentBody }>(
    '/create-payment-intent',
    async (request, reply) => {
      try {
        const { amount, currency = 'USD', description, userAge, isMinor, parentalConsent, userId } = request.body;

        // Validate amount
        if (!amount || amount <= 0) {
          return reply.status(400).send({
            success: false,
            error: 'Valid amount is required',
          });
        }

        // Validate userId
        if (!userId) {
          return reply.status(400).send({
            success: false,
            error: 'User ID is required',
          });
        }

        // Age verification
        if (userAge !== undefined) {
          // Block payments for users under 13
          if (userAge < MINIMUM_AGE_WITH_CONSENT) {
            return reply.status(403).send({
              success: false,
              error: `Payment processing is not available for users under ${MINIMUM_AGE_WITH_CONSENT} years old`,
              code: 'AGE_RESTRICTION_UNDERAGE',
              requiredAge: MINIMUM_AGE_WITH_CONSENT,
            });
          }

          // Require parental consent for 13-17
          if (userAge < MINIMUM_AGE_FOR_PAYMENTS && !parentalConsent) {
            return reply.status(403).send({
              success: false,
              error: 'Parental consent required for payment processing',
              code: 'PARENTAL_CONSENT_REQUIRED',
              requiredAge: MINIMUM_AGE_FOR_PAYMENTS,
              currentAge: userAge,
            });
          }

          // Enforce transaction limits for minors
          if (userAge < MINIMUM_AGE_FOR_PAYMENTS && amount > MAX_MINOR_TRANSACTION) {
            return reply.status(403).send({
              success: false,
              error: `Transaction amount exceeds limit for minors. Maximum: $${MAX_MINOR_TRANSACTION}`,
              code: 'MINOR_AMOUNT_LIMIT_EXCEEDED',
              maxAmount: MAX_MINOR_TRANSACTION,
            });
          }
        }

        // Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency: currency.toLowerCase(),
          description: description || 'Payment',
          metadata: {
            userId,
            userAge: userAge?.toString() || '',
            isMinor: isMinor?.toString() || 'false',
            parentalConsent: parentalConsent?.toString() || 'false',
          },
        });

        // Create payment record in database
        await Payment.create({
          userId,
          amount,
          currency: currency.toUpperCase(),
          status: 'pending',
          provider: 'stripe',
          providerTransactionId: paymentIntent.id,
          description,
          isMinorTransaction: userAge ? userAge < MINIMUM_AGE_FOR_PAYMENTS : false,
          ageVerified: userAge !== undefined,
          userAge,
          parentalConsent,
          metadata: {
            stripePaymentIntentId: paymentIntent.id,
          },
        });

        return reply.send({
          success: true,
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Failed to create payment intent',
        });
      }
    }
  );

  /**
   * POST /confirm-payment
   * Confirm a payment and update status
   */
  fastify.post<{ Body: ConfirmPaymentBody }>(
    '/confirm-payment',
    async (request, reply) => {
      try {
        const { paymentIntentId, userId } = request.body;

        if (!paymentIntentId || !userId) {
          return reply.status(400).send({
            success: false,
            error: 'Payment Intent ID and User ID are required',
          });
        }

        // Retrieve the payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        // Update payment status in database
        const payment = await Payment.findOneAndUpdate(
          { providerTransactionId: paymentIntentId, userId },
          {
            status: paymentIntent.status === 'succeeded' ? 'succeeded' : paymentIntent.status === 'canceled' ? 'cancelled' : 'failed',
            metadata: {
              stripePaymentIntentId: paymentIntent.id,
              stripeStatus: paymentIntent.status,
              updatedAt: new Date().toISOString(),
            },
          },
          { new: true }
        );

        if (!payment) {
          return reply.status(404).send({
            success: false,
            error: 'Payment not found',
          });
        }

        return reply.send({
          success: true,
          payment: {
            id: payment._id,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            createdAt: payment.createdAt,
          },
        });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Failed to confirm payment',
        });
      }
    }
  );

  /**
   * GET /transactions/:userId
   * Get user's payment history
   */
  fastify.get<{ Params: { userId: string }; Querystring: { limit?: string; status?: string } }>(
    '/transactions/:userId',
    async (request, reply) => {
      try {
        const { userId } = request.params;
        const { limit = '50', status } = request.query;

        const query: any = { userId };
        if (status) {
          query.status = status;
        }

        const payments = await Payment.find(query)
          .sort({ createdAt: -1 })
          .limit(parseInt(limit))
          .select('-metadata -__v');

        return reply.send({
          success: true,
          data: payments,
          count: payments.length,
        });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Failed to fetch transactions',
        });
      }
    }
  );

  /**
   * POST /webhook
   * Handle Stripe webhooks
   */
  fastify.post(
    '/webhook',
    async (request: WebhookRequest, reply: FastifyReply) => {
      try {
        const sig = request.headers['stripe-signature'] as string;
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!webhookSecret) {
          request.log.warn('Stripe webhook secret not configured');
          return reply.status(400).send({ error: 'Webhook secret not configured' });
        }

        let event: Stripe.Event;

        try {
          event = stripe.webhooks.constructEvent(
            request.rawBody || request.body as any,
            sig,
            webhookSecret
          );
        } catch (err: any) {
          request.log.error(`Webhook signature verification failed: ${err.message}`);
          return reply.status(400).send({ error: `Webhook Error: ${err.message}` });
        }

        // Handle the event
        switch (event.type) {
          case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            await Payment.findOneAndUpdate(
              { providerTransactionId: paymentIntent.id },
              { status: 'succeeded' }
            );
            request.log.info(`Payment succeeded: ${paymentIntent.id}`);
            break;
          }

          case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            await Payment.findOneAndUpdate(
              { providerTransactionId: paymentIntent.id },
              { status: 'failed' }
            );
            request.log.info(`Payment failed: ${paymentIntent.id}`);
            break;
          }

          case 'payment_intent.canceled': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            await Payment.findOneAndUpdate(
              { providerTransactionId: paymentIntent.id },
              { status: 'cancelled' }
            );
            request.log.info(`Payment cancelled: ${paymentIntent.id}`);
            break;
          }

          default:
            request.log.info(`Unhandled event type: ${event.type}`);
        }

        return reply.send({ received: true });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({
          success: false,
          error: 'Webhook processing failed',
        });
      }
    }
  );
};

export default stripeRoutes;
