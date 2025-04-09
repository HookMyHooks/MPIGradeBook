import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'loginKey';

  // Save raw JWT to localStorage and store its expiration (decoded from payload)
  setToken(jwt: string): void {
    const payload = this.decodePayload(jwt);
    if (!payload || !payload.exp) {
      console.error("Invalid JWT: Missing 'exp' claim");
      return;
    }

    const expiry = payload.exp * 1000; // JWT exp is in seconds -> convert to ms
    const tokenWrapper = {
      value: jwt,
      expiry: expiry
    };

    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenWrapper));
  }

  // Get token string if its valid and not expired
  getToken(): string | null {
    const stored = localStorage.getItem(this.TOKEN_KEY);
    if (!stored) return null;

    const tokenObj = JSON.parse(stored);
    if (new Date().getTime() > tokenObj.expiry) {
      this.logout(); // Clean up expired token
      return null;
    }

    return tokenObj.value;
  }

  // Returns decoded JWT payload
  getPayload(): any {
    const token = this.getToken();
    if (!token) return null;

    return this.decodePayload(token);
  }

  // Checks whether the token is present and valid
  isTokenValid(): boolean {
    return this.getToken() !== null;
  }

  // Clears token from localStorage
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Helper to decode JWT payload safely
  private decodePayload(jwt: string): any {
    try {
      const payloadBase64 = jwt.split('.')[1];
      return JSON.parse(atob(payloadBase64));
    } catch (e) {
      console.error("Failed to decode JWT payload:", e);
      return null;
    }
  }
}
