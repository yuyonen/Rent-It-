import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Payment {
  id: string;
  service_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  platform_fee: number;
  seller_amount: number;
  status: string;
  payment_method: string;
  created_at: string;
}

interface PaymentHistoryProps {
  userId: string;
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ userId }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/payments/history/${userId}`
        );
        setPayments(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch payment history');
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-8">Loading payment history...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No payment history found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm">
                {new Date(payment.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm font-semibold">
                €{(payment.amount).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    payment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {payment.status.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="capitalize">{payment.payment_method}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
