// src/app/pages/perfil/perfil-view/perfil-view.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { PerfilAssociadoService } from '../../../services/perfil-associado';
import { PerfilAssociado } from '../../../models/perfil-associado.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-perfil-view',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner],
  templateUrl: './perfil-view.html',
  styleUrl: './perfil-view.scss'
})
export class PerfilViewComponent implements OnInit {
  associadoId!: number;
  loading = true;
  perfil: PerfilAssociado | null = null;

  statusClasses: Record<string, string> = {
    ATIVO: 'bg-success', INATIVO: 'bg-secondary', PAUSA_PROGRAMADA: 'bg-warning text-dark',
    DESISTENTE: 'bg-danger', DESLIGADO: 'bg-danger'
  };

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilAssociadoService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.associadoId = +this.route.snapshot.paramMap.get('id')!;
    this.perfilService.buscar(this.associadoId).subscribe({
      next: (res) => { this.perfil = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar perfil'); this.loading = false; }
    });
  }
}
