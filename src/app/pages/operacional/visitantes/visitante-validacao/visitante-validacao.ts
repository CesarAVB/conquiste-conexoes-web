import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisitanteService, Visitante } from '../../../../services/visitante';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-visitante-validacao',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './visitante-validacao.html',
  styleUrl: './visitante-validacao.scss'
})
export class VisitanteValidacaoComponent implements OnInit {
  loading = true;
  visitantes: Visitante[] = [];
  validando = 0;

  tipoLabel: Record<string, string> = { EXTERNO: 'Externo', INTERNO: 'Interno', SUBSTITUTO: 'Substituto' };
  tipoClass: Record<string, string> = { EXTERNO: 'bg-info text-dark', INTERNO: 'bg-primary', SUBSTITUTO: 'bg-warning text-dark' };

  constructor(private service: VisitanteService, private toastr: ToastrService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.service.listarPendentes().subscribe({
      next: (r) => { this.visitantes = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }

  validar(id: number): void {
    this.validando = id;
    this.service.validar(id).subscribe({
      next: (r) => { this.toastr.success(r.message); this.validando = 0; this.carregar(); },
      error: () => { this.toastr.error('Erro ao validar'); this.validando = 0; }
    });
  }
}
