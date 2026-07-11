// DTO: Exact shape from the backend Django API
export interface ProjectsDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface ProjectsUI {
  id: string;
  createdAt: Date;
}

export interface ProjectsRequestDTO extends Partial<ProjectsDTO> {}
export interface ProjectsPaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface ProjectsFilterDTO {
  search?: string;
  status?: string;
}
