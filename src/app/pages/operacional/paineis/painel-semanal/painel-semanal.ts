import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { PainelService, IndicadorSemanal } from '../../../../services/painel';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-painel-semanal',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './painel-semanal.html',
  styleUrl: './painel-semanal.scss'
})
export class PainelSemanalComponent implements OnInit {
  loading = true;
  indicadores: IndicadorSemanal[] = [];

  constructor(private service: PainelService, private toastr: ToastService) {}

  ngOnInit(): void {
    this.service.semanal().subscribe({
      next: (r) => { this.indicadores = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar painel'); this.loading = false; }
    });
  }
}
