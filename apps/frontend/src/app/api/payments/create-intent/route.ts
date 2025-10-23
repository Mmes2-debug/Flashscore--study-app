import { NextRequest, NextResponse } from 'next/server';

const MINIMUM_AGE_FOR_PAYMENTS = 18;
const MINIMUM_AGE_WITH_CONSENT = 13;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'USD', description, userAge, isMinor, parentalConsent } = body;

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }

    // Age verification
    let verifiedAge: number | undefined = userAge;

    if (verifiedAge !== undefined) {
      // Block payments for users under 13
      if (verifiedAge < MINIMUM_AGE_WITH_CONSENT) {
        return NextResponse.json({
          error: `Payment processing not available for users under ${MINIMUM_AGE_WITH_CONSENT}`,
          code: 'AGE_RESTRICTION_UNDERAGE',
          requiredAge: MINIMUM_AGE_WITH_CONSENT
        }, { status: 403 });
      }

      // Require parental consent for 13-17
      if (verifiedAge < MINIMUM_AGE_FOR_PAYMENTS && !parentalConsent) {
        return NextResponse.json({
          error: 'Parental consent required',
          code: 'PARENTAL_CONSENT_REQUIRED',
          requiredAge: MINIMUM_AGE_FOR_PAYMENTS
        }, { status: 403 });
      }
    }

    // Create payment intent (mock for now - integrate with Stripe in production)
    const paymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      status: 'requires_payment_method',
      created: Math.floor(Date.now() / 1000)
    };

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      age_verified: verifiedAge !== undefined,
      is_minor_transaction: verifiedAge && verifiedAge < MINIMUM_AGE_FOR_PAYMENTS,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}