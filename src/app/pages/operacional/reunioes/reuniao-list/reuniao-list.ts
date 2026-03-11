import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { ReuniaoService, Reuniao } from '../../../../services/reuniao';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-reuniao-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './reuniao-list.html',
  styleUrl: './reuniao-list.scss'
})
export class ReuniaoListComponent implements OnInit {
  loading = true;
  reunioes: Reuniao[] = [];
  filtroStatus = '';

  statusLabel: Record<string, string> = { PENDENTE: 'Pendente', REALIZADA: 'Realizada', ADIADA: 'Adiada', CANCELADA: 'Cancelada' };
  statusClass: Record<string, string> = { PENDENTE: 'bg-warning text-dark', REALIZADA: 'bg-success', ADIADA: 'bg-info text-dark', CANCELADA: 'bg-danger' };

  constructor(private service: ReuniaoService, private toastr: ToastService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.service.listar(this.filtroStatus ? { status: this.filtroStatus } : undefined).subscribe({
      next: (r) => { this.reunioes = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar reuniões'); this.loading = false; }
    });
  }
}
