// DTO: Exact shape from the backend Django API
export interface NotificationsDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface NotificationsUI {
  id: string;
  createdAt: Date;
}

export interface NotificationsRequestDTO extends Partial<NotificationsDTO> {}
export interface NotificationsPaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface NotificationsFilterDTO {
  search?: string;
  status?: string;
}
