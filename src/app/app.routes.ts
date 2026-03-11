import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      // ADMIN - Tabelas Base
      {
        path: 'admin/clusters',
        loadComponent: () => import('./pages/admin/clusters/cluster-list/cluster-list').then(m => m.ClusterListComponent)
      },
      {
        path: 'admin/clusters/novo',
        loadComponent: () => import('./pages/admin/clusters/cluster-form/cluster-form').then(m => m.ClusterFormComponent)
      },
      {
        path: 'admin/clusters/editar/:id',
        loadComponent: () => import('./pages/admin/clusters/cluster-form/cluster-form').then(m => m.ClusterFormComponent)
      },
      {
        path: 'admin/atuacoes',
        loadComponent: () => import('./pages/admin/atuacoes/atuacao-list/atuacao-list').then(m => m.AtuacaoListComponent)
      },
      {
        path: 'admin/atuacoes/novo',
        loadComponent: () => import('./pages/admin/atuacoes/atuacao-form/atuacao-form').then(m => m.AtuacaoFormComponent)
      },
      {
        path: 'admin/atuacoes/editar/:id',
        loadComponent: () => import('./pages/admin/atuacoes/atuacao-form/atuacao-form').then(m => m.AtuacaoFormComponent)
      },
      {
        path: 'admin/grupamentos',
        loadComponent: () => import('./pages/admin/grupamentos/grupamento-list/grupamento-list').then(m => m.GrupamentoListComponent)
      },
      {
        path: 'admin/grupamentos/novo',
        loadComponent: () => import('./pages/admin/grupamentos/grupamento-form/grupamento-form').then(m => m.GrupamentoFormComponent)
      },
      {
        path: 'admin/grupamentos/editar/:id',
        loadComponent: () => import('./pages/admin/grupamentos/grupamento-form/grupamento-form').then(m => m.GrupamentoFormComponent)
      },
      {
        path: 'admin/cargos',
        loadComponent: () => import('./pages/admin/cargos/cargo-list/cargo-list').then(m => m.CargoListComponent)
      },
      {
        path: 'admin/cargos/novo',
        loadComponent: () => import('./pages/admin/cargos/cargo-form/cargo-form').then(m => m.CargoFormComponent)
      },
      {
        path: 'admin/cargos/editar/:id',
        loadComponent: () => import('./pages/admin/cargos/cargo-form/cargo-form').then(m => m.CargoFormComponent)
      },
      {
        path: 'admin/horarios',
        loadComponent: () => import('./pages/admin/horarios/horario-list/horario-list').then(m => m.HorarioListComponent)
      },
      {
        path: 'admin/horarios/novo',
        loadComponent: () => import('./pages/admin/horarios/horario-form/horario-form').then(m => m.HorarioFormComponent)
      },
      {
        path: 'admin/horarios/editar/:id',
        loadComponent: () => import('./pages/admin/horarios/horario-form/horario-form').then(m => m.HorarioFormComponent)
      },
      {
        path: 'admin/parametrizacao',
        loadComponent: () => import('./pages/admin/parametrizacao/parametrizacao-list/parametrizacao-list').then(m => m.ParametrizacaoListComponent)
      },
      {
        path: 'admin/parametrizacao/novo',
        loadComponent: () => import('./pages/admin/parametrizacao/parametrizacao-form/parametrizacao-form').then(m => m.ParametrizacaoFormComponent)
      },
      {
        path: 'admin/parametrizacao/editar/:id',
        loadComponent: () => import('./pages/admin/parametrizacao/parametrizacao-form/parametrizacao-form').then(m => m.ParametrizacaoFormComponent)
      },
      // ASSOCIADOS
      {
        path: 'associados',
        loadComponent: () => import('./pages/associados/associado-list/associado-list').then(m => m.AssociadoListComponent)
      },
      {
        path: 'associados/novo',
        loadComponent: () => import('./pages/associados/associado-form/associado-form').then(m => m.AssociadoFormComponent)
      },
      {
        path: 'associados/editar/:id',
        loadComponent: () => import('./pages/associados/associado-form/associado-form').then(m => m.AssociadoFormComponent)
      },
      {
        path: 'associados/:id',
        loadComponent: () => import('./pages/associados/associado-detail/associado-detail').then(m => m.AssociadoDetailComponent)
      },
      // EQUIPES
      {
        path: 'equipes',
        loadComponent: () => import('./pages/equipes/equipe-list/equipe-list').then(m => m.EquipeListComponent)
      },
      {
        path: 'equipes/novo',
        loadComponent: () => import('./pages/equipes/equipe-form/equipe-form').then(m => m.EquipeFormComponent)
      },
      {
        path: 'equipes/editar/:id',
        loadComponent: () => import('./pages/equipes/equipe-form/equipe-form').then(m => m.EquipeFormComponent)
      },
      {
        path: 'equipes/:id',
        loadComponent: () => import('./pages/equipes/equipe-detail/equipe-detail').then(m => m.EquipeDetailComponent)
      },
      // SEGURO
      {
        path: 'associados/:id/seguro',
        loadComponent: () => import('./pages/seguro/seguro-form/seguro-form').then(m => m.SeguroFormComponent)
      },
      {
        path: 'associados/:id/seguro/view',
        loadComponent: () => import('./pages/seguro/seguro-view/seguro-view').then(m => m.SeguroViewComponent)
      },
      // PERFIL
      {
        path: 'associados/:id/perfil',
        loadComponent: () => import('./pages/perfil/perfil-form/perfil-form').then(m => m.PerfilFormComponent)
      },
      {
        path: 'associados/:id/perfil/view',
        loadComponent: () => import('./pages/perfil/perfil-view/perfil-view').then(m => m.PerfilViewComponent)
      },
      // DEFAULT
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];