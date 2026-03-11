import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { ConexaoService, Conexao } from '../../../../services/conexao';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-conexao-geradas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent, ConfirmDialogComponent],
  templateUrl: './conexao-geradas.html',
  styleUrl: './conexao-geradas.scss'
})
export class ConexaoGeradasComponent implements OnInit {
  loading = true;
  conexoes: Conexao[] = [];
  filtroStatus = '';
  confirmVisible = false;
  selecionadoId = 0;

  tipoClass: Record<string, string> = { QUENTE: 'bg-danger', MORNA: 'bg-warning text-dark', FRIA: 'bg-info text-dark' };
  statusClass: Record<string, string> = { NOVA: 'bg-secondary', EM_ANDAMENTO: 'bg-primary', FECHADA: 'bg-success', NAO_FECHADA: 'bg-danger' };
  statusLabel: Record<string, string> = { NOVA: 'Nova', EM_ANDAMENTO: 'Em Andamento', FECHADA: 'Fechada', NAO_FECHADA: 'Não Fechada' };

  constructor(private service: ConexaoService, private toastr: ToastService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.service.listarGeradas(this.filtroStatus ? { status: this.filtroStatus } : undefined).subscribe({
      next: (r) => { this.conexoes = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar conexões'); this.loading = false; }
    });
  }

  confirmarExcluir(id: number): void { this.selecionadoId = id; this.confirmVisible = true; }
  cancelar(): void { this.confirmVisible = false; this.selecionadoId = 0; }

  excluir(): void {
    this.service.excluir(this.selecionadoId).subscribe({
      next: () => { this.toastr.success('Conexão excluída'); this.confirmVisible = false; this.carregar(); },
      error: () => this.toastr.error('Erro ao excluir')
    });
  }
}
