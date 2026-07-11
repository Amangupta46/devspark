export interface ServiceCatalog {
  id: string;
  name: string;
  description: string;
  base_price: number;
  billing_model: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuoteItem {
  id: string;
  quote: string;
  service: string; // ServiceCatalog ID
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Quote {
  id: string;
  title: string;
  status: string; // 'DRAFT', 'SENT', 'ACCEPTED', 'REJECTED'
  lead?: string; // Lead ID
  client?: string; // User ID
  total_amount: number;
  valid_until: string;
  items?: QuoteItem[];
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  quote: string;
  content: string;
  sent_at?: string;
  viewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteDashboard {
  total_quotes: number;
  accepted_quotes: number;
  total_revenue: number;
  recent_quotes: Quote[];
}
