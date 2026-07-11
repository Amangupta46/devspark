import React from 'react';
import { useClient } from '../hooks';

export function ClientView() {
  const { isLoading } = useClient();
  
  if (isLoading) return <div>Loading client...</div>;
  return <div>Client Feature Ready</div>;
}
