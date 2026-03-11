// src/app/pages/associados/associado-detail/associado-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { AssociadoService } from '../../../services/associado';
import { Associado } from '../../../models/associado.model';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { AssociadoEnderecosComponent } from '../associado-enderecos/associado-enderecos';
import { AssociadoEmpresaComponent } from '../associado-empresa/associado-empresa';
import { AssociadoCargosComponent } from '../associado-cargos/associado-cargos';
import { AssociadoGrupamentosComponent } from '../associado-grupamentos/associado-grupamentos';
import { AssociadoAnuidadesComponent } from '../associado-anuidades/associado-anuidades';
import { AssociadoStatusComponent } from '../associado-status/associado-status';

type Aba = 'dados' | 'enderecos' | 'empresa' | 'cargos' | 'grupamentos' | 'anuidades';

@Component({
  selector: 'app-associado-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    LoadingSpinner,
    AssociadoEnderecosComponent,
    AssociadoEmpresaComponent,
    AssociadoCargosComponent,
    AssociadoGrupamentosComponent,
    AssociadoAnuidadesComponent,
    AssociadoStatusComponent,
  ],
  templateUrl: './associado-detail.html',
  styleUrl: './associado-detail.scss'
})
export class AssociadoDetailComponent implements OnInit {

  id!: number;
  associado: Associado | null = null;
  loading = true;
  abaAtiva: Aba = 'dados';
  modalStatusVisivel = false;

  constructor(
    private associadoService: AssociadoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.associadoService.buscarPorId(this.id).subscribe({
      next: (res) => {
        this.associado = res.data;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Associado não encontrado');
        this.router.navigate(['/associados']);
      }
    });
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
    const map: Record<string, string> = {
      ATIVO: 'Ativo',
      EM_FORMACAO: 'Em Formação',
      PAUSA_PROGRAMADA: 'Pausa Programada',
      PAUSADO: 'Pausado',
      DESISTENTE: 'Desistente',
      DESLIGADO: 'Desligado',
    };
    return map[status] ?? status;
  }

  onStatusAlterado(): void {
    this.modalStatusVisivel = false;
    this.carregar();
  }
}
