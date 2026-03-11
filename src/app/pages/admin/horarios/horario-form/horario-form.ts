import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HorarioReuniaoService } from '../../../../services/horario-reuniao';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-horario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './horario-form.html',
  styleUrl: './horario-form.scss'
})
export class HorarioFormComponent implements OnInit {

  id: number | null = null;
  descricao = '';
  loading = false;
  isEdit = false;

  constructor(
    private horarioService: HorarioReuniaoService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId; this.isEdit = true;
      this.horarioService.buscarPorId(this.id).subscribe({
        next: (res) => this.descricao = res.data.descricao,
        error: () => { this.toastr.error('Não encontrado'); this.router.navigate(['/admin/horarios']); }
      });
    }
  }

  salvar(): void {
    if (!this.descricao.trim()) { this.toastr.warning('Preencha a descrição'); return; }
    this.loading = true;
    const data = { descricao: this.descricao.trim() };
    const req = this.isEdit && this.id
      ? this.horarioService.editar(this.id, data) : this.horarioService.criar(data);

    req.subscribe({
      next: (res) => { this.toastr.success(res.message); this.router.navigate(['/admin/horarios']); },
      error: (err) => { this.toastr.error(err.error?.message || 'Erro ao salvar'); this.loading = false; }
    });
  }
}