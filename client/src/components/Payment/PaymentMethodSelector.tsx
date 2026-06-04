import React from 'react';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  const paymentMethods = [
    { id: 'card', label: '💳 Credit/Debit Card', icon: '🏧' },
    { id: 'paypal', label: '🅿️ PayPal', icon: 'P' },
    { id: 'mobilepay', label: '📱 MobilePay', icon: 'M' },
    { id: 'applepay', label: '🍎 Apple Pay', icon: '🍎' },
    { id: 'googlepay', label: '🔵 Google Pay', icon: 'G' }
  ];

  return (
    <div className="payment-method-selector">
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">{method.icon}</div>
            <div className="text-sm font-medium">{method.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
