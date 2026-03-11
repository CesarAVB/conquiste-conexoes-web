import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConexaoService, Conexao } from '../../../../services/conexao';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-conexao-recebidas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './conexao-recebidas.html',
  styleUrl: './conexao-recebidas.scss'
})
export class ConexaoRecebidasComponent implements OnInit {
  loading = true;
  conexoes: Conexao[] = [];
  selecionada: Conexao | null = null;
  modoAtualizar = false;
  atualizando = false;
  formUpdate = { status: '', valorNegocio: 0, motivoNaoFechamento: '' };

  tipoClass: Record<string, string> = { QUENTE: 'bg-danger', MORNA: 'bg-warning text-dark', FRIA: 'bg-info text-dark' };
  statusClass: Record<string, string> = { NOVA: 'bg-secondary', EM_ANDAMENTO: 'bg-primary', FECHADA: 'bg-success', NAO_FECHADA: 'bg-danger' };
  statusLabel: Record<string, string> = { NOVA: 'Nova', EM_ANDAMENTO: 'Em Andamento', FECHADA: 'Fechada', NAO_FECHADA: 'Não Fechada' };

  constructor(private service: ConexaoService, private toastr: ToastrService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.service.listarRecebidas().subscribe({
      next: (r) => { this.conexoes = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }

  abrirAtualizar(c: Conexao): void { this.selecionada = c; this.modoAtualizar = true; this.formUpdate = { status: c.status, valorNegocio: 0, motivoNaoFechamento: '' }; }

  atualizar(): void {
    this.atualizando = true;
    const payload: { status: string; valorNegocio?: number; motivoNaoFechamento?: string } = { status: this.formUpdate.status };
    if (this.formUpdate.status === 'FECHADA') payload.valorNegocio = this.formUpdate.valorNegocio;
    if (this.formUpdate.status === 'NAO_FECHADA') payload.motivoNaoFechamento = this.formUpdate.motivoNaoFechamento;
    this.service.atualizar(this.selecionada!.id, payload).subscribe({
      next: (r) => { this.toastr.success(r.message); this.modoAtualizar = false; this.atualizando = false; this.carregar(); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro'); this.atualizando = false; }
    });
  }
}
