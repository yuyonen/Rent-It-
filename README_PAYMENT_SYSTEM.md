# Rent-It Payment System

## Overview

A comprehensive payment system that supports multiple payment methods (card, PayPal, MobilePay, Apple Pay, Google Pay) with automatic 14% platform fee distribution.

## Features

✅ **Multiple Payment Methods**
- Credit/Debit Cards
- PayPal
- MobilePay
- Apple Pay
- Google Pay

✅ **Automatic Fee Distribution**
- 14% platform fee to you (developer)
- 86% to the seller

✅ **Full Payment Lifecycle**
- Payment intent creation
- Payment confirmation
- Refund processing
- Payment history tracking

✅ **Webhooks & Real-time Updates**
- Stripe webhooks for payment status updates
- Automatic transaction recording

## Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd server
npm install stripe
```

#### Database Migration
Run the SQL migration to create payment tables:
```bash
psql -U user -d rent_it -f src/db/migrations/001_create_payments_table.sql
```

#### Environment Variables
Create a `.env` file in the server directory:
```env
STRIPE_PUBLIC_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

#### Register Payment Routes
Add this to your `server.ts`:
```typescript
import { createPaymentRouter } from './routes/paymentRoutes.js';

const paymentRouter = createPaymentRouter(pool);
app.use('/api/payments', paymentRouter);
```

### 2. Frontend Setup

#### Install Dependencies
```bash
cd client
npm install @stripe/react-stripe-js @stripe/js
```

#### Environment Variables
Create a `.env` file in the client directory:
```env
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_public_key
REACT_APP_API_URL=http://localhost:5000
```

#### Add Routes
Add payment routes to your router:
```typescript
import { PaymentPage } from './pages/PaymentPage';
import { PaymentSuccess } from './pages/PaymentSuccess';

// In your router
<Route path="/payment" element={<PaymentPage />} />
<Route path="/payment-success" element={<PaymentSuccess />} />
```

### 3. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Dashboard
3. Set up webhook endpoint:
   - Go to Webhooks in Stripe Dashboard
   - Add endpoint: `https://yourdomain.com/api/payments/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
4. Copy the webhook signing secret

## API Endpoints

### Create Payment Intent
```
POST /api/payments/create-payment-intent

Body:
{
  "serviceId": "uuid",
  "buyerId": "uuid",
  "sellerId": "uuid",
  "amount": 50.00,
  "returnUrl": "https://yourdomain.com/payment-success"
}

Response:
{
  "success": true,
  "paymentIntentId": "pi_xxx",
  "clientSecret": "pi_xxx_secret_xxx"
}
```

### Confirm Payment
```
POST /api/payments/confirm-payment

Body:
{
  "paymentIntentId": "pi_xxx"
}
```

### Process Refund
```
POST /api/payments/refund

Body:
{
  "paymentIntentId": "pi_xxx",
  "amount": 50.00 (optional, full refund if not provided)
}
```

### Get Payment Details
```
GET /api/payments/payment/:paymentIntentId
```

### Get Payment History
```
GET /api/payments/history/:userId
```

### Webhook
```
POST /api/payments/webhook
```

## Usage Example

### From Frontend
```typescript
// Navigate to payment page
navigation.push(
  `/payment?serviceId=${serviceId}&buyerId=${buyerId}&sellerId=${sellerId}&amount=${amount}&serviceName=${name}&sellerName=${seller}`
);
```

### Payment Fee Calculation
```
Total Amount: €100.00
Platform Fee (14%): €14.00 → You
Seller Receives: €86.00 → Seller
```

## Database Schema

### payments table
- `id`: UUID (primary key)
- `service_id`: UUID
- `buyer_id`: UUID
- `seller_id`: UUID
- `amount`: DECIMAL (10,2)
- `platform_fee`: DECIMAL (10,2)
- `seller_amount`: DECIMAL (10,2)
- `status`: VARCHAR (pending, completed, failed, refunded)
- `payment_method`: VARCHAR (card, paypal, mobilepay, applepay, googlepay)
- `stripe_payment_intent_id`: VARCHAR (unique)
- `created_at`: TIMESTAMP
- `completed_at`: TIMESTAMP
- `refunded_date`: TIMESTAMP

### payment_refunds table
- `id`: UUID
- `payment_id`: UUID (FK)
- `refund_amount`: DECIMAL (10,2)
- `stripe_refund_id`: VARCHAR (unique)
- `reason`: VARCHAR
- `status`: VARCHAR
- `created_at`: TIMESTAMP

### seller_payouts table
- `id`: UUID
- `seller_id`: UUID
- `total_amount`: DECIMAL (10,2)
- `payout_date`: TIMESTAMP
- `status`: VARCHAR
- `stripe_payout_id`: VARCHAR

## Security Considerations

✅ **PCI Compliance**: All card data is handled by Stripe
✅ **Webhook Verification**: All webhooks are verified with Stripe signing secret
✅ **Environment Variables**: Sensitive keys stored in .env files (never committed)
✅ **HTTPS Only**: Payment endpoints should only work over HTTPS in production
✅ **Rate Limiting**: Consider adding rate limiting to payment endpoints

## Testing

Use Stripe's test cards:
- Visa: 4242 4242 4242 4242
- Mastercard: 5555 5555 5555 4444
- Amex: 3782 822463 10005

Use any future expiration date and any 3-digit CVC.

## Fee Distribution Logic

```typescript
const PLATFORM_FEE_PERCENTAGE = 0.14; // 14%

platformFee = amount × 0.14
sellerAmount = amount - platformFee
```

## Troubleshooting

### Payment Intent Not Created
- Check Stripe API keys are correct
- Verify environment variables are loaded
- Check network requests in browser console

### Webhook Not Triggering
- Verify webhook secret is correct
- Check webhook endpoint is accessible
- Review Stripe webhook logs

### Payment Status Not Updating
- Ensure database connection is working
- Check if payment_intents.succeeded event is configured
- Review application logs

## Next Steps

1. Add payment method validation
2. Implement payout scheduling for sellers
3. Add transaction receipts/invoices
4. Implement dispute handling
5. Add analytics dashboard
6. Implement subscription payments

## Support

For issues, check:
- Stripe Documentation: https://stripe.com/docs
- GitHub Issues: [Your repo]
- Stripe Support: https://support.stripe.com
