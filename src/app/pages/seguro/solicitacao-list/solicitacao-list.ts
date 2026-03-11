// src/app/pages/seguro/solicitacao-list/solicitacao-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CadastroSeguroService } from '../../../services/cadastro-seguro';
import { SolicitacaoAlteracao } from '../../../models/solicitacao-alteracao.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-solicitacao-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './solicitacao-list.html',
  styleUrl: './solicitacao-list.scss'
})
export class SolicitacaoListComponent implements OnInit {
  associadoId!: number;
  loading = true;
  solicitacoes: SolicitacaoAlteracao[] = [];
  filtroStatus = '';

  statusLabels: Record<string, string> = {
    SOLICITADO: 'Solicitado', EM_ANALISE: 'Em Análise', APROVADO: 'Aprovado', REJEITADO: 'Rejeitado'
  };
  statusClasses: Record<string, string> = {
    SOLICITADO: 'bg-warning text-dark', EM_ANALISE: 'bg-info text-dark', APROVADO: 'bg-success', REJEITADO: 'bg-danger'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seguroService: CadastroSeguroService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.associadoId = +this.route.snapshot.paramMap.get('id')!;
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.seguroService.listarSolicitacoes(this.associadoId).subscribe({
      next: (res) => { this.solicitacoes = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar solicitações'); this.loading = false; }
    });
  }

  get listagem(): SolicitacaoAlteracao[] {
    if (!this.filtroStatus) return this.solicitacoes;
    return this.solicitacoes.filter(s => s.status === this.filtroStatus);
  }

  nova(): void {
    this.router.navigate(['/associados', this.associadoId, 'seguro', 'solicitacao']);
  }

  resolver(s: SolicitacaoAlteracao): void {
    this.router.navigate(['/associados', this.associadoId, 'seguro', 'solicitacao', s.id]);
  }
}
