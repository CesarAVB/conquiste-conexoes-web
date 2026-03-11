// src/app/pages/admin/clusters/cluster-form/cluster-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClusterService } from '../../../../services/cluster';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-cluster-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './cluster-form.html',
  styleUrl: './cluster-form.scss'
})
export class ClusterFormComponent implements OnInit {

  id: number | null = null;
  nome = '';
  loading = false;
  isEdit = false;

  constructor(
    private clusterService: ClusterService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.isEdit = true;
      this.carregar();
    }
  }

  carregar(): void {
    if (!this.id) return;
    this.clusterService.buscarPorId(this.id).subscribe({
      next: (res) => this.nome = res.data.nome,
      error: () => {
        this.toastr.error('Cluster não encontrado');
        this.router.navigate(['/admin/clusters']);
      }
    });
  }

  salvar(): void {
    if (!this.nome.trim()) {
      this.toastr.warning('Preencha o nome do cluster');
      return;
    }

    this.loading = true;
    const data = { nome: this.nome.trim() };

    const request = this.isEdit && this.id
      ? this.clusterService.editar(this.id, data)
      : this.clusterService.criar(data);

    request.subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.router.navigate(['/admin/clusters']);
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao salvar cluster');
        this.loading = false;
      }
    });
  }
}