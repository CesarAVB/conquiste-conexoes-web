import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { GrupamentoEstrategicoService } from '../../../../services/grupamento-estrategico';
import { GrupamentoEstrategico } from '../../../../models/grupamento-estrategico.model';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-grupamento-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent, ConfirmDialogComponent],
  templateUrl: './grupamento-list.html',
  styleUrl: './grupamento-list.scss'
})
export class GrupamentoListComponent implements OnInit {

  grupamentos: GrupamentoEstrategico[] = [];
  loading = true;
  confirmVisible = false;
  selectedItem: GrupamentoEstrategico | null = null;

  constructor(private grupamentoService: GrupamentoEstrategicoService, private toastr: ToastService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.grupamentoService.listarAtivos().subscribe({
      next: (res) => { this.grupamentos = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }

  confirmarInativar(item: GrupamentoEstrategico): void { this.selectedItem = item; this.confirmVisible = true; }

  inativar(): void {
    if (!this.selectedItem) return;
    this.grupamentoService.alterarStatus(this.selectedItem.id, false).subscribe({
      next: () => { this.toastr.success('Inativado'); this.confirmVisible = false; this.carregar(); },
      error: () => this.toastr.error('Erro ao inativar')
    });
  }

  cancelar(): void { this.confirmVisible = false; this.selectedItem = null; }
}