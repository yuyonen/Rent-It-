import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const paymentIntentId = searchParams.get('paymentIntentId');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (!paymentIntentId) {
          setError('No payment information found');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/payments/payment/${paymentIntentId}`
        );

        setPaymentDetails(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch payment details');
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentIntentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading payment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
            <h2 className="text-2xl font-bold mb-4">Payment Error</h2>
            <p>{error}</p>
            <button
              onClick={() => navigate('/services')}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Back to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h1>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-mono text-sm">{paymentDetails?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">
                  €{(paymentDetails?.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">
                  {paymentDetails?.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>
                  {new Date(paymentDetails?.created).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/services')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Back to Services
            </button>
            <button
              onClick={() => navigate('/account/transactions')}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
            >
              View Transaction History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
