import { SettingsDTO, SettingsUI } from '../types';

export function mapSettings(dto: SettingsDTO): SettingsUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
