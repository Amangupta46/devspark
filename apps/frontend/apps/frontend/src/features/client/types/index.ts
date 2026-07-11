// DTO: Exact shape from the backend Django API
export interface ClientDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface ClientUI {
  id: string;
  createdAt: Date;
}

export interface ClientRequestDTO extends Partial<ClientDTO> {}
export interface ClientPaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface ClientFilterDTO {
  search?: string;
  status?: string;
}
