export const FINANCE_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;

export const financeKeys = {
  all: ['finance'] as const,
  lists: () => [... financeKeys.all, 'list'] as const,
  list: (filters: string) => [... financeKeys.lists(), { filters }] as const,
  details: () => [... financeKeys.all, 'detail'] as const,
  detail: (id: string) => [... financeKeys.details(), id] as const,
};
