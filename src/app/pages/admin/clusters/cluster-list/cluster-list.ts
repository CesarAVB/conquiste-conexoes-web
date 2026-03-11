// src/app/pages/admin/clusters/cluster-list/cluster-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { ClusterService } from '../../../../services/cluster';
import { Cluster } from '../../../../models/cluster.model';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-cluster-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent, ConfirmDialogComponent],
  templateUrl: './cluster-list.html',
  styleUrl: './cluster-list.scss'
})
export class ClusterListComponent implements OnInit {

  clusters: Cluster[] = [];
  loading = true;
  confirmVisible = false;
  selectedCluster: Cluster | null = null;

  constructor(
    private clusterService: ClusterService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.clusterService.listarAtivos().subscribe({
      next: (res) => {
        this.clusters = res.data;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Erro ao carregar clusters');
        this.loading = false;
      }
    });
  }

  confirmarInativar(cluster: Cluster): void {
    this.selectedCluster = cluster;
    this.confirmVisible = true;
  }

  inativar(): void {
    if (!this.selectedCluster) return;
    this.clusterService.alterarStatus(this.selectedCluster.id, false).subscribe({
      next: () => {
        this.toastr.success('Cluster inativado com sucesso');
        this.confirmVisible = false;
        this.selectedCluster = null;
        this.carregar();
      },
      error: () => this.toastr.error('Erro ao inativar cluster')
    });
  }

  cancelar(): void {
    this.confirmVisible = false;
    this.selectedCluster = null;
  }
}