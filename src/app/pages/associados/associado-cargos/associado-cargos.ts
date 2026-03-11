// src/app/pages/associados/associado-cargos/associado-cargos.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast';
import { AssociadoCargoService } from '../../../services/associado-cargo';
import { CargoLiderancaService } from '../../../services/cargo-lideranca';
import { AssociadoCargo } from '../../../models/associado-cargo.model';
import { CargoLideranca } from '../../../models/cargo-lideranca.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-associado-cargos',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinner],
  templateUrl: './associado-cargos.html',
  styleUrl: './associado-cargos.scss'
})
export class AssociadoCargosComponent implements OnInit {
  @Input() associadoId!: number;

  vinculos: AssociadoCargo[] = [];
  cargos: CargoLideranca[] = [];
  loading = true;
  modoForm = false;
  loadingForm = false;
  encerrando: number | null = null;
  dataFimEncerrar = '';

  form = { cargoId: '', dataInicio: '' };

  constructor(
    private vinculoService: AssociadoCargoService,
    private cargoService: CargoLiderancaService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarCargos();
    this.carregar();
  }

  carregarCargos(): void {
    this.cargoService.listarAtivos().subscribe({
      next: (res) => this.cargos = res.data,
      error: () => {}
    });
  }

  carregar(): void {
    this.loading = true;
    this.vinculoService.listarPorAssociado(this.associadoId).subscribe({
      next: (res) => { this.vinculos = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar cargos'); this.loading = false; }
    });
  }

  vincular(): void {
    if (!this.form.cargoId || !this.form.dataInicio) {
      this.toastr.warning('Preencha cargo e data de início');
      return;
    }
    this.loadingForm = true;
    this.vinculoService.vincular(this.associadoId, { cargoId: +this.form.cargoId, dataInicio: this.form.dataInicio }).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.modoForm = false;
        this.form = { cargoId: '', dataInicio: '' };
        this.loadingForm = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao vincular cargo');
        this.loadingForm = false;
      }
    });
  }

  iniciarEncerramento(id: number): void { this.encerrando = id; this.dataFimEncerrar = ''; }
  cancelarEncerramento(): void { this.encerrando = null; }

  encerrar(): void {
    if (!this.encerrando || !this.dataFimEncerrar) {
      this.toastr.warning('Informe a data de encerramento');
      return;
    }
    this.vinculoService.encerrar(this.associadoId, this.encerrando, this.dataFimEncerrar).subscribe({
      next: () => {
        this.toastr.success('Vínculo encerrado');
        this.encerrando = null;
        this.carregar();
      },
      error: () => this.toastr.error('Erro ao encerrar vínculo')
    });
  }

  cargoAtivo(v: AssociadoCargo): boolean { return !v.dataFim; }
}
