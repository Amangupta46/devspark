export type StorageStrategy = 'localStorage' | 'cookie';

class TokenManager {
  private strategy: StorageStrategy = 'localStorage';
  private token: string | null = null;
  private refreshQueue: Array<(token: string) => void> = [];
  private isRefreshing = false;
  private channel: BroadcastChannel | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.channel = new BroadcastChannel('auth_sync');
      this.channel.onmessage = (event) => {
        if (event.data === 'LOGOUT') this.clearToken();
      };
    }
  }

  setStrategy(strategy: StorageStrategy) {
    this.strategy = strategy;
  }

  async getToken(): Promise<string | null> {
    if (this.strategy === 'localStorage' && typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    if (this.strategy === 'localStorage' && typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (this.strategy === 'localStorage' && typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    if (this.channel) this.channel.postMessage('LOGOUT');
  }

  getIsRefreshing() { return this.isRefreshing; }
  setIsRefreshing(val: boolean) { this.isRefreshing = val; }
  addRefreshSubscriber(cb: (token: string) => void) { this.refreshQueue.push(cb); }
  onTokenRefreshed(token: string) {
    this.refreshQueue.forEach(cb => cb(token));
    this.refreshQueue = [];
  }
}

export const tokenManager = new TokenManager();
