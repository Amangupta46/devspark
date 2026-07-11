import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'apps', 'frontend', 'src', 'core', 'lib');

const files = {
  'api.ts': `import axios from 'axios';
import { requestInterceptor, responseInterceptor, errorInterceptor } from './interceptors';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);

export const uploadClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
`,
  'interceptors.ts': `import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { tokenManager } from './token-manager';
import { handleError } from './error-handler';

export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = await tokenManager.getToken();
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const errorInterceptor = async (error: AxiosError) => {
  // Handle 401 retry logic here
  return handleError(error);
};
`,
  'token-manager.ts': `class TokenManager {
  private token: string | null = null;
  private isRefreshing = false;
  private refreshQueue: Array<(token: string) => void> = [];

  async getToken() {
    return this.token; // Placeholder for actual storage retrieval
  }

  setToken(token: string) {
    this.token = token;
  }
}

export const tokenManager = new TokenManager();
`,
  'error-handler.ts': `import { AxiosError } from 'axios';

export const handleError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 401: console.error('Unauthorized'); break;
      case 403: console.error('Forbidden'); break;
      case 404: console.error('Not Found'); break;
      case 422: console.error('Validation Error'); break;
      case 429: console.error('Rate Limit Exceeded'); break;
      case 500: console.error('Server Error'); break;
    }
  }
  return Promise.reject(error);
};
`
};

Object.entries(files).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(rootDir, filename), content);
});

console.log("Successfully scaffolded Global Axios Client foundation.");
