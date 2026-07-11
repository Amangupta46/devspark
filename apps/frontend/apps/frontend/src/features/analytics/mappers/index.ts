import { AnalyticsDTO, AnalyticsUI } from '../types';

export function mapAnalytics(dto: AnalyticsDTO): AnalyticsUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
