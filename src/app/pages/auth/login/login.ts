// =============================================
// src/app/pages/auth/login/login.component.ts
// =============================================
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email = '';
  senha = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    // TODO: Integrar com endpoint real de autenticação
    const success = this.authService.login(this.email, this.senha);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciais inválidas';
    }

    this.loading = false;
  }
}