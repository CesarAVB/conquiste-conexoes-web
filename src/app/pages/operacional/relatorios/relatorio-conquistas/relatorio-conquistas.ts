import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { PainelService, EvolucaoItem } from '../../../../services/painel';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-relatorio-conquistas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './relatorio-conquistas.html',
  styleUrl: './relatorio-conquistas.scss'
})
export class RelatorioConquistasComponent implements OnInit {
  loading = true;
  periodo: '1M' | '3M' | 'TOTAL' = '1M';
  dados: EvolucaoItem[] = [];
  totais = { conexoes: 0, ng: 0, parcerias: 0, nr: 0, visitantes: 0, pontos: 0 };

  constructor(private service: PainelService, private toastr: ToastService) {}

  ngOnInit(): void { this.carregar(); }

  setPeriodo(p: '1M' | '3M' | 'TOTAL'): void { this.periodo = p; this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.service.performanceEquipe(this.periodo).subscribe({
      next: (r) => {
        this.dados = r.data;
        this.totais = r.data.reduce((acc, d) => ({
          conexoes: acc.conexoes + d.conexoes,
          ng: acc.ng + d.ng,
          parcerias: acc.parcerias + d.parcerias,
          nr: acc.nr + d.nr,
          visitantes: acc.visitantes + d.visitantes,
          pontos: acc.pontos + d.pontos
        }), { conexoes: 0, ng: 0, parcerias: 0, nr: 0, visitantes: 0, pontos: 0 });
        this.loading = false;
      },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }

  imprimir(): void { window.print(); }
}
