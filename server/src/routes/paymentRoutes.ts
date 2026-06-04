import express, { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService.js';
import { WebhookService } from '../services/webhookService.js';
import { Pool } from 'pg';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export function createPaymentRouter(pool: Pool) {
  // Create payment intent
  router.post('/create-payment-intent', async (req: Request, res: Response) => {
    try {
      const { serviceId, buyerId, sellerId, amount, returnUrl } = req.body;

      if (!serviceId || !buyerId || !sellerId || !amount || !returnUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await PaymentService.createPaymentIntent({
        serviceId,
        buyerId,
        sellerId,
        amount,
        paymentMethod: 'card',
        returnUrl
      });

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  // Confirm payment
  router.post('/confirm-payment', async (req: Request, res: Response) => {
    try {
      const { paymentIntentId } = req.body;

      if (!paymentIntentId) {
        return res.status(400).json({ error: 'Payment intent ID required' });
      }

      const result = await PaymentService.confirmPayment(paymentIntentId);
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  // Process refund
  router.post('/refund', async (req: Request, res: Response) => {
    try {
      const { paymentIntentId, amount } = req.body;

      if (!paymentIntentId) {
        return res.status(400).json({ error: 'Payment intent ID required' });
      }

      const result = await PaymentService.processRefund(paymentIntentId, amount);
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  // Get payment details
  router.get('/payment/:paymentIntentId', async (req: Request, res: Response) => {
    try {
      const { paymentIntentId } = req.params;
      const paymentDetails = await PaymentService.getPaymentDetails(paymentIntentId);
      return res.json(paymentDetails);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  // Get user's payment history
  router.get('/history/:userId', async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const query = `
        SELECT * FROM payments WHERE buyer_id = $1 OR seller_id = $1
        ORDER BY created_at DESC
      `;
      const result = await pool.query(query, [userId]);
      return res.json(result.rows);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  // Webhook endpoint for Stripe events
  router.post('/webhook', express.raw({type: 'application/json'}), async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await WebhookService.handlePaymentIntentSucceeded(
            event.data.object as Stripe.PaymentIntent,
            pool
          );
          break;
        case 'payment_intent.payment_failed':
          await WebhookService.handlePaymentIntentFailed(
            event.data.object as Stripe.PaymentIntent,
            pool
          );
          break;
        case 'charge.refunded':
          await WebhookService.handleChargeRefunded(
            event.data.object as Stripe.Charge,
            pool
          );
          break;
      }

      return res.json({ received: true });
    } catch (error: any) {
      return res.status(400).json({ error: `Webhook error: ${error.message}` });
    }
  });

  return router;
}
