import { ProjectsDTO, ProjectsUI } from '../types';

export function mapProjects(dto: ProjectsDTO): ProjectsUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
