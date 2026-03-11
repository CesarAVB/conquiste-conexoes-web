// src/app/pages/associados/associado-status/associado-status.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast';
import { AssociadoService, AlterarStatusPayload } from '../../../services/associado';

@Component({
  selector: 'app-associado-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './associado-status.html',
  styleUrl: './associado-status.scss'
})
export class AssociadoStatusComponent implements OnInit {
  @Input() associadoId!: number;
  @Input() statusAtual = '';
  @Output() fechado = new EventEmitter<void>();
  @Output() statusAlterado = new EventEmitter<void>();

  responsaveis: { id: number; nomeCompleto: string; cpf: string }[] = [];
  buscaResponsavel = '';
  buscandoResponsavel = false;
  loading = false;

  form: AlterarStatusPayload = {
    novoStatus: '',
    motivo: '',
    dataInicioPausa: '',
    dataPrevistaRetorno: '',
    responsavelId: 0,
  };

  readonly statusOpcoes = [
    { valor: 'ATIVO', label: 'Ativo' },
    { valor: 'EM_FORMACAO', label: 'Em Formação' },
    { valor: 'PAUSA_PROGRAMADA', label: 'Pausa Programada' },
    { valor: 'PAUSADO', label: 'Pausado' },
    { valor: 'DESISTENTE', label: 'Desistente' },
    { valor: 'DESLIGADO', label: 'Desligado' },
  ];

  constructor(
    private associadoService: AssociadoService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {}

  get precisaMotivo(): boolean {
    return ['DESISTENTE', 'DESLIGADO'].includes(this.form.novoStatus);
  }

  get precisaDatas(): boolean {
    return this.form.novoStatus === 'PAUSA_PROGRAMADA';
  }

  buscarResponsavel(): void {
    if (this.buscaResponsavel.trim().length < 2) return;
    this.buscandoResponsavel = true;
    this.associadoService.buscarParaSelect(this.buscaResponsavel.trim()).subscribe({
      next: (res) => { this.responsaveis = res.data; this.buscandoResponsavel = false; },
      error: () => { this.buscandoResponsavel = false; }
    });
  }

  selecionarResponsavel(r: { id: number; nomeCompleto: string; cpf: string }): void {
    this.form.responsavelId = r.id;
    this.buscaResponsavel = `${r.nomeCompleto} (${r.cpf})`;
    this.responsaveis = [];
  }

  salvar(): void {
    if (!this.form.novoStatus) { this.toastr.warning('Selecione o novo status'); return; }
    if (!this.form.responsavelId) { this.toastr.warning('Selecione o responsável'); return; }
    if (this.precisaMotivo && !this.form.motivo?.trim()) { this.toastr.warning('Informe o motivo'); return; }
    if (this.precisaDatas && (!this.form.dataInicioPausa || !this.form.dataPrevistaRetorno)) {
      this.toastr.warning('Informe as datas de pausa'); return;
    }

    this.loading = true;
    this.associadoService.alterarStatus(this.associadoId, this.form).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.statusAlterado.emit();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao alterar status');
        this.loading = false;
      }
    });
  }
}
