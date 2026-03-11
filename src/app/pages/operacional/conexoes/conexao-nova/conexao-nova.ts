import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { ConexaoService } from '../../../../services/conexao';
import { AssociadoService } from '../../../../services/associado';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-conexao-nova',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './conexao-nova.html',
  styleUrl: './conexao-nova.scss'
})
export class ConexaoNovaComponent {
  salvando = false;
  buscaReceptor = '';
  buscando = false;
  receptoresResultado: { id: number; nomeCompleto: string; cpf: string }[] = [];
  form = { receptorId: 0, receptorLabel: '', nomeContato: '', telefoneContato: '', empresaContato: '', tipo: 'QUENTE' };

  constructor(
    private service: ConexaoService,
    private associadoService: AssociadoService,
    private router: Router,
    private toastr: ToastService
  ) {}

  buscar(): void {
    if (this.buscaReceptor.trim().length < 2) return;
    this.buscando = true;
    this.associadoService.buscarParaSelect(this.buscaReceptor.trim()).subscribe({
      next: (r) => { this.receptoresResultado = r.data; this.buscando = false; },
      error: () => { this.buscando = false; }
    });
  }

  selecionar(a: { id: number; nomeCompleto: string; cpf: string }): void {
    this.form.receptorId = a.id;
    this.form.receptorLabel = `${a.nomeCompleto} (${a.cpf})`;
    this.buscaReceptor = this.form.receptorLabel;
    this.receptoresResultado = [];
  }

  salvar(): void {
    if (!this.form.receptorId || !this.form.nomeContato) { this.toastr.warning('Preencha os campos obrigatórios'); return; }
    this.salvando = true;
    this.service.criar({ receptorId: this.form.receptorId, nomeContato: this.form.nomeContato, telefoneContato: this.form.telefoneContato, empresaContato: this.form.empresaContato, tipo: this.form.tipo as any }).subscribe({
      next: (r) => { this.toastr.success(r.message); this.salvando = false; this.router.navigate(['/conexoes']); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro'); this.salvando = false; }
    });
  }
}
