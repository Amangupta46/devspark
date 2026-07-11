import React from 'react';
import { useTeam } from '../hooks';

export function TeamView() {
  const { isLoading } = useTeam();
  
  if (isLoading) return <div>Loading team...</div>;
  return <div>Team Feature Ready</div>;
}
