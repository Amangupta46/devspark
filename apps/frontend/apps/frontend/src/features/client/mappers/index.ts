import { ClientDTO, ClientUI } from '../types';

export function mapClient(dto: ClientDTO): ClientUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
