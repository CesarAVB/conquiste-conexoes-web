import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisitanteService } from '../../../../services/visitante';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-visitante-externo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './visitante-externo-form.html',
  styleUrl: './visitante-externo-form.scss'
})
export class VisitanteExternoFormComponent {
  salvando = false;
  form = { nomeCompleto: '', cpf: '', telefone: '', email: '', profissao: '' };

  constructor(private service: VisitanteService, private router: Router, private toastr: ToastrService) {}

  salvar(): void {
    if (!this.form.nomeCompleto || !this.form.cpf) { this.toastr.warning('Nome e CPF são obrigatórios'); return; }
    this.salvando = true;
    this.service.registrarExterno(this.form).subscribe({
      next: (r) => { this.toastr.success(r.message); this.salvando = false; this.router.navigate(['/visitantes/validacao']); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro'); this.salvando = false; }
    });
  }
}
