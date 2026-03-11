import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReuniaoService, Reuniao } from '../../../../services/reuniao';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

interface PresencaLinha {
  nomeCompleto: string;
  gr: number;
  presencas: number;
  total: number;
  percentual: number;
}

@Component({
  selector: 'app-relatorio-presenca',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './relatorio-presenca.html',
  styleUrl: './relatorio-presenca.scss'
})
export class RelatorioPresencaComponent implements OnInit {
  loading = true;
  reunioes: Reuniao[] = [];
  linhas: PresencaLinha[] = [];
  filtroMes = '';

  constructor(private service: ReuniaoService, private toastr: ToastrService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    const filtro = this.filtroMes ? { mes: this.filtroMes } : undefined;
    this.service.listar(filtro).subscribe({
      next: (r) => {
        this.reunioes = r.data;
        this.construirLinhas();
        this.loading = false;
      },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }

  construirLinhas(): void {
    const mapa = new Map<string, PresencaLinha>();
    for (const r of this.reunioes) {
      const participantes = [
        { nome: r.associado1Nome, id: r.associado1Id },
        { nome: r.associado2Nome, id: r.associado2Id }
      ];
      for (const p of participantes) {
        if (!mapa.has(p.nome)) {
          mapa.set(p.nome, { nomeCompleto: p.nome, gr: (p.id || 0) % 10, presencas: 0, total: 0, percentual: 0 });
        }
        const linha = mapa.get(p.nome)!;
        linha.total++;
        if (r.status === 'REALIZADA') linha.presencas++;
      }
    }
    this.linhas = Array.from(mapa.values())
      .map(l => ({ ...l, percentual: l.total > 0 ? Math.round((l.presencas / l.total) * 100) : 0 }))
      .sort((a, b) => a.gr - b.gr || a.nomeCompleto.localeCompare(b.nomeCompleto));
  }

  imprimir(): void { window.print(); }
}
