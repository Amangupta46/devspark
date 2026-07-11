export interface Organization {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  organization: string; // Organization ID
  user: string; // User ID
  role: string; // 'ADMIN', 'MANAGER', 'DEVELOPER'
  title?: string;
  department?: string;
  joined_at: string;
}

export interface Worklog {
  id: string;
  member: string; // TeamMember ID
  date: string;
  hours: number;
  description?: string;
  created_at: string;
}

export interface LeaveRequest {
  id: string;
  member: string; // TeamMember ID
  type: string; // 'VACATION', 'SICK', 'PERSONAL'
  start_date: string;
  end_date: string;
  status: string; // 'PENDING', 'APPROVED', 'REJECTED'
  reason?: string;
  created_at: string;
}

export interface CodeReview {
  id: string;
  author: string; // TeamMember ID
  reviewer: string; // TeamMember ID
  title: string;
  url?: string;
  status: string; // 'PENDING', 'APPROVED', 'CHANGES_REQUESTED'
  created_at: string;
}

export interface Conversation {
  id: string;
  participants: string[]; // TeamMember IDs
  title?: string;
  last_message_at: string;
  created_at: string;
}

export interface ManagerDashboard {
  total_members: number;
  pending_leaves: number;
  active_projects: number;
}

export interface DeveloperDashboard {
  pending_reviews: number;
  upcoming_leaves: LeaveRequest[];
  recent_worklogs: Worklog[];
}
