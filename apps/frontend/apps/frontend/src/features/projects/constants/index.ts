export const PROJECTS_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;

export const projectsKeys = {
  all: ['projects'] as const,
  lists: () => [... projectsKeys.all, 'list'] as const,
  list: (filters: string) => [... projectsKeys.lists(), { filters }] as const,
  details: () => [... projectsKeys.all, 'detail'] as const,
  detail: (id: string) => [... projectsKeys.details(), id] as const,
};
