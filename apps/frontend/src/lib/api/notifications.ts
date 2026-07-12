import { apiClient } from "@/lib/api/client";
import { PaginatedResponse } from "@/types/api";
import {
  NotificationMessage,
  NotificationPreference,
  Announcement,
  NotificationCategory,
  NotificationPriority,
  MessageTemplate,
} from "@/types/notifications";
import { PaginationParams } from "./crm";

// ----------------------------------------------------------------------------
// Notifications
// ----------------------------------------------------------------------------

export async function getNotifications(
  params?: PaginationParams,
): Promise<PaginatedResponse<NotificationMessage>> {
  const response = await apiClient.get<PaginatedResponse<NotificationMessage>>(
    "/notifications/messages/",
    { params },
  );
  return response.data;
}

export async function markNotificationAsRead(id: string): Promise<NotificationMessage> {
  const response = await apiClient.patch<NotificationMessage>(`/notifications/messages/${id}/`, {
    is_read: true,
  });
  return response.data;
}

export async function getNotificationPreferences(
  params?: PaginationParams,
): Promise<PaginatedResponse<NotificationPreference>> {
  const response = await apiClient.get<PaginatedResponse<NotificationPreference>>(
    "/notifications/preferences/",
    { params },
  );
  return response.data;
}

export async function getAnnouncements(
  params?: PaginationParams,
): Promise<PaginatedResponse<Announcement>> {
  const response = await apiClient.get<PaginatedResponse<Announcement>>(
    "/notifications/announcements/",
    { params },
  );
  return response.data;
}

export async function getNotificationCategories(
  params?: PaginationParams,
): Promise<PaginatedResponse<NotificationCategory>> {
  const response = await apiClient.get<PaginatedResponse<NotificationCategory>>(
    "/notifications/categories/",
    { params },
  );
  return response.data;
}

export async function getNotificationPriorities(
  params?: PaginationParams,
): Promise<PaginatedResponse<NotificationPriority>> {
  const response = await apiClient.get<PaginatedResponse<NotificationPriority>>(
    "/notifications/priorities/",
    { params },
  );
  return response.data;
}

export async function getMessageTemplates(
  params?: PaginationParams,
): Promise<PaginatedResponse<MessageTemplate>> {
  const response = await apiClient.get<PaginatedResponse<MessageTemplate>>(
    "/notifications/templates/",
    { params },
  );
  return response.data;
}
