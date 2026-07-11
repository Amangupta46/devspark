export const ANALYTICS_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;

export const analyticsKeys = {
  all: ['analytics'] as const,
  lists: () => [... analyticsKeys.all, 'list'] as const,
  list: (filters: string) => [... analyticsKeys.lists(), { filters }] as const,
  details: () => [... analyticsKeys.all, 'detail'] as const,
  detail: (id: string) => [... analyticsKeys.details(), id] as const,
};
