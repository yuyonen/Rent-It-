CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL,
  buyer_id UUID NOT NULL,
  seller_id UUID NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  seller_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(20) NOT NULL,
  stripe_payment_intent_id VARCHAR(255) NOT NULL UNIQUE,
  transaction_date TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_date TIMESTAMP,
  refunded_date TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_buyer_id ON payments(buyer_id);
CREATE INDEX idx_payments_seller_id ON payments(seller_id);
CREATE INDEX idx_payments_service_id ON payments(service_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_payment_intent_id);

CREATE TABLE IF NOT EXISTS payment_refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID NOT NULL REFERENCES payments(id),
  refund_amount DECIMAL(10, 2) NOT NULL,
  stripe_refund_id VARCHAR(255) NOT NULL UNIQUE,
  reason VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_refunds_payment_id ON payment_refunds(payment_id);

CREATE TABLE IF NOT EXISTS seller_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payout_date TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  stripe_payout_id VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payouts_seller_id ON seller_payouts(seller_id);
