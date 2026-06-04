export interface Payment {
  id: string;
  serviceId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  platformFee: number;
  sellerAmount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'paypal' | 'mobilepay' | 'applepay' | 'googlepay';
  stripePaymentIntentId: string;
  transactionDate: Date;
  completedDate?: Date;
  refundedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRequest {
  serviceId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  paymentMethod: string;
  returnUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentIntentId?: string;
  clientSecret?: string;
  message: string;
}
