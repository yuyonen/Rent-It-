import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PaymentForm } from '../components/Payment/PaymentForm';
import { PaymentMethodSelector } from '../components/Payment/PaymentMethodSelector';
import { PaymentSummary } from '../components/Payment/PaymentSummary';

export const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const serviceId = searchParams.get('serviceId') || '';
  const buyerId = searchParams.get('buyerId') || '';
  const sellerId = searchParams.get('sellerId') || '';
  const amount = parseFloat(searchParams.get('amount') || '0');
  const serviceName = searchParams.get('serviceName') || 'Service';
  const sellerName = searchParams.get('sellerName') || 'Seller';

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setSuccess(true);
    setTimeout(() => {
      navigate(`/payment-success?paymentIntentId=${paymentIntentId}`);
    }, 2000);
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (!serviceId || !buyerId || !sellerId || !amount) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-lg">
          Missing required payment information
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-700">
            Payment successful! Redirecting...
          </div>
        )}

        <PaymentSummary
          amount={amount}
          serviceName={serviceName}
          sellerName={sellerName}
        />

        <PaymentMethodSelector
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
        />

        <div className="mt-8">
          <PaymentForm
            serviceId={serviceId}
            buyerId={buyerId}
            sellerId={sellerId}
            amount={amount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    </div>
  );
};
