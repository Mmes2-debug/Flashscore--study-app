"use client";

import React, { useState } from 'react';

/**
 * Stripe Payment Form Component
 * 
 * IMPORTANT: This is a DEMO component. For production use, you MUST:
 * 
 * 1. Install Stripe.js:
 *    npm install @stripe/stripe-js @stripe/react-stripe-js
 * 
 * 2. Wrap your app with StripeProvider:
 *    import { loadStripe } from '@stripe/stripe-js';
 *    import { Elements } from '@stripe/react-stripe-js';
 *    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
 *    <Elements stripe={stripePromise}>
 *      <StripePaymentForm {...props} />
 *    </Elements>
 * 
 * 3. Use Stripe Elements to collect card details:
 *    import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
 *    const stripe = useStripe();
 *    const elements = useElements();
 *    const result = await stripe.confirmCardPayment(clientSecret, {
 *      payment_method: { card: elements.getElement(CardElement) }
 *    });
 * 
 * This demo component does NOT collect real card details and payments will not complete.
 */

interface StripePaymentFormProps {
  accessToken: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  accessToken,
  onSuccess,
  onError,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const amountNum = parseFloat(amount);

      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Step 1: Create payment intent (authenticated)
      const intentResponse = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount: amountNum,
          currency: 'USD',
          description: description || 'Payment',
        }),
      });

      const intentData = await intentResponse.json();

      if (!intentResponse.ok) {
        throw new Error(intentData.error || 'Failed to create payment intent');
      }

      // Step 2: In a real app, you would use Stripe.js here to collect card details
      // Example: const result = await stripe.confirmCardPayment(intentData.clientSecret, {...});
      // For demo purposes, we'll just check the payment status
      console.log('Payment Intent Created:', intentData.paymentIntentId);
      console.log('Client Secret (use with Stripe.js):', intentData.clientSecret);

      // Step 3: Check payment status (in production, webhooks handle this automatically)
      const confirmResponse = await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          paymentIntentId: intentData.paymentIntentId,
        }),
      });

      const confirmData = await confirmResponse.json();

      if (!confirmResponse.ok) {
        throw new Error(confirmData.error || 'Failed to confirm payment');
      }

      setSuccess(true);
      if (onSuccess) {
        onSuccess(confirmData.payment?.id || intentData.paymentIntentId);
      }

      // Reset form
      setAmount('');
      setDescription('');
    } catch (err: any) {
      const errorMessage = err.message || 'Payment failed';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '24px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
    }}>
      <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600' }}>
        💳 Make a Payment
      </h2>

      <div style={{
        padding: '12px',
        backgroundColor: '#fef3c7',
        borderLeft: '4px solid #f59e0b',
        marginBottom: '16px',
        borderRadius: '4px',
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#92400e', fontWeight: '600' }}>
          ⚠️ DEMO MODE
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#92400e' }}>
          This component creates payment intents but does not collect card details.
          Integrate Stripe Elements for production use.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            fontSize: '0.95rem',
          }}>
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            fontSize: '0.95rem',
          }}>
            Description (optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this payment for?"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem',
            }}
          />
        </div>

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fee2e2',
            borderLeft: '4px solid #ef4444',
            marginBottom: '16px',
            borderRadius: '4px',
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#991b1b' }}>
              ❌ {error}
            </p>
          </div>
        )}

        {success && (
          <div style={{
            padding: '12px',
            backgroundColor: '#d1fae5',
            borderLeft: '4px solid #10b981',
            marginBottom: '16px',
            borderRadius: '4px',
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#065f46' }}>
              ✅ Payment successful!
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !amount}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: loading || !amount ? '#9ca3af' : '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading || !amount ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? 'Processing...' : `Pay $${amount || '0.00'}`}
        </button>
      </form>

      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#eff6ff',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: '#1e40af',
      }}>
        🔒 <strong>Secure Payment:</strong> All payments are processed securely through Stripe.
      </div>
    </div>
  );
};
