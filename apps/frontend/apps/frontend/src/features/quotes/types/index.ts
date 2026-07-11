// DTO: Exact shape from the backend Django API
export interface QuotesDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface QuotesUI {
  id: string;
  createdAt: Date;
}

export interface QuotesRequestDTO extends Partial<QuotesDTO> {}
export interface QuotesPaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface QuotesFilterDTO {
  search?: string;
  status?: string;
}
