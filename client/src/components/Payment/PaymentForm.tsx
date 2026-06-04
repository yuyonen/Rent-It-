import React, { useState } from 'react';
import { loadStripe } from '@stripe/js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY || ''
);

interface PaymentFormProps {
  serviceId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  serviceId,
  buyerId,
  sellerId,
  amount,
  onSuccess,
  onError
}) => {
  const [clientSecret, setClientSecret] = useState<string>('');

  const fetchClientSecret = React.useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payments/create-payment-intent`,
        {
          serviceId,
          buyerId,
          sellerId,
          amount,
          returnUrl: `${window.location.origin}/payment-success`
        }
      );

      if (response.data.success && response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
        onSuccess(response.data.paymentIntentId);
      } else {
        onError(response.data.message);
      }
    } catch (error: any) {
      onError(error.response?.data?.error || 'Failed to create payment');
    }
  }, [serviceId, buyerId, sellerId, amount, onSuccess, onError]);

  React.useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  return (
    <div className="payment-form">
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};
