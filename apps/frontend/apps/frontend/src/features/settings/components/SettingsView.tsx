import React from 'react';
import { useSettings } from '../hooks';

export function SettingsView() {
  const { isLoading } = useSettings();
  
  if (isLoading) return <div>Loading settings...</div>;
  return <div>Settings Feature Ready</div>;
}
