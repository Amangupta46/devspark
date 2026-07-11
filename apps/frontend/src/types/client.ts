export interface ClientUser {
  id: string;
  user: string; // User ID
  company: string; // Company ID
  is_active: boolean;
  created_at: string;
}

export interface Deliverable {
  id: string;
  project: string; // Project ID
  title: string;
  description?: string;
  status: string; // 'DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'
  url?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientMessage {
  id: string;
  sender: string; // User ID
  project: string; // Project ID
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface SatisfactionSurvey {
  id: string;
  client: string; // ClientUser ID
  project: string; // Project ID
  rating: number;
  feedback?: string;
  created_at: string;
}

export interface DigitalSignature {
  id: string;
  document_type: string;
  document_id: string;
  signer: string; // ClientUser ID
  ip_address?: string;
  signed_at: string;
}

export interface ClientDashboard {
  active_projects: number;
  pending_deliverables: number;
  unread_messages: number;
}
