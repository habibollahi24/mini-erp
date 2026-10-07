import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../../../environment/environment';
import { AuthResponse, LoginDto, MeResponse, RegisterDto } from '../auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.baseUrl;

  private readonly accessTokenKey = 'access_token';

  login(credentials: LoginDto) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/auth/login`,
      credentials,
      {
        withCredentials: true,
      },
    );
  }

  register(userData: RegisterDto) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/auth/register`,
      userData,
      {
        withCredentials: true,
      },
    );
  }

  me() {
    return this.http.get<MeResponse>(`${this.baseUrl}/auth/me`, {
      withCredentials: true,
    });
  }

  refresh() {
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/auth/refresh`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  logout() {
    return this.http.post(
      `${this.baseUrl}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  clearAccessToken() {
    localStorage.removeItem(this.accessTokenKey);
  }
}
