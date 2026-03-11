import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisitanteService } from '../../../../services/visitante';
import { AssociadoService } from '../../../../services/associado';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-substituto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './substituto-form.html',
  styleUrl: './substituto-form.scss'
})
export class SubstitutoFormComponent {
  salvando = false;
  tipoSubstituto: 'ASSOCIADO' | 'EXTERNO' = 'ASSOCIADO';
  buscaTexto = '';
  buscando = false;
  resultados: { id: number; nomeCompleto: string; cpf: string }[] = [];
  form = { associadoSubstitutoId: 0, associadoSubstitutoLabel: '', nomeCompleto: '', cpf: '', nomeSubstituido: '' };

  constructor(
    private service: VisitanteService,
    private associadoService: AssociadoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  buscar(): void {
    if (this.buscaTexto.trim().length < 2) return;
    this.buscando = true;
    this.associadoService.buscarParaSelect(this.buscaTexto.trim()).subscribe({
      next: (r) => { this.resultados = r.data; this.buscando = false; },
      error: () => { this.buscando = false; }
    });
  }

  selecionar(a: { id: number; nomeCompleto: string; cpf: string }): void {
    this.form.associadoSubstitutoId = a.id;
    this.form.associadoSubstitutoLabel = `${a.nomeCompleto} (${a.cpf})`;
    this.buscaTexto = this.form.associadoSubstitutoLabel;
    this.resultados = [];
  }

  salvar(): void {
    const payload: Record<string, unknown> = { nomeSubstituido: this.form.nomeSubstituido };
    if (this.tipoSubstituto === 'ASSOCIADO') {
      if (!this.form.associadoSubstitutoId) { this.toastr.warning('Selecione o substituto'); return; }
      payload['associadoSubstitutoId'] = this.form.associadoSubstitutoId;
    } else {
      if (!this.form.nomeCompleto) { this.toastr.warning('Informe o nome do substituto'); return; }
      payload['nomeCompleto'] = this.form.nomeCompleto;
      payload['cpf'] = this.form.cpf;
    }
    this.salvando = true;
    this.service.registrarSubstituto(payload).subscribe({
      next: (r) => { this.toastr.success(r.message); this.salvando = false; this.router.navigate(['/visitantes/validacao']); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro'); this.salvando = false; }
    });
  }
}
