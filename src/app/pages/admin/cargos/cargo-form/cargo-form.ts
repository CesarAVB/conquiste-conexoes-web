import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { CargoLiderancaService } from '../../../../services/cargo-lideranca';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-cargo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './cargo-form.html',
  styleUrl: './cargo-form.scss'
})
export class CargoFormComponent implements OnInit {

  id: number | null = null;
  nome = '';
  classificacao: 'NORMAL' | 'ISENTO' = 'NORMAL';
  loading = false;
  isEdit = false;

  constructor(
    private cargoService: CargoLiderancaService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId; this.isEdit = true;
      this.cargoService.buscarPorId(this.id).subscribe({
        next: (res) => { this.nome = res.data.nome; this.classificacao = res.data.classificacao; },
        error: () => { this.toastr.error('Não encontrado'); this.router.navigate(['/admin/cargos']); }
      });
    }
  }

  salvar(): void {
    if (!this.nome.trim()) { this.toastr.warning('Preencha o nome'); return; }
    this.loading = true;
    const data = { nome: this.nome.trim(), classificacao: this.classificacao };
    const req = this.isEdit && this.id
      ? this.cargoService.editar(this.id, data) : this.cargoService.criar(data);

    req.subscribe({
      next: (res) => { this.toastr.success(res.message); this.router.navigate(['/admin/cargos']); },
      error: (err) => { this.toastr.error(err.error?.message || 'Erro ao salvar'); this.loading = false; }
    });
  }
}