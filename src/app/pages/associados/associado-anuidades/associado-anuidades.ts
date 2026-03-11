// src/app/pages/associados/associado-anuidades/associado-anuidades.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnuidadeService, RenovacaoPayload } from '../../../services/anuidade';
import { Anuidade } from '../../../models/anuidade.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-associado-anuidades',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinner],
  templateUrl: './associado-anuidades.html',
  styleUrl: './associado-anuidades.scss'
})
export class AssociadoAnuidadesComponent implements OnInit {
  @Input() associadoId!: number;

  anuidades: Anuidade[] = [];
  loading = true;
  modoRenovacao = false;
  loadingRenovar = false;

  formRenovacao: RenovacaoPayload = { statusPagamento: 'PAGO' };

  readonly statusOpcoes: RenovacaoPayload['statusPagamento'][] = ['PAGO', 'AGUARDANDO', 'ISENTO'];

  constructor(
    private anuidadeService: AnuidadeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.anuidadeService.listarPorAssociado(this.associadoId).subscribe({
      next: (res) => { this.anuidades = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar anuidades'); this.loading = false; }
    });
  }

  renovar(): void {
    this.loadingRenovar = true;
    this.anuidadeService.renovar(this.associadoId, this.formRenovacao).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.modoRenovacao = false;
        this.loadingRenovar = false;
        this.formRenovacao = { statusPagamento: 'PAGO' };
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao renovar anuidade');
        this.loadingRenovar = false;
      }
    });
  }

  badgePagamento(status: string): string {
    const map: Record<string, string> = { PAGO: 'bg-success', AGUARDANDO: 'bg-warning text-dark', ISENTO: 'bg-info' };
    return map[status] ?? 'bg-secondary';
  }

  ultimaAnuidade(): Anuidade | null {
    return this.anuidades.length ? this.anuidades[this.anuidades.length - 1] : null;
  }
}
