import Stripe from 'stripe';
import { Payment, PaymentRequest, PaymentResponse } from '../types/payment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const PLATFORM_FEE_PERCENTAGE = 0.14; // 14% fee

export class PaymentService {
  // Create payment intent for Stripe
  static async createPaymentIntent(
    request: PaymentRequest
  ): Promise<PaymentResponse> {
    try {
      const platformFee = Math.round(request.amount * PLATFORM_FEE_PERCENTAGE * 100);
      const sellerAmount = Math.round((request.amount * 100) - platformFee);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(request.amount * 100), // Amount in cents
        currency: 'eur',
        payment_method_types: [
          'card',
          'paypal',
          'mobilepay',
          'apple_pay',
          'google_pay'
        ],
        metadata: {
          serviceId: request.serviceId,
          buyerId: request.buyerId,
          sellerId: request.sellerId,
          platformFee: (platformFee / 100).toString(),
          sellerAmount: (sellerAmount / 100).toString()
        },
        return_url: request.returnUrl
      });

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret || undefined,
        message: 'Payment intent created successfully'
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Error creating payment intent: ${error.message}`
      };
    }
  }

  // Confirm payment
  static async confirmPayment(
    paymentIntentId: string
  ): Promise<PaymentResponse> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (paymentIntent.status === 'succeeded') {
        return {
          success: true,
          message: 'Payment confirmed successfully'
        };
      } else if (paymentIntent.status === 'processing') {
        return {
          success: true,
          message: 'Payment is processing'
        };
      } else {
        return {
          success: false,
          message: `Payment failed with status: ${paymentIntent.status}`
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error confirming payment: ${error.message}`
      };
    }
  }

  // Process refund
  static async processRefund(
    paymentIntentId: string,
    amount?: number
  ): Promise<PaymentResponse> {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        ...(amount && { amount: Math.round(amount * 100) })
      });

      if (refund.status === 'succeeded') {
        return {
          success: true,
          message: 'Refund processed successfully'
        };
      } else {
        return {
          success: false,
          message: `Refund failed with status: ${refund.status}`
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error processing refund: ${error.message}`
      };
    }
  }

  // Get payment details
  static async getPaymentDetails(
    paymentIntentId: string
  ): Promise<any> {
    try {
      return await stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error: any) {
      throw new Error(`Error fetching payment details: ${error.message}`);
    }
  }

  // Calculate fees
  static calculateFees(amount: number): { platformFee: number; sellerAmount: number } {
    const platformFee = amount * PLATFORM_FEE_PERCENTAGE;
    const sellerAmount = amount - platformFee;
    return { platformFee, sellerAmount };
  }
}
