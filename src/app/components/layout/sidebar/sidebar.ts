import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  @Input() isOpen = true;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'fas fa-chart-pie', route: '/dashboard' },
    {
      label: 'Operacional', icon: 'fas fa-bolt', expanded: false,
      children: [
        { label: 'Reuniões', icon: 'fas fa-handshake', route: '/reunioes' },
        { label: 'Conexões', icon: 'fas fa-link', route: '/conexoes' },
        { label: 'Parcerias', icon: 'fas fa-people-arrows', route: '/parcerias' },
        { label: 'Visitantes', icon: 'fas fa-clipboard-check', route: '/visitantes/validacao' },
      ]
    },
    {
      label: 'Educacional', icon: 'fas fa-graduation-cap', expanded: false,
      children: [
        { label: 'PEEN', icon: 'fas fa-book-open', route: '/educacional/peen' },
        { label: 'TEEN', icon: 'fas fa-calendar-star', route: '/educacional/teen' },
      ]
    },
    {
      label: 'Painéis', icon: 'fas fa-tachometer-alt', expanded: false,
      children: [
        { label: 'Semanal', icon: 'fas fa-calendar-week', route: '/paineis/semanal' },
        { label: 'Evolução Individual', icon: 'fas fa-chart-line', route: '/paineis/evolucao' },
        { label: 'Performance Equipe', icon: 'fas fa-users', route: '/paineis/equipe' },
      ]
    },
    { label: 'Associados', icon: 'fas fa-id-card', route: '/associados' },
    { label: 'Equipes', icon: 'fas fa-people-group', route: '/equipes' },
    {
      label: 'Relatórios', icon: 'fas fa-file-alt', expanded: false,
      children: [
        { label: 'Presença', icon: 'fas fa-clipboard-list', route: '/relatorios/presenca' },
        { label: 'Conquistas', icon: 'fas fa-trophy', route: '/relatorios/conquistas' },
      ]
    },
    {
      label: 'Administração', icon: 'fas fa-cogs', expanded: false,
      children: [
        { label: 'Clusters', icon: 'fas fa-layer-group', route: '/admin/clusters' },
        { label: 'Atuações', icon: 'fas fa-briefcase', route: '/admin/atuacoes' },
        { label: 'Grupamentos', icon: 'fas fa-object-group', route: '/admin/grupamentos' },
        { label: 'Cargos', icon: 'fas fa-user-tag', route: '/admin/cargos' },
        { label: 'Horários', icon: 'fas fa-clock', route: '/admin/horarios' },
        { label: 'Pontuação', icon: 'fas fa-star', route: '/admin/parametrizacao' }
      ]
    },
  ];

  toggleSubmenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }
}