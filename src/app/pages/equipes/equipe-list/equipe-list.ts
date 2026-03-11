// src/app/pages/equipes/equipe-list/equipe-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { EquipeService } from '../../../services/equipe';
import { Equipe } from '../../../models/equipe.model';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-equipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent, LoadingSpinner],
  templateUrl: './equipe-list.html',
  styleUrl: './equipe-list.scss'
})
export class EquipeListComponent implements OnInit {

  equipes: Equipe[] = [];
  loading = true;
  filtroStatus = '';

  readonly statusOpcoes = [
    { valor: 'EM_FORMACAO', label: 'Em Formação' },
    { valor: 'ATIVA', label: 'Ativa' },
    { valor: 'INATIVA', label: 'Inativa' },
  ];

  constructor(
    private equipeService: EquipeService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.equipeService.listar(this.filtroStatus ? { status: this.filtroStatus } : {}).subscribe({
      next: (res) => { this.equipes = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar equipes'); this.loading = false; }
    });
  }

  badgeStatus(status: string): string {
    const map: Record<string, string> = {
      EM_FORMACAO: 'bg-info',
      ATIVA: 'bg-success',
      INATIVA: 'bg-secondary',
    };
    return map[status] ?? 'bg-secondary';
  }

  labelStatus(status: string): string {
    return this.statusOpcoes.find(s => s.valor === status)?.label ?? status;
  }
}
