export interface Company {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  employee_count?: number;
  annual_revenue?: number;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  job_title?: string;
  company?: string; // Company ID
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  title: string;
  status: string;
  value?: number;
  expected_close_date?: string;
  contact?: string; // Contact ID
  company?: string; // Company ID
  owner?: string; // User ID
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: string;
  lead: string;
  content: string;
  author: string;
  created_at: string;
}

export interface LeadMeeting {
  id: string;
  lead: string;
  title: string;
  start_time: string;
  end_time: string;
  created_at: string;
}

export interface LeadTask {
  id: string;
  lead: string;
  title: string;
  due_date: string;
  is_completed: boolean;
  created_at: string;
}

export interface LeadTimeline {
  id: string;
  lead: string;
  event_type: string;
  description: string;
  created_at: string;
}

export interface CRMDashboard {
  total_leads: number;
  total_companies: number;
  total_contacts: number;
  recent_leads: Lead[];
  pipeline_value: number;
}
