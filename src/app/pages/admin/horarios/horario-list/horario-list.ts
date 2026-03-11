import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { HorarioReuniaoService } from '../../../../services/horario-reuniao';
import { HorarioReuniao } from '../../../../models/horario-reuniao.model';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-horario-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent, ConfirmDialogComponent],
  templateUrl: './horario-list.html',
  styleUrl: './horario-list.scss'
})
export class HorarioListComponent implements OnInit {

  horarios: HorarioReuniao[] = [];
  loading = true;
  confirmVisible = false;
  selectedItem: HorarioReuniao | null = null;

  constructor(private horarioService: HorarioReuniaoService, private toastr: ToastService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.horarioService.listarAtivos().subscribe({
      next: (res) => { this.horarios = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }

  confirmarInativar(item: HorarioReuniao): void { this.selectedItem = item; this.confirmVisible = true; }

  inativar(): void {
    if (!this.selectedItem) return;
    this.horarioService.alterarStatus(this.selectedItem.id, false).subscribe({
      next: () => { this.toastr.success('Inativado'); this.confirmVisible = false; this.carregar(); },
      error: () => this.toastr.error('Erro ao inativar')
    });
  }

  cancelar(): void { this.confirmVisible = false; this.selectedItem = null; }
}