import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDto, RegisterDto } from '../../shared/interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  #http = inject(HttpClient);
  #router = inject(Router);
  #apiUrl = 'http://localhost:3000/auth';

  login(data: LoginDto) {
    return this.#http.post<{ access_token: string }>(`${this.#apiUrl}/login`, data);
  }

  register(data: RegisterDto) {
    return this.#http.post(`${this.#apiUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.#router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
