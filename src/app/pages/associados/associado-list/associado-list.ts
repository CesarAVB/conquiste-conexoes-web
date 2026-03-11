// src/app/pages/associados/associado-list/associado-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { AssociadoService } from '../../../services/associado';
import { ClusterService } from '../../../services/cluster';
import { EquipeService } from '../../../services/equipe';
import { Associado } from '../../../models/associado.model';
import { Cluster } from '../../../models/cluster.model';
import { Equipe } from '../../../models/equipe.model';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-associado-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent, LoadingSpinner],
  templateUrl: './associado-list.html',
  styleUrl: './associado-list.scss'
})
export class AssociadoListComponent implements OnInit {

  associados: Associado[] = [];
  clusters: Cluster[] = [];
  equipes: Equipe[] = [];
  loading = true;

  filtro = {
    busca: '',
    status: '',
    clusterId: '',
    equipeId: ''
  };

  readonly statusOpcoes = [
    { valor: 'ATIVO', label: 'Ativo' },
    { valor: 'EM_FORMACAO', label: 'Em Formação' },
    { valor: 'PAUSA_PROGRAMADA', label: 'Pausa Programada' },
    { valor: 'PAUSADO', label: 'Pausado' },
    { valor: 'DESISTENTE', label: 'Desistente' },
    { valor: 'DESLIGADO', label: 'Desligado' },
  ];

  constructor(
    private associadoService: AssociadoService,
    private clusterService: ClusterService,
    private equipeService: EquipeService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarFiltros();
    this.carregar();
  }

  carregarFiltros(): void {
    this.clusterService.listarAtivos().subscribe({
      next: (res) => this.clusters = res.data,
      error: () => {}
    });
    this.equipeService.listar().subscribe({
      next: (res) => this.equipes = res.data,
      error: () => {}
    });
  }

  carregar(): void {
    this.loading = true;
    this.associadoService.listar({
      busca: this.filtro.busca || undefined,
      status: this.filtro.status || undefined,
      clusterId: this.filtro.clusterId ? +this.filtro.clusterId : undefined,
      equipeId: this.filtro.equipeId ? +this.filtro.equipeId : undefined,
    }).subscribe({
      next: (res) => {
        this.associados = res.data;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Erro ao carregar associados');
        this.loading = false;
      }
    });
  }

  limparFiltros(): void {
    this.filtro = { busca: '', status: '', clusterId: '', equipeId: '' };
    this.carregar();
  }

  badgeStatus(status: string): string {
    const map: Record<string, string> = {
      ATIVO: 'bg-success',
      EM_FORMACAO: 'bg-info',
      PAUSA_PROGRAMADA: 'bg-warning text-dark',
      PAUSADO: 'bg-warning text-dark',
      DESISTENTE: 'bg-secondary',
      DESLIGADO: 'bg-danger',
    };
    return map[status] ?? 'bg-secondary';
  }

  labelStatus(status: string): string {
    const found = this.statusOpcoes.find(s => s.valor === status);
    return found?.label ?? status;
  }
}
