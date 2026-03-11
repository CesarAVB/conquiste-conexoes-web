import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { EducacionalService, PeenModulo } from '../../../../services/educacional';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-peen-modulos',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './peen-modulos.html',
  styleUrl: './peen-modulos.scss'
})
export class PeenModulosComponent implements OnInit {
  loading = true;
  modulos: PeenModulo[] = [];
  validando = 0;

  constructor(private service: EducacionalService, private toastr: ToastService) {}

  ngOnInit(): void {
    this.service.listarPeen().subscribe({
      next: (r) => { this.modulos = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar módulos'); this.loading = false; }
    });
  }

  validar(moduloId: number): void {
    this.validando = moduloId;
    this.service.validarPeen(moduloId).subscribe({
      next: (r) => { this.toastr.success(r.message); this.validando = 0; this.ngOnInit(); },
      error: () => { this.toastr.error('Erro ao validar'); this.validando = 0; }
    });
  }
}
