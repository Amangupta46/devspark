import { FinanceDTO, FinanceUI } from '../types';

export function mapFinance(dto: FinanceDTO): FinanceUI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
