// src/app/pages/associados/associado-grupamentos/associado-grupamentos.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast';
import { AssociadoGrupamentoService } from '../../../services/associado-grupamento';
import { GrupamentoEstrategicoService } from '../../../services/grupamento-estrategico';
import { AssociadoGrupamento } from '../../../models/associado-grupamento.model';
import { GrupamentoEstrategico } from '../../../models/grupamento-estrategico.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from '../../../components/shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-associado-grupamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinner, ConfirmDialogComponent],
  templateUrl: './associado-grupamentos.html',
  styleUrl: './associado-grupamentos.scss'
})
export class AssociadoGrupamentosComponent implements OnInit {
  @Input() associadoId!: number;

  vinculos: AssociadoGrupamento[] = [];
  grupamentos: GrupamentoEstrategico[] = [];
  loading = true;
  grupamentoSelecionado = '';
  loadingVincular = false;
  confirmVisible = false;
  selecionado: AssociadoGrupamento | null = null;

  constructor(
    private vinculoService: AssociadoGrupamentoService,
    private grupamentoService: GrupamentoEstrategicoService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarGrupamentos();
    this.carregar();
  }

  carregarGrupamentos(): void {
    this.grupamentoService.listarAtivos().subscribe({
      next: (res) => this.grupamentos = res.data,
      error: () => {}
    });
  }

  carregar(): void {
    this.loading = true;
    this.vinculoService.listarPorAssociado(this.associadoId).subscribe({
      next: (res) => { this.vinculos = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar grupamentos'); this.loading = false; }
    });
  }

  vincular(): void {
    if (!this.grupamentoSelecionado) return;
    this.loadingVincular = true;
    this.vinculoService.vincular(this.associadoId, +this.grupamentoSelecionado).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.grupamentoSelecionado = '';
        this.loadingVincular = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao vincular grupamento');
        this.loadingVincular = false;
      }
    });
  }

  confirmarDesvincular(v: AssociadoGrupamento): void { this.selecionado = v; this.confirmVisible = true; }
  cancelar(): void { this.confirmVisible = false; this.selecionado = null; }

  desvincular(): void {
    if (!this.selecionado) return;
    this.vinculoService.desvincular(this.associadoId, this.selecionado.id).subscribe({
      next: () => {
        this.toastr.success('Grupamento desvinculado');
        this.confirmVisible = false;
        this.selecionado = null;
        this.carregar();
      },
      error: () => this.toastr.error('Erro ao desvincular grupamento')
    });
  }

  grupamentosDisponiveis(): GrupamentoEstrategico[] {
    const ids = this.vinculos.map(v => v.grupamentoId);
    return this.grupamentos.filter(g => !ids.includes(g.id));
  }
}
