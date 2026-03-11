import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { CargoLiderancaService } from '../../../../services/cargo-lideranca';
import { CargoLideranca } from '../../../../models/cargo-lideranca.model';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-cargo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent, ConfirmDialogComponent],
  templateUrl: './cargo-list.html',
  styleUrl: './cargo-list.scss'
})
export class CargoListComponent implements OnInit {

  cargos: CargoLideranca[] = [];
  loading = true;
  confirmVisible = false;
  selectedItem: CargoLideranca | null = null;

  constructor(private cargoService: CargoLiderancaService, private toastr: ToastService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.cargoService.listarAtivos().subscribe({
      next: (res) => { this.cargos = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }

  confirmarInativar(item: CargoLideranca): void { this.selectedItem = item; this.confirmVisible = true; }

  inativar(): void {
    if (!this.selectedItem) return;
    this.cargoService.alterarStatus(this.selectedItem.id, false).subscribe({
      next: () => { this.toastr.success('Inativado'); this.confirmVisible = false; this.carregar(); },
      error: () => this.toastr.error('Erro ao inativar')
    });
  }

  cancelar(): void { this.confirmVisible = false; this.selectedItem = null; }
}