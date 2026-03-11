// src/app/pages/equipes/equipe-cargos/equipe-cargos.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast';
import { EquipeService } from '../../../services/equipe';
import { CargoLiderancaService } from '../../../services/cargo-lideranca';
import { CargoAtivoEquipe } from '../../../models/cargo-ativo-equipe.model';
import { CargoLideranca } from '../../../models/cargo-lideranca.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-equipe-cargos',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinner],
  templateUrl: './equipe-cargos.html',
  styleUrl: './equipe-cargos.scss'
})
export class EquipeCargosComponent implements OnInit {
  @Input() equipeId!: number;

  cargosAtivos: CargoAtivoEquipe[] = [];
  todosCargos: CargoLideranca[] = [];
  loading = true;
  cargoSelecionado = '';
  loadingAtivar = false;

  constructor(
    private equipeService: EquipeService,
    private cargoService: CargoLiderancaService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.cargregarCargos();
    this.carregar();
  }

  cargregarCargos(): void {
    this.cargoService.listarAtivos().subscribe({
      next: (res) => this.todosCargos = res.data,
      error: () => {}
    });
  }

  carregar(): void {
    this.loading = true;
    this.equipeService.listarCargosAtivos(this.equipeId).subscribe({
      next: (res) => { this.cargosAtivos = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar cargos'); this.loading = false; }
    });
  }

  ativar(): void {
    if (!this.cargoSelecionado) return;
    this.loadingAtivar = true;
    this.equipeService.ativarCargo(this.equipeId, +this.cargoSelecionado).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.cargoSelecionado = '';
        this.loadingAtivar = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao ativar cargo');
        this.loadingAtivar = false;
      }
    });
  }

  cargosDisponiveis(): CargoLideranca[] {
    const idsAtivos = this.cargosAtivos.map(c => c.cargoId);
    return this.todosCargos.filter(c => !idsAtivos.includes(c.id));
  }
}
