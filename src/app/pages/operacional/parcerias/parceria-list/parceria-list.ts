import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { ParceriaService, Parceria } from '../../../../services/parceria';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-parceria-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './parceria-list.html',
  styleUrl: './parceria-list.scss'
})
export class ParceriaListComponent implements OnInit {
  loading = true;
  parcerias: Parceria[] = [];

  constructor(private service: ParceriaService, private toastr: ToastService) {}

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (r) => { this.parcerias = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar parcerias'); this.loading = false; }
    });
  }
}
