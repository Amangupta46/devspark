export interface Invoice {
  id: string;
  client: string; // Client ID
  project?: string; // Project ID
  invoice_number: string;
  amount: number;
  status: string; // 'DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED'
  issue_date: string;
  due_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  invoice: string; // Invoice ID
  amount: number;
  payment_method: string; // 'CREDIT_CARD', 'BANK_TRANSFER', 'CASH', 'OTHER'
  payment_date: string;
  status: string; // 'PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'
  transaction_id?: string;
  created_at: string;
}

export interface Estimate {
  id: string;
  client: string; // Client ID
  estimate_number: string;
  amount: number;
  status: string; // 'DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED'
  issue_date: string;
  valid_until: string;
  created_at: string;
}

export interface Expense {
  id: string;
  project?: string; // Project ID
  category: string;
  amount: number;
  date: string;
  receipt_url?: string;
  status: string; // 'PENDING', 'APPROVED', 'REJECTED', 'REIMBURSED'
  created_at: string;
}

export interface Subscription {
  id: string;
  client: string; // Client ID
  plan_name: string;
  amount: number;
  billing_cycle: string; // 'MONTHLY', 'ANNUALLY'
  status: string; // 'ACTIVE', 'PAST_DUE', 'CANCELED', 'TRIAL'
  next_billing_date: string;
  created_at: string;
}
