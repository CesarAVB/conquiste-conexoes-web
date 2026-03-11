import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
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
      {
        path: 'associados/:id/seguro/solicitacoes',
        loadComponent: () => import('./pages/seguro/solicitacao-list/solicitacao-list').then(m => m.SolicitacaoListComponent)
      },
      {
        path: 'associados/:id/seguro/solicitacao',
        loadComponent: () => import('./pages/seguro/solicitacao-form/solicitacao-form').then(m => m.SolicitacaoFormComponent)
      },
      {
        path: 'associados/:id/seguro/solicitacao/:solId',
        loadComponent: () => import('./pages/seguro/solicitacao-form/solicitacao-form').then(m => m.SolicitacaoFormComponent)
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
      // F6A - REUNIÕES
      {
        path: 'reunioes',
        loadComponent: () => import('./pages/operacional/reunioes/reuniao-list/reuniao-list').then(m => m.ReuniaoListComponent)
      },
      {
        path: 'reunioes/agendar',
        loadComponent: () => import('./pages/operacional/reunioes/reuniao-agendar/reuniao-agendar').then(m => m.ReuniaoAgendarComponent)
      },
      {
        path: 'reunioes/validar/:id',
        loadComponent: () => import('./pages/operacional/reunioes/reuniao-validar/reuniao-validar').then(m => m.ReuniaoValidarComponent)
      },
      {
        path: 'reunioes/:id',
        loadComponent: () => import('./pages/operacional/reunioes/reuniao-detalhe/reuniao-detalhe').then(m => m.ReuniaoDetalheComponent)
      },
      // F6B - CONEXÕES
      {
        path: 'conexoes',
        loadComponent: () => import('./pages/operacional/conexoes/conexao-geradas/conexao-geradas').then(m => m.ConexaoGeradasComponent)
      },
      {
        path: 'conexoes/nova',
        loadComponent: () => import('./pages/operacional/conexoes/conexao-nova/conexao-nova').then(m => m.ConexaoNovaComponent)
      },
      {
        path: 'conexoes/recebidas',
        loadComponent: () => import('./pages/operacional/conexoes/conexao-recebidas/conexao-recebidas').then(m => m.ConexaoRecebidasComponent)
      },
      // F6C - PARCERIAS
      {
        path: 'parcerias',
        loadComponent: () => import('./pages/operacional/parcerias/parceria-list/parceria-list').then(m => m.ParceriaListComponent)
      },
      {
        path: 'parcerias/nova',
        loadComponent: () => import('./pages/operacional/parcerias/parceria-nova/parceria-nova').then(m => m.ParceriaNovaComponent)
      },
      // F6D - VISITANTES
      {
        path: 'visitantes/externo',
        loadComponent: () => import('./pages/operacional/visitantes/visitante-externo-form/visitante-externo-form').then(m => m.VisitanteExternoFormComponent)
      },
      {
        path: 'visitantes/interno',
        loadComponent: () => import('./pages/operacional/visitantes/visita-interna-form/visita-interna-form').then(m => m.VisitaInternaFormComponent)
      },
      {
        path: 'visitantes/substituto',
        loadComponent: () => import('./pages/operacional/visitantes/substituto-form/substituto-form').then(m => m.SubstitutoFormComponent)
      },
      {
        path: 'visitantes/validacao',
        loadComponent: () => import('./pages/operacional/visitantes/visitante-validacao/visitante-validacao').then(m => m.VisitanteValidacaoComponent)
      },
      // F6E - EDUCACIONAL
      {
        path: 'educacional/peen',
        loadComponent: () => import('./pages/operacional/educacional/peen-modulos/peen-modulos').then(m => m.PeenModulosComponent)
      },
      {
        path: 'educacional/teen',
        loadComponent: () => import('./pages/operacional/educacional/teen-eventos/teen-eventos').then(m => m.TeenEventosComponent)
      },
      {
        path: 'educacional/teen/inscricao/:id',
        loadComponent: () => import('./pages/operacional/educacional/teen-inscricao/teen-inscricao').then(m => m.TeenInscricaoComponent)
      },
      // F6F - PAINÉIS
      {
        path: 'paineis/semanal',
        loadComponent: () => import('./pages/operacional/paineis/painel-semanal/painel-semanal').then(m => m.PainelSemanalComponent)
      },
      {
        path: 'paineis/evolucao',
        loadComponent: () => import('./pages/operacional/paineis/painel-evolucao/painel-evolucao').then(m => m.PainelEvolucaoComponent)
      },
      {
        path: 'paineis/equipe',
        loadComponent: () => import('./pages/operacional/paineis/painel-equipe/painel-equipe').then(m => m.PainelEquipeComponent)
      },
      // F6G - RELATÓRIOS
      {
        path: 'relatorios/presenca',
        loadComponent: () => import('./pages/operacional/relatorios/relatorio-presenca/relatorio-presenca').then(m => m.RelatorioPresencaComponent)
      },
      {
        path: 'relatorios/conquistas',
        loadComponent: () => import('./pages/operacional/relatorios/relatorio-conquistas/relatorio-conquistas').then(m => m.RelatorioConquistasComponent)
      },
      // DEFAULT
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];