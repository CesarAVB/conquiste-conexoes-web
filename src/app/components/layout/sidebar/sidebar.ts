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
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
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
    { label: 'Associados', icon: 'fas fa-users', route: '/associados' },
    { label: 'Equipes', icon: 'fas fa-people-group', route: '/equipes' }
  ];

  toggleSubmenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }
}