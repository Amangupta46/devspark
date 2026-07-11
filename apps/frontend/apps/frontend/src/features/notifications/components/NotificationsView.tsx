import React from 'react';
import { useNotifications } from '../hooks';

export function NotificationsView() {
  const { isLoading } = useNotifications();
  
  if (isLoading) return <div>Loading notifications...</div>;
  return <div>Notifications Feature Ready</div>;
}
