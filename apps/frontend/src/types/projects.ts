export interface Project {
  id: string;
  name: string;
  description?: string;
  status: string; // 'PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD'
  client?: string; // Client ID
  manager?: string; // User ID
  start_date?: string;
  end_date?: string;
  budget?: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectTask {
  id: string;
  project: string; // Project ID
  title: string;
  description?: string;
  status: string; // 'TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'
  assignee?: string; // User ID
  due_date?: string;
  priority?: string; // 'LOW', 'MEDIUM', 'HIGH', 'URGENT'
  created_at: string;
  updated_at: string;
}

export interface TimeLog {
  id: string;
  task?: string; // ProjectTask ID
  project: string; // Project ID
  user: string; // User ID
  duration_minutes: number;
  date: string;
  description?: string;
  created_at: string;
}

export interface ProjectDashboard {
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  recent_projects: Project[];
}
