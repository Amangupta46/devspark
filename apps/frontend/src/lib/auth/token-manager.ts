import Cookies from 'js-cookie';

export class TokenManager {
  private static ACCESS_TOKEN_KEY = 'accessToken';
  private static REFRESH_TOKEN_KEY = 'refreshToken';

  static getAccessToken(): string | undefined {
    return Cookies.get(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get(this.REFRESH_TOKEN_KEY);
  }

  static setTokens(access: string, refresh: string) {
    // HttpOnly should be ideally configured on the backend, but since we are handling JWTs via JS, 
    // we set it as standard cookie (consider Secure flag in production)
    Cookies.set(this.ACCESS_TOKEN_KEY, access, { secure: process.env.NODE_ENV === 'production' });
    Cookies.set(this.REFRESH_TOKEN_KEY, refresh, { secure: process.env.NODE_ENV === 'production' });
  }

  static clearTokens() {
    Cookies.remove(this.ACCESS_TOKEN_KEY);
    Cookies.remove(this.REFRESH_TOKEN_KEY);
  }
}
