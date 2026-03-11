// src/app/pages/equipes/equipe-designacoes/equipe-designacoes.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast';
import { EquipeService } from '../../../services/equipe';
import { AssociadoService } from '../../../services/associado';
import { DesignacaoLideranca } from '../../../models/designacao-lideranca.model';
import { CargoAtivoEquipe } from '../../../models/cargo-ativo-equipe.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-equipe-designacoes',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinner],
  templateUrl: './equipe-designacoes.html',
  styleUrl: './equipe-designacoes.scss'
})
export class EquipeDesignacoesComponent implements OnInit {
  @Input() equipeId!: number;

  designacoes: DesignacaoLideranca[] = [];
  cargosAtivos: CargoAtivoEquipe[] = [];
  loading = true;
  modoForm = false;
  loadingForm = false;
  buscaAssociado = '';
  buscando = false;
  associadosResultado: { id: number; nomeCompleto: string; cpf: string }[] = [];

  form = { cargoAtivoEquipeId: '', associadoId: 0, associadoLabel: '', dataInicio: '', dataFim: '' };

  constructor(
    private equipeService: EquipeService,
    private associadoService: AssociadoService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarCargos();
    this.carregar();
  }

  carregarCargos(): void {
    this.equipeService.listarCargosAtivos(this.equipeId).subscribe({
      next: (res) => this.cargosAtivos = res.data,
      error: () => {}
    });
  }

  carregar(): void {
    this.loading = true;
    this.equipeService.listarDesignacoes(this.equipeId).subscribe({
      next: (res) => { this.designacoes = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar designações'); this.loading = false; }
    });
  }

  buscar(): void {
    if (this.buscaAssociado.trim().length < 2) return;
    this.buscando = true;
    this.associadoService.buscarParaSelect(this.buscaAssociado.trim()).subscribe({
      next: (res) => { this.associadosResultado = res.data; this.buscando = false; },
      error: () => { this.buscando = false; }
    });
  }

  selecionarAssociado(a: { id: number; nomeCompleto: string; cpf: string }): void {
    this.form.associadoId = a.id;
    this.form.associadoLabel = `${a.nomeCompleto} (${a.cpf})`;
    this.buscaAssociado = this.form.associadoLabel;
    this.associadosResultado = [];
  }

  salvar(): void {
    if (!this.form.cargoAtivoEquipeId || !this.form.associadoId || !this.form.dataInicio) {
      this.toastr.warning('Preencha os campos obrigatórios');
      return;
    }
    this.loadingForm = true;
    this.equipeService.criarDesignacao(this.equipeId, {
      cargoAtivoEquipeId: +this.form.cargoAtivoEquipeId,
      associadoId: this.form.associadoId,
      dataInicio: this.form.dataInicio,
      dataFim: this.form.dataFim || null,
    }).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.modoForm = false;
        this.loadingForm = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao criar designação');
        this.loadingForm = false;
      }
    });
  }

  ativo(d: DesignacaoLideranca): boolean { return !d.dataFim; }
}
