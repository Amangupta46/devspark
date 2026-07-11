// DTO: Exact shape from the backend Django API
export interface FinanceDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface FinanceUI {
  id: string;
  createdAt: Date;
}

export interface FinanceRequestDTO extends Partial<FinanceDTO> {}
export interface FinancePaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface FinanceFilterDTO {
  search?: string;
  status?: string;
}
