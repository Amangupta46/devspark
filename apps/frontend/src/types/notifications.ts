export interface NotificationCategory {
  id: string;
  name: string;
  description?: string;
}

export interface NotificationPriority {
  id: string;
  name: string; // 'LOW', 'MEDIUM', 'HIGH', 'URGENT'
  level: number;
}

export interface MessageTemplate {
  id: string;
  name: string;
  subject_template: string;
  body_template: string;
}

export interface NotificationMessage {
  id: string;
  recipient: string; // User ID
  category: string; // Category ID
  priority: string; // Priority ID
  title: string;
  content: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface NotificationPreference {
  id: string;
  user: string; // User ID
  category: string; // Category ID
  email_enabled: boolean;
  push_enabled: boolean;
  in_app_enabled: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  published_at?: string;
  expires_at?: string;
  created_at: string;
}
