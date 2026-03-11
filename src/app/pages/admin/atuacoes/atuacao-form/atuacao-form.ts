import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { AtuacaoEspecificaService } from '../../../../services/atuacao-especifica';
import { ClusterService } from '../../../../services/cluster';
import { Cluster } from '../../../../models/cluster.model';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-atuacao-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './atuacao-form.html',
  styleUrl: './atuacao-form.scss'
})
export class AtuacaoFormComponent implements OnInit {

  id: number | null = null;
  nome = '';
  clusterId: number | null = null;
  clusters: Cluster[] = [];
  loading = false;
  isEdit = false;

  constructor(
    private atuacaoService: AtuacaoEspecificaService,
    private clusterService: ClusterService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.clusterService.listarAtivos().subscribe({ next: (res) => this.clusters = res.data });
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.isEdit = true;
      this.atuacaoService.buscarPorId(this.id).subscribe({
        next: (res) => { this.nome = res.data.nome; this.clusterId = res.data.clusterId; },
        error: () => { this.toastr.error('Não encontrado'); this.router.navigate(['/admin/atuacoes']); }
      });
    }
  }

  salvar(): void {
    if (!this.nome.trim() || !this.clusterId) { this.toastr.warning('Preencha todos os campos'); return; }
    this.loading = true;
    const data = { nome: this.nome.trim(), clusterId: this.clusterId };
    const req = this.isEdit && this.id
      ? this.atuacaoService.editar(this.id, data)
      : this.atuacaoService.criar(data);

    req.subscribe({
      next: (res) => { this.toastr.success(res.message); this.router.navigate(['/admin/atuacoes']); },
      error: (err) => { this.toastr.error(err.error?.message || 'Erro ao salvar'); this.loading = false; }
    });
  }
}
