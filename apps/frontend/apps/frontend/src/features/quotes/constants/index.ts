export const QUOTES_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;

export const quotesKeys = {
  all: ['quotes'] as const,
  lists: () => [... quotesKeys.all, 'list'] as const,
  list: (filters: string) => [... quotesKeys.lists(), { filters }] as const,
  details: () => [... quotesKeys.all, 'detail'] as const,
  detail: (id: string) => [... quotesKeys.details(), id] as const,
};
