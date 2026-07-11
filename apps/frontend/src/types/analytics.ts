export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface RevenueChartData {
  total_revenue: number;
  currency: string;
  trend_percentage: number;
  series: ChartDataPoint[];
}

export interface PipelineChartData {
  total_value: number;
  currency: string;
  stages: {
    stage_name: string;
    count: number;
    value: number;
  }[];
}

export interface TaskChartData {
  total_tasks: number;
  completion_rate: number; // percentage
  status_distribution: {
    status: string;
    count: number;
  }[];
}

export interface ProjectChartData {
  active_projects: number;
  completed_projects: number;
  delayed_projects: number;
  health_scores: {
    project_name: string;
    score: number;
  }[];
}

export interface GlobalDashboardMetrics {
  revenue_ytd: number;
  active_clients: number;
  open_projects: number;
  pending_tasks: number;
  outstanding_invoices: number;
}
