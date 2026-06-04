import React from 'react';

interface PaymentSummaryProps {
  amount: number;
  serviceName: string;
  sellerName: string;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  amount,
  serviceName,
  sellerName
}) => {
  const platformFee = amount * 0.14;
  const sellerAmount = amount - platformFee;

  return (
    <div className="payment-summary bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Service:</span>
          <span className="font-medium">{serviceName}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Seller:</span>
          <span className="font-medium">{sellerName}</span>
        </div>
        
        <hr className="my-3" />
        
        <div className="flex justify-between text-lg">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">€{amount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fee (14%):</span>
          <span className="text-red-600 font-medium">-€{platformFee.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-green-600">
          <span>Seller Receives:</span>
          <span className="font-semibold">€{sellerAmount.toFixed(2)}</span>
        </div>
        
        <hr className="my-3" />
        
        <div className="flex justify-between text-xl font-bold">
          <span>You Pay:</span>
          <span>€{amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
