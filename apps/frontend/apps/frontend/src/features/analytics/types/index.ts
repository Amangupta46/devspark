// DTO: Exact shape from the backend Django API
export interface AnalyticsDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface AnalyticsUI {
  id: string;
  createdAt: Date;
}

export interface AnalyticsRequestDTO extends Partial<AnalyticsDTO> {}
export interface AnalyticsPaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface AnalyticsFilterDTO {
  search?: string;
  status?: string;
}
