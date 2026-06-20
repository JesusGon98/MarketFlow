import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { User } from '../models/user.model';

const TOKEN_KEY = 'pp-token';
const USER_KEY = 'pp-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private readonly httpClient: HttpClient) {}

  public login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.httpClient.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (typeof localStorage === 'undefined') return;

        localStorage.setItem(TOKEN_KEY, response.data.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }),
    );
  }

  public logout(): void {
    if (typeof localStorage === 'undefined') return;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  public getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;

    return localStorage.getItem(TOKEN_KEY);
  }

  public getCurrentUser(): User | null {
    if (typeof localStorage === 'undefined') return null;

    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
