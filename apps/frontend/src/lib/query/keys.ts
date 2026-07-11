export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  users: {
    all: ['users'] as const,
    list: (filters: Record<string, unknown>) => ['users', 'list', filters] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },
  crm: {
    dashboard: ['crm', 'dashboard'] as const,
    companies: {
      all: ['crm', 'companies'] as const,
      list: (filters: Record<string, unknown>) => ['crm', 'companies', 'list', filters] as const,
      detail: (id: string) => ['crm', 'companies', 'detail', id] as const,
    },
    contacts: {
      all: ['crm', 'contacts'] as const,
      list: (filters: Record<string, unknown>) => ['crm', 'contacts', 'list', filters] as const,
      detail: (id: string) => ['crm', 'contacts', 'detail', id] as const,
    },
    leads: {
      all: ['crm', 'leads'] as const,
      list: (filters: Record<string, unknown>) => ['crm', 'leads', 'list', filters] as const,
      detail: (id: string) => ['crm', 'leads', 'detail', id] as const,
    },
  },
  quotes: {
    dashboard: ['quotes', 'dashboard'] as const,
    catalog: {
      all: ['quotes', 'catalog'] as const,
      list: (filters: Record<string, unknown>) => ['quotes', 'catalog', 'list', filters] as const,
    },
    quotes: {
      all: ['quotes', 'quotes'] as const,
      list: (filters: Record<string, unknown>) => ['quotes', 'quotes', 'list', filters] as const,
      detail: (id: string) => ['quotes', 'quotes', 'detail', id] as const,
    },
    proposals: {
      all: ['quotes', 'proposals'] as const,
      list: (filters: Record<string, unknown>) => ['quotes', 'proposals', 'list', filters] as const,
      detail: (id: string) => ['quotes', 'proposals', 'detail', id] as const,
    },
  },
  projects: {
    dashboard: ['projects', 'dashboard'] as const,
    projects: {
      all: ['projects', 'projects'] as const,
      list: (filters: Record<string, unknown>) => ['projects', 'projects', 'list', filters] as const,
      detail: (id: string) => ['projects', 'projects', 'detail', id] as const,
    },
    tasks: {
      all: ['projects', 'tasks'] as const,
      list: (filters: Record<string, unknown>) => ['projects', 'tasks', 'list', filters] as const,
      detail: (id: string) => ['projects', 'tasks', 'detail', id] as const,
    },
    timelogs: {
      all: ['projects', 'timelogs'] as const,
      list: (filters: Record<string, unknown>) => ['projects', 'timelogs', 'list', filters] as const,
    },
  },
  team: {
    managerDashboard: ['team', 'dashboard', 'manager'] as const,
    developerDashboard: ['team', 'dashboard', 'developer'] as const,
    organizations: {
      all: ['team', 'organizations'] as const,
      list: (filters: Record<string, unknown>) => ['team', 'organizations', 'list', filters] as const,
    },
    members: {
      all: ['team', 'members'] as const,
      list: (filters: Record<string, unknown>) => ['team', 'members', 'list', filters] as const,
    },
    worklogs: {
      all: ['team', 'worklogs'] as const,
      list: (filters: Record<string, unknown>) => ['team', 'worklogs', 'list', filters] as const,
    },
    leaves: {
      all: ['team', 'leaves'] as const,
      list: (filters: Record<string, unknown>) => ['team', 'leaves', 'list', filters] as const,
      detail: (id: string) => ['team', 'leaves', 'detail', id] as const,
    },
    reviews: {
      all: ['team', 'reviews'] as const,
      list: (filters: Record<string, unknown>) => ['team', 'reviews', 'list', filters] as const,
    },
    conversations: {
      all: ['team', 'conversations'] as const,
      list: (filters: Record<string, unknown>) => ['team', 'conversations', 'list', filters] as const,
    },
  },
  client_portal: {
    dashboard: ['client_portal', 'dashboard'] as const,
    users: {
      all: ['client_portal', 'users'] as const,
      list: (filters: Record<string, unknown>) => ['client_portal', 'users', 'list', filters] as const,
    },
    deliverables: {
      all: ['client_portal', 'deliverables'] as const,
      list: (filters: Record<string, unknown>) => ['client_portal', 'deliverables', 'list', filters] as const,
    },
    messages: {
      all: ['client_portal', 'messages'] as const,
      list: (filters: Record<string, unknown>) => ['client_portal', 'messages', 'list', filters] as const,
    },
    surveys: {
      all: ['client_portal', 'surveys'] as const,
      list: (filters: Record<string, unknown>) => ['client_portal', 'surveys', 'list', filters] as const,
    },
    signatures: {
      all: ['client_portal', 'signatures'] as const,
      list: (filters: Record<string, unknown>) => ['client_portal', 'signatures', 'list', filters] as const,
    },
  },
  notifications: {
    messages: {
      all: ['notifications', 'messages'] as const,
      list: (filters: Record<string, unknown>) => ['notifications', 'messages', 'list', filters] as const,
    },
    preferences: {
      all: ['notifications', 'preferences'] as const,
      list: (filters: Record<string, unknown>) => ['notifications', 'preferences', 'list', filters] as const,
    },
    announcements: {
      all: ['notifications', 'announcements'] as const,
      list: (filters: Record<string, unknown>) => ['notifications', 'announcements', 'list', filters] as const,
    },
  },
  finance: {
    invoices: {
      all: ['finance', 'invoices'] as const,
      list: (filters: Record<string, unknown>) => ['finance', 'invoices', 'list', filters] as const,
    },
    payments: {
      all: ['finance', 'payments'] as const,
      list: (filters: Record<string, unknown>) => ['finance', 'payments', 'list', filters] as const,
    },
    estimates: {
      all: ['finance', 'estimates'] as const,
      list: (filters: Record<string, unknown>) => ['finance', 'estimates', 'list', filters] as const,
    },
    expenses: {
      all: ['finance', 'expenses'] as const,
      list: (filters: Record<string, unknown>) => ['finance', 'expenses', 'list', filters] as const,
    },
    subscriptions: {
      all: ['finance', 'subscriptions'] as const,
      list: (filters: Record<string, unknown>) => ['finance', 'subscriptions', 'list', filters] as const,
    },
  },
  analytics: {
    dashboard: ['analytics', 'dashboard'] as const,
    charts: {
      revenue: ['analytics', 'charts', 'revenue'] as const,
      pipeline: ['analytics', 'charts', 'pipeline'] as const,
      tasks: ['analytics', 'charts', 'tasks'] as const,
      projects: ['analytics', 'charts', 'projects'] as const,
    },
  },
};
