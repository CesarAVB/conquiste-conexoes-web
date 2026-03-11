import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GrupamentoEstrategicoService } from '../../../../services/grupamento-estrategico';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-grupamento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './grupamento-form.html',
  styleUrl: './grupamento-form.scss'
})
export class GrupamentoFormComponent implements OnInit {

  id: number | null = null;
  nome = '';
  sigla = '';
  loading = false;
  isEdit = false;

  constructor(
    private grupamentoService: GrupamentoEstrategicoService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId; this.isEdit = true;
      this.grupamentoService.buscarPorId(this.id).subscribe({
        next: (res) => { this.nome = res.data.nome; this.sigla = res.data.sigla; },
        error: () => { this.toastr.error('Não encontrado'); this.router.navigate(['/admin/grupamentos']); }
      });
    }
  }

  salvar(): void {
    if (!this.nome.trim() || !this.sigla.trim()) { this.toastr.warning('Preencha todos os campos'); return; }
    this.loading = true;
    const data = { nome: this.nome.trim(), sigla: this.sigla.trim().toUpperCase() };
    const req = this.isEdit && this.id
      ? this.grupamentoService.editar(this.id, data)
      : this.grupamentoService.criar(data);

    req.subscribe({
      next: (res) => { this.toastr.success(res.message); this.router.navigate(['/admin/grupamentos']); },
      error: (err) => { this.toastr.error(err.error?.message || 'Erro ao salvar'); this.loading = false; }
    });
  }
}