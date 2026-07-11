import { NotificationsDTO, NotificationsUI } from '../types';

export function mapNotifications(dto: NotificationsDTO): NotificationsUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
