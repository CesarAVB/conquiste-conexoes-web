// src/app/pages/associados/associado-enderecos/associado-enderecos.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnderecoService } from '../../../services/endereco';
import { Endereco } from '../../../models/endereco.model';
import { ConfirmDialogComponent } from '../../../components/shared/confirm-dialog/confirm-dialog';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-associado-enderecos',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmDialogComponent, LoadingSpinner],
  templateUrl: './associado-enderecos.html',
  styleUrl: './associado-enderecos.scss'
})
export class AssociadoEnderecosComponent implements OnInit {
  @Input() associadoId!: number;

  enderecos: Endereco[] = [];
  loading = true;
  modoForm = false;
  loadingForm = false;
  confirmVisible = false;
  selecionado: Endereco | null = null;

  form: Partial<Endereco> = {};

  readonly tipoOpcoes: ('RESIDENCIAL' | 'COMERCIAL')[] = ['RESIDENCIAL', 'COMERCIAL'];
  readonly estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  constructor(
    private enderecoService: EnderecoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.enderecoService.listarPorAssociado(this.associadoId).subscribe({
      next: (res) => { this.enderecos = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar endereços'); this.loading = false; }
    });
  }

  novo(): void {
    this.form = { tipo: 'RESIDENCIAL', visivelParaRede: false };
    this.selecionado = null;
    this.modoForm = true;
  }

  editar(e: Endereco): void {
    this.form = { ...e };
    this.selecionado = e;
    this.modoForm = true;
  }

  cancelar(): void { this.modoForm = false; this.selecionado = null; }

  salvar(): void {
    this.loadingForm = true;
    const req = this.selecionado
      ? this.enderecoService.editar(this.associadoId, this.selecionado.id, this.form)
      : this.enderecoService.criar(this.associadoId, this.form);
    req.subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.modoForm = false;
        this.loadingForm = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao salvar endereço');
        this.loadingForm = false;
      }
    });
  }

  confirmarExcluir(e: Endereco): void { this.selecionado = e; this.confirmVisible = true; }
  cancelarExcluir(): void { this.confirmVisible = false; this.selecionado = null; }

  excluir(): void {
    if (!this.selecionado) return;
    this.enderecoService.excluir(this.associadoId, this.selecionado.id).subscribe({
      next: () => {
        this.toastr.success('Endereço removido');
        this.confirmVisible = false;
        this.selecionado = null;
        this.carregar();
      },
      error: () => this.toastr.error('Erro ao remover endereço')
    });
  }

  aplicarMascaraCep(valor: string): void {
    let v = valor.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    this.form.cep = v;
  }
}
