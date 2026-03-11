// src/app/pages/equipes/equipe-detail/equipe-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipeService } from '../../../services/equipe';
import { Equipe } from '../../../models/equipe.model';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from '../../../components/shared/confirm-dialog/confirm-dialog';
import { EquipeDiretoresComponent } from '../equipe-diretores/equipe-diretores';
import { EquipeCargosComponent } from '../equipe-cargos/equipe-cargos';
import { EquipeDesignacoesComponent } from '../equipe-designacoes/equipe-designacoes';
import { EquipeCiclosComponent } from '../equipe-ciclos/equipe-ciclos';

type Aba = 'dados' | 'diretores' | 'cargos' | 'designacoes' | 'ciclos';

@Component({
  selector: 'app-equipe-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    LoadingSpinner,
    ConfirmDialogComponent,
    EquipeDiretoresComponent,
    EquipeCargosComponent,
    EquipeDesignacoesComponent,
    EquipeCiclosComponent,
  ],
  templateUrl: './equipe-detail.html',
  styleUrl: './equipe-detail.scss'
})
export class EquipeDetailComponent implements OnInit {

  id!: number;
  equipe: Equipe | null = null;
  loading = true;
  abaAtiva: Aba = 'dados';
  confirmLancamento = false;
  loadingLancamento = false;

  constructor(
    private equipeService: EquipeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.equipeService.buscarPorId(this.id).subscribe({
      next: (res) => { this.equipe = res.data; this.loading = false; },
      error: () => {
        this.toastr.error('Equipe não encontrada');
        this.router.navigate(['/equipes']);
      }
    });
  }

  lancar(): void {
    this.loadingLancamento = true;
    this.equipeService.lancar(this.id).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.confirmLancamento = false;
        this.loadingLancamento = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao lançar equipe');
        this.confirmLancamento = false;
        this.loadingLancamento = false;
      }
    });
  }

  badgeStatus(status: string): string {
    const map: Record<string, string> = { EM_FORMACAO: 'bg-info', ATIVA: 'bg-success', INATIVA: 'bg-secondary' };
    return map[status] ?? 'bg-secondary';
  }

  labelStatus(status: string): string {
    const map: Record<string, string> = { EM_FORMACAO: 'Em Formação', ATIVA: 'Ativa', INATIVA: 'Inativa' };
    return map[status] ?? status;
  }

  labelDia(dia: string): string {
    const map: Record<string, string> = { TERCA: 'Terça-feira', QUARTA: 'Quarta-feira', QUINTA: 'Quinta-feira', SEXTA: 'Sexta-feira' };
    return map[dia] ?? dia;
  }
}
