export const SETTINGS_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;

export const settingsKeys = {
  all: ['settings'] as const,
  lists: () => [... settingsKeys.all, 'list'] as const,
  list: (filters: string) => [... settingsKeys.lists(), { filters }] as const,
  details: () => [... settingsKeys.all, 'detail'] as const,
  detail: (id: string) => [... settingsKeys.details(), id] as const,
};
