export const TEAM_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;

export const teamKeys = {
  all: ['team'] as const,
  lists: () => [... teamKeys.all, 'list'] as const,
  list: (filters: string) => [... teamKeys.lists(), { filters }] as const,
  details: () => [... teamKeys.all, 'detail'] as const,
  detail: (id: string) => [... teamKeys.details(), id] as const,
};
