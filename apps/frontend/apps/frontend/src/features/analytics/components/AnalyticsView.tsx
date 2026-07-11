import React from 'react';
import { useAnalytics } from '../hooks';

export function AnalyticsView() {
  const { isLoading } = useAnalytics();
  
  if (isLoading) return <div>Loading analytics...</div>;
  return <div>Analytics Feature Ready</div>;
}
