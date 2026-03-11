import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { ReuniaoService, Reuniao } from '../../../../services/reuniao';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-reuniao-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './reuniao-detalhe.html',
  styleUrl: './reuniao-detalhe.scss'
})
export class ReuniaoDetalheComponent implements OnInit {
  loading = true;
  reuniao: Reuniao | null = null;

  statusClass: Record<string, string> = { PENDENTE: 'bg-warning text-dark', REALIZADA: 'bg-success', ADIADA: 'bg-info text-dark', CANCELADA: 'bg-danger' };

  constructor(private route: ActivatedRoute, private service: ReuniaoService, private toastr: ToastService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.buscarPorId(id).subscribe({
      next: (r) => { this.reuniao = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar'); this.loading = false; }
    });
  }
}
