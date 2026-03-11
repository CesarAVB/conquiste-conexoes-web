// src/app/pages/seguro/solicitacao-form/solicitacao-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { CadastroSeguroService } from '../../../services/cadastro-seguro';
import { AssociadoService } from '../../../services/associado';
import { SolicitacaoAlteracao } from '../../../models/solicitacao-alteracao.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-solicitacao-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './solicitacao-form.html',
  styleUrl: './solicitacao-form.scss'
})
export class SolicitacaoFormComponent implements OnInit {
  associadoId!: number;
  solicitacaoId: number | null = null;
  loading = true;
  salvando = false;
  solicitacao: SolicitacaoAlteracao | null = null;
  modoAdmin = false;

  // Para nova solicitação (associado)
  justificativa = '';

  // Para resolução (admin)
  resolucaoStatus = '';
  buscaResponsavel = '';
  buscando = false;
  responsaveisResultado: { id: number; nomeCompleto: string; cpf: string }[] = [];
  responsavelId = 0;
  responsavelLabel = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seguroService: CadastroSeguroService,
    private associadoService: AssociadoService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.associadoId = +this.route.snapshot.paramMap.get('id')!;
    const solId = this.route.snapshot.paramMap.get('solId');
    if (solId) {
      this.solicitacaoId = +solId;
      this.modoAdmin = true;
      this.loading = false; // não carrega a solicitacao individualmente por enquanto
    } else {
      this.loading = false;
    }
  }

  buscarResponsavel(): void {
    if (this.buscaResponsavel.trim().length < 2) return;
    this.buscando = true;
    this.associadoService.buscarParaSelect(this.buscaResponsavel.trim()).subscribe({
      next: (res) => { this.responsaveisResultado = res.data; this.buscando = false; },
      error: () => { this.buscando = false; }
    });
  }

  selecionarResponsavel(a: { id: number; nomeCompleto: string; cpf: string }): void {
    this.responsavelId = a.id;
    this.responsavelLabel = `${a.nomeCompleto} (${a.cpf})`;
    this.buscaResponsavel = this.responsavelLabel;
    this.responsaveisResultado = [];
  }

  enviar(): void {
    if (!this.justificativa.trim()) { this.toastr.warning('Informe a justificativa'); return; }
    this.salvando = true;
    this.seguroService.criarSolicitacao(this.associadoId, this.justificativa).subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'Solicitação enviada!');
        this.salvando = false;
        this.router.navigate(['/associados', this.associadoId, 'seguro', 'view']);
      },
      error: (err) => { this.toastr.error(err.error?.message || 'Erro ao enviar'); this.salvando = false; }
    });
  }

  resolver(): void {
    if (!this.resolucaoStatus || !this.responsavelId) { this.toastr.warning('Preencha o status e o responsável'); return; }
    this.salvando = true;
    this.seguroService.resolverSolicitacao(this.associadoId, this.solicitacaoId!, { status: this.resolucaoStatus, responsavelId: this.responsavelId }).subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'Resolvido com sucesso!');
        this.salvando = false;
        this.router.navigate(['/associados', this.associadoId, 'seguro', 'solicitacoes']);
      },
      error: (err) => { this.toastr.error(err.error?.message || 'Erro ao resolver'); this.salvando = false; }
    });
  }
}
