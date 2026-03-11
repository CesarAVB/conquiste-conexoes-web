mport { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParametrizacaoPontuacaoService } from '../../../../services/parametrizacao-pontuacao';
import { ParametrizacaoPontuacao } from '../../../../models/parametrizacao-pontuacao.model';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-parametrizacao-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent, ConfirmDialogComponent],
  templateUrl: './parametrizacao-list.html',
  styleUrl: './parametrizacao-list.scss'
})
export class ParametrizacaoListComponent implements OnInit {

  faixas: ParametrizacaoPontuacao[] = [];
  loading = true;
  confirmVisible = false;
  selectedItem: ParametrizacaoPontuacao | null = null;

  constructor(private paramService: ParametrizacaoPontuacaoService, private toastr: ToastrService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.paramService.listarTodas().subscribe({
      next: (res) => { this.faixas = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }

  confirmarExcluir(item: ParametrizacaoPontuacao): void { this.selectedItem = item; this.confirmVisible = true; }

  excluir(): void {
    if (!this.selectedItem) return;
    this.paramService.excluir(this.selectedItem.id).subscribe({
      next: () => { this.toastr.success('Faixa excluída'); this.confirmVisible = false; this.carregar(); },
      error: () => this.toastr.error('Erro ao excluir')
    });
  }

  cancelar(): void { this.confirmVisible = false; this.selectedItem = null; }
}