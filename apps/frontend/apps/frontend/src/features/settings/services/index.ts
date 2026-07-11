// Placeholder Axios API Service
export const settingsService = {
  getAll: async () => {
    // const response = await axios.get('/api/settings');
    // return response.data;
    return [];
  }

  getById: async (id: string) => { return null; },
  create: async (data: any) => { return null; },
  update: async (id: string, data: any) => { return null; },
  patch: async (id: string, data: any) => { return null; },
  delete: async (id: string) => { return null; },
  bulkDelete: async (ids: string[]) => { return null; },
  search: async (query: string) => { return []; },
  upload: async (file: File) => { return null; }
};
