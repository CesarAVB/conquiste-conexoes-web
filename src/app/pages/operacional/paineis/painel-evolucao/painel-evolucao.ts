import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PainelService, EvolucaoItem } from '../../../../services/painel';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-painel-evolucao',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './painel-evolucao.html',
  styleUrl: './painel-evolucao.scss'
})
export class PainelEvolucaoComponent implements OnInit {
  loading = true;
  periodo: '1M' | '6M' | 'TOTAL' = '1M';
  dados: EvolucaoItem[] = [];

  constructor(private service: PainelService, private toastr: ToastrService) {}

  ngOnInit(): void { this.carregar(); }

  setPeriodo(p: '1M' | '6M' | 'TOTAL'): void { this.periodo = p; this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.service.evolucaoIndividual(this.periodo).subscribe({
      next: (r) => { this.dados = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }
}
