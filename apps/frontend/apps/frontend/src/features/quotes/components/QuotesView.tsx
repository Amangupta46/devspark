import React from 'react';
import { useQuotes } from '../hooks';

export function QuotesView() {
  const { isLoading } = useQuotes();
  
  if (isLoading) return <div>Loading quotes...</div>;
  return <div>Quotes Feature Ready</div>;
}
