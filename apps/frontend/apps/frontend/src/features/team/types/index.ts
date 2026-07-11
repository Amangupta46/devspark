// DTO: Exact shape from the backend Django API
export interface TeamDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface TeamUI {
  id: string;
  createdAt: Date;
}

export interface TeamRequestDTO extends Partial<TeamDTO> {}
export interface TeamPaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface TeamFilterDTO {
  search?: string;
  status?: string;
}
