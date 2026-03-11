// src/app/pages/equipes/equipe-diretores/equipe-diretores.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast';
import { EquipeService } from '../../../services/equipe';
import { AssociadoService } from '../../../services/associado';
import { DiretorVinculo } from '../../../models/diretor-vinculo.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from '../../../components/shared/confirm-dialog/confirm-dialog';

type TipoDiretor = 'TERRITORIO' | 'EQUIPE';

@Component({
  selector: 'app-equipe-diretores',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinner, ConfirmDialogComponent],
  templateUrl: './equipe-diretores.html',
  styleUrl: './equipe-diretores.scss'
})
export class EquipeDiretoresComponent implements OnInit {
  @Input() equipeId!: number;

  diretoresTerritorio: DiretorVinculo[] = [];
  diretoresEquipe: DiretorVinculo[] = [];
  loading = true;

  modoForm: TipoDiretor | null = null;
  loadingForm = false;
  associadosResultado: { id: number; nomeCompleto: string; cpf: string }[] = [];
  buscaAssociado = '';
  buscando = false;
  confirmVisible = false;
  selecionado: { id: number; tipo: TipoDiretor } | null = null;

  form = { associadoId: 0, associadoLabel: '', dataInicio: '', dataFim: '' };

  constructor(
    private equipeService: EquipeService,
    private associadoService: AssociadoService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    // Usa o service de equipe para buscar diretores (endpoint /equipes/{id}/diretores?tipo=X)
    Promise.all([
      this.equipeService.listarDiretores(this.equipeId, 'TERRITORIO').toPromise(),
      this.equipeService.listarDiretores(this.equipeId, 'EQUIPE').toPromise(),
    ]).then(([res1, res2]) => {
      this.diretoresTerritorio = res1?.data ?? [];
      this.diretoresEquipe = res2?.data ?? [];
      this.loading = false;
    }).catch(() => { this.toastr.error('Erro ao carregar diretores'); this.loading = false; });
  }

  abrirForm(tipo: TipoDiretor): void {
    this.modoForm = tipo;
    this.form = { associadoId: 0, associadoLabel: '', dataInicio: '', dataFim: '' };
    this.buscaAssociado = '';
    this.associadosResultado = [];
  }

  buscar(): void {
    if (this.buscaAssociado.trim().length < 2) return;
    this.buscando = true;
    this.associadoService.buscarParaSelect(this.buscaAssociado.trim()).subscribe({
      next: (res) => { this.associadosResultado = res.data; this.buscando = false; },
      error: () => { this.buscando = false; }
    });
  }

  selecionar(a: { id: number; nomeCompleto: string; cpf: string }): void {
    this.form.associadoId = a.id;
    this.form.associadoLabel = `${a.nomeCompleto} (${a.cpf})`;
    this.buscaAssociado = this.form.associadoLabel;
    this.associadosResultado = [];
  }

  vincular(): void {
    if (!this.form.associadoId || !this.form.dataInicio || !this.modoForm) {
      this.toastr.warning('Preencha os campos obrigatórios');
      return;
    }
    this.loadingForm = true;
    this.equipeService.vincularDiretor(this.equipeId, {
      associadoId: this.form.associadoId,
      tipo: this.modoForm,
      dataInicio: this.form.dataInicio,
      dataFim: this.form.dataFim || null,
    }).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.modoForm = null;
        this.loadingForm = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao vincular diretor');
        this.loadingForm = false;
      }
    });
  }

  confirmarEncerrar(id: number, tipo: TipoDiretor): void { this.selecionado = { id, tipo }; this.confirmVisible = true; }
  cancelar(): void { this.confirmVisible = false; this.selecionado = null; }

  encerrar(): void {
    if (!this.selecionado) return;
    this.equipeService.encerrarDiretor(this.equipeId, this.selecionado.id).subscribe({
      next: () => { this.toastr.success('Vínculo encerrado'); this.confirmVisible = false; this.selecionado = null; this.carregar(); },
      error: () => this.toastr.error('Erro ao encerrar vínculo')
    });
  }
}
