import { QuotesDTO, QuotesUI } from '../types';

export function mapQuotes(dto: QuotesDTO): QuotesUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
