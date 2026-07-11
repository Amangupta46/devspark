import { CrmDTO, CrmUI } from '../types';

export function mapCrm(dto: CrmDTO): CrmUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
