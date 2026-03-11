import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { ParametrizacaoPontuacaoService } from '../../../../services/parametrizacao-pontuacao';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-parametrizacao-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './parametrizacao-form.html',
  styleUrl: './parametrizacao-form.scss'
})
export class ParametrizacaoFormComponent implements OnInit {

  id: number | null = null;
  faixaMinima: number | null = null;
  faixaMaxima: number | null = null;
  pontuacao: number | null = null;
  loading = false;
  isEdit = false;

  constructor(
    private paramService: ParametrizacaoPontuacaoService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId; this.isEdit = true;
      this.paramService.buscarPorId(this.id).subscribe({
        next: (res) => {
          this.faixaMinima = res.data.faixaMinima;
          this.faixaMaxima = res.data.faixaMaxima;
          this.pontuacao = res.data.pontuacao;
        },
        error: () => { this.toastr.error('Não encontrado'); this.router.navigate(['/admin/parametrizacao']); }
      });
    }
  }

  salvar(): void {
    if (!this.faixaMinima || !this.faixaMaxima || !this.pontuacao) {
      this.toastr.warning('Preencha todos os campos'); return;
    }
    if (this.faixaMinima > this.faixaMaxima) {
      this.toastr.warning('Faixa mínima não pode ser maior que a máxima'); return;
    }

    this.loading = true;
    const data = { faixaMinima: this.faixaMinima, faixaMaxima: this.faixaMaxima, pontuacao: this.pontuacao };
    const req = this.isEdit && this.id
      ? this.paramService.editar(this.id, data) : this.paramService.criar(data);

    req.subscribe({
      next: (res) => { this.toastr.success(res.message); this.router.navigate(['/admin/parametrizacao']); },
      error: (err) => { this.toastr.error(err.error?.message || 'Erro ao salvar'); this.loading = false; }
    });
  }
}