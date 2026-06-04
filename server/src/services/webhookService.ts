import Stripe from 'stripe';
import { Pool } from 'pg';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export class WebhookService {
  static async handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent,
    pool: Pool
  ): Promise<void> {
    const { serviceId, buyerId, sellerId, platformFee, sellerAmount } =
      paymentIntent.metadata as any;

    const query = `
      INSERT INTO payments (
        service_id, buyer_id, seller_id, amount, platform_fee, seller_amount,
        status, payment_method, stripe_payment_intent_id, completed_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
    `;

    const paymentMethod = (paymentIntent.charges.data[0]?.payment_method_details?.type || 'card') as any;

    await pool.query(query, [
      serviceId,
      buyerId,
      sellerId,
      parseFloat(paymentIntent.amount as any) / 100,
      parseFloat(platformFee),
      parseFloat(sellerAmount),
      'completed',
      paymentMethod,
      paymentIntent.id
    ]);
  }

  static async handlePaymentIntentFailed(
    paymentIntent: Stripe.PaymentIntent,
    pool: Pool
  ): Promise<void> {
    const { serviceId, buyerId, sellerId } = paymentIntent.metadata as any;

    const query = `
      INSERT INTO payments (
        service_id, buyer_id, seller_id, amount, platform_fee, seller_amount,
        status, payment_method, stripe_payment_intent_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    const paymentMethod = (paymentIntent.charges.data[0]?.payment_method_details?.type || 'card') as any;

    await pool.query(query, [
      serviceId,
      buyerId,
      sellerId,
      parseFloat(paymentIntent.amount as any) / 100,
      0,
      0,
      'failed',
      paymentMethod,
      paymentIntent.id
    ]);
  }

  static async handleChargeRefunded(
    charge: Stripe.Charge,
    pool: Pool
  ): Promise<void> {
    const query = `
      UPDATE payments SET status = $1, refunded_date = NOW()
      WHERE stripe_payment_intent_id = $2
    `;

    await pool.query(query, ['refunded', charge.payment_intent]);
  }
}
