import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AtuacaoEspecificaService } from '../../../../services/atuacao-especifica';
import { ClusterService } from '../../../../services/cluster';
import { AtuacaoEspecifica } from '../../../../models/atuacao-especifica.model';
import { Cluster } from '../../../../models/cluster.model';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-atuacao-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent, ConfirmDialogComponent],
  templateUrl: './atuacao-list.html',
  styleUrl: './atuacao-list.scss'
})
export class AtuacaoListComponent implements OnInit {

  clusters: Cluster[] = [];
  atuacoes: AtuacaoEspecifica[] = [];
  selectedClusterId: number | null = null;
  loading = false;
  confirmVisible = false;
  selectedItem: AtuacaoEspecifica | null = null;

  constructor(
    private atuacaoService: AtuacaoEspecificaService,
    private clusterService: ClusterService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.clusterService.listarAtivos().subscribe({
      next: (res) => this.clusters = res.data
    });
  }

  onClusterChange(): void {
    if (!this.selectedClusterId) { this.atuacoes = []; return; }
    this.loading = true;
    this.atuacaoService.listarPorCluster(this.selectedClusterId).subscribe({
      next: (res) => { this.atuacoes = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar atuações'); this.loading = false; }
    });
  }

  confirmarInativar(item: AtuacaoEspecifica): void {
    this.selectedItem = item;
    this.confirmVisible = true;
  }

  inativar(): void {
    if (!this.selectedItem) return;
    this.atuacaoService.alterarStatus(this.selectedItem.id, false).subscribe({
      next: () => { this.toastr.success('Inativado com sucesso'); this.confirmVisible = false; this.onClusterChange(); },
      error: () => this.toastr.error('Erro ao inativar')
    });
  }

  cancelar(): void { this.confirmVisible = false; this.selectedItem = null; }
}
