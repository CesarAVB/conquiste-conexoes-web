import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'cc_token';
  private readonly USER_KEY = 'cc_user';

  constructor(private router: Router) {}

  // TODO: Integrar com endpoint de autenticação quando JWT estiver pronto no backend
  login(email: string, senha: string): boolean {
    // Simulação temporária
    const user: User = { id: 1, nome: 'Admin C+C', email, role: 'ADM_CC' };
    localStorage.setItem(this.TOKEN_KEY, 'temp-token');
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}