export const CRM_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;

export const crmKeys = {
  all: ['crm'] as const,
  lists: () => [... crmKeys.all, 'list'] as const,
  list: (filters: string) => [... crmKeys.lists(), { filters }] as const,
  details: () => [... crmKeys.all, 'detail'] as const,
  detail: (id: string) => [... crmKeys.details(), id] as const,
};
