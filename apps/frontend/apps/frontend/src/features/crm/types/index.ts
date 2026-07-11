// DTO: Exact shape from the backend Django API
export interface CrmDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface CrmUI {
  id: string;
  createdAt: Date;
}

export interface CrmRequestDTO extends Partial<CrmDTO> {}
export interface CrmPaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface CrmFilterDTO {
  search?: string;
  status?: string;
}
