import { TeamDTO, TeamUI } from '../types';

export function mapTeam(dto: TeamDTO): TeamUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
