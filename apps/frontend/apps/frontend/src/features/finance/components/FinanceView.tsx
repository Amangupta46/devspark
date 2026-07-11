import React from 'react';
import { useFinance } from '../hooks';

export function FinanceView() {
  const { isLoading } = useFinance();
  
  if (isLoading) return <div>Loading finance...</div>;
  return <div>Finance Feature Ready</div>;
}
