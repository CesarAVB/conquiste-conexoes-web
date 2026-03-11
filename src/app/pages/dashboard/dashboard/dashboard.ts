// src/app/pages/dashboard/dashboard/dashboard.ts
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { PainelService, IndicadorSemanal, EvolucaoItem } from '../../../services/painel';
import { ConexaoService, Conexao } from '../../../services/conexao';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private painelService = inject(PainelService);
  private conexaoService = inject(ConexaoService);
  private toastr = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  // Painel 1 — Indicadores da Semana
  loadingSemanal = true;
  indicadores: IndicadorSemanal[] = [];

  // Painel 2 — Evolução Individual
  loadingEvolucao = true;
  periodoEvolucao: '1M' | '6M' | 'TOTAL' = '1M';
  dadosEvolucao: EvolucaoItem[] = [];

  // Painel 3 — Performance da Equipe
  loadingEquipe = true;
  periodoEquipe: '1M' | '3M' | 'TOTAL' = '1M';
  dadosEquipe: EvolucaoItem[] = [];

  // Painel 4 — NR (Negócios Recebidos)
  loadingNR = true;
  conexoesNR: Conexao[] = [];

  // Painel 4 — NG (Negócios Gerados)
  loadingNG = true;
  conexoesNG: Conexao[] = [];

  readonly dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  ngOnInit(): void {
    this.carregarSemanal();
    this.carregarEvolucao();
    this.carregarEquipe();
    this.carregarConexoes();
  }

  carregarSemanal(): void {
    this.loadingSemanal = true;
    this.painelService.semanal().subscribe({
      next: (r) => { this.indicadores = r.data; this.loadingSemanal = false; this.cdr.markForCheck(); },
      error: () => { this.toastr.error('Erro ao carregar indicadores'); this.loadingSemanal = false; this.cdr.markForCheck(); },
    });
  }

  carregarEvolucao(): void {
    this.loadingEvolucao = true;
    this.painelService.evolucaoIndividual(this.periodoEvolucao).subscribe({
      next: (r) => { this.dadosEvolucao = r.data; this.loadingEvolucao = false; this.cdr.markForCheck(); },
      error: () => { this.toastr.error('Erro ao carregar evolução'); this.loadingEvolucao = false; this.cdr.markForCheck(); },
    });
  }

  carregarEquipe(): void {
    this.loadingEquipe = true;
    this.painelService.performanceEquipe(this.periodoEquipe).subscribe({
      next: (r) => { this.dadosEquipe = r.data; this.loadingEquipe = false; this.cdr.markForCheck(); },
      error: () => { this.toastr.error('Erro ao carregar equipe'); this.loadingEquipe = false; this.cdr.markForCheck(); },
    });
  }

  carregarConexoes(): void {
    this.conexaoService.listarRecebidas().subscribe({
      next: (r) => { this.conexoesNR = r.data; this.loadingNR = false; this.cdr.markForCheck(); },
      error: () => { this.loadingNR = false; this.cdr.markForCheck(); },
    });
    this.conexaoService.listarGeradas().subscribe({
      next: (r) => { this.conexoesNG = r.data; this.loadingNG = false; this.cdr.markForCheck(); },
      error: () => { this.loadingNG = false; this.cdr.markForCheck(); },
    });
  }

  setPeriodoEvolucao(p: '1M' | '6M' | 'TOTAL'): void {
    if (this.periodoEvolucao === p) return;
    this.periodoEvolucao = p;
    this.carregarEvolucao();
  }

  setPeriodoEquipe(p: '1M' | '3M' | 'TOTAL'): void {
    if (this.periodoEquipe === p) return;
    this.periodoEquipe = p;
    this.carregarEquipe();
  }

  statusLabel(status: string): string {
    const labels: Record<string, string> = {
      NOVA: 'Nova', EM_ANDAMENTO: 'Em Andamento', FECHADA: 'Fechada', NAO_FECHADA: 'Não Fechada',
    };
    return labels[status] ?? status;
  }

  statusClass(status: string): string {
    const classes: Record<string, string> = {
      NOVA: 'status--nova',
      EM_ANDAMENTO: 'status--andamento',
      FECHADA: 'status--fechada',
      NAO_FECHADA: 'status--nao-fechada',
    };
    return classes[status] ?? '';
  }
}
