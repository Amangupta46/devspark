export const CLIENT_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;

export const clientKeys = {
  all: ['client'] as const,
  lists: () => [... clientKeys.all, 'list'] as const,
  list: (filters: string) => [... clientKeys.lists(), { filters }] as const,
  details: () => [... clientKeys.all, 'detail'] as const,
  detail: (id: string) => [... clientKeys.details(), id] as const,
};
