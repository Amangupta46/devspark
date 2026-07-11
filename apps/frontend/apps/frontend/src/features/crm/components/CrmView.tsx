import React from 'react';
import { useCrm } from '../hooks';

export function CrmView() {
  const { isLoading } = useCrm();
  
  if (isLoading) return <div>Loading crm...</div>;
  return <div>Crm Feature Ready</div>;
}
