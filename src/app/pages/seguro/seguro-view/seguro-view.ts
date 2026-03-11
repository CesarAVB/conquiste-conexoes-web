// src/app/pages/seguro/seguro-view/seguro-view.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CadastroSeguroService } from '../../../services/cadastro-seguro';
import { CadastroSeguro } from '../../../models/cadastro-seguro.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-seguro-view',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './seguro-view.html',
  styleUrl: './seguro-view.scss'
})
export class SeguroViewComponent implements OnInit {
  associadoId!: number;
  loading = true;
  seguro: CadastroSeguro | null = null;
  solicitando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seguroService: CadastroSeguroService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.associadoId = +this.route.snapshot.paramMap.get('id')!;
    this.seguroService.buscar(this.associadoId).subscribe({
      next: (res) => { this.seguro = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar seguro'); this.loading = false; }
    });
  }

  irParaSolicitacoes(): void {
    this.router.navigate(['/associados', this.associadoId, 'seguro', 'solicitacoes']);
  }
}
