// src/app/pages/associados/associado-empresa/associado-empresa.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../../services/empresa';
import { Empresa } from '../../../models/empresa.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-associado-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinner],
  templateUrl: './associado-empresa.html',
  styleUrl: './associado-empresa.scss'
})
export class AssociadoEmpresaComponent implements OnInit {
  @Input() associadoId!: number;

  empresa: Empresa | null = null;
  loading = true;
  modoForm = false;
  loadingForm = false;

  form: Partial<Empresa> = {};

  constructor(
    private empresaService: EmpresaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.empresaService.buscarPorAssociado(this.associadoId).subscribe({
      next: (res) => { this.empresa = res.data; this.loading = false; },
      error: () => { this.empresa = null; this.loading = false; }
    });
  }

  editar(): void {
    this.form = this.empresa ? { ...this.empresa } : {};
    this.modoForm = true;
  }

  cancelar(): void { this.modoForm = false; }

  salvar(): void {
    this.loadingForm = true;
    const req = this.empresa
      ? this.empresaService.editar(this.associadoId, this.empresa.id, this.form)
      : this.empresaService.salvar(this.associadoId, this.form);
    req.subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.modoForm = false;
        this.loadingForm = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao salvar empresa');
        this.loadingForm = false;
      }
    });
  }

  aplicarMascaraCnpj(valor: string): void {
    let v = valor.replace(/\D/g, '').slice(0, 14);
    if (v.length > 12) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
    else if (v.length > 8) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
    else if (v.length > 5) v = v.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,3})/, '$1.$2');
    this.form.cnpj = v;
  }
}
