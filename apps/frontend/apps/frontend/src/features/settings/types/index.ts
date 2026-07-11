// DTO: Exact shape from the backend Django API
export interface SettingsDTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface SettingsUI {
  id: string;
  createdAt: Date;
}

export interface SettingsRequestDTO extends Partial<SettingsDTO> {}
export interface SettingsPaginationDTO {
  page: number;
  limit: number;
  total: number;
}
export interface SettingsFilterDTO {
  search?: string;
  status?: string;
}
