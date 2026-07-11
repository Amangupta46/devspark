import React from 'react';
import { useProjects } from '../hooks';

export function ProjectsView() {
  const { isLoading } = useProjects();
  
  if (isLoading) return <div>Loading projects...</div>;
  return <div>Projects Feature Ready</div>;
}
