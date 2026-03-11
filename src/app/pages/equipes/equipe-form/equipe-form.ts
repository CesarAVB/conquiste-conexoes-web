// src/app/pages/equipes/equipe-form/equipe-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { EquipeService } from '../../../services/equipe';
import { HorarioReuniaoService } from '../../../services/horario-reuniao';
import { HorarioReuniao } from '../../../models/horario-reuniao.model';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-equipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './equipe-form.html',
  styleUrl: './equipe-form.scss'
})
export class EquipeFormComponent implements OnInit {

  id: number | null = null;
  isEdit = false;
  loading = false;
  horarios: HorarioReuniao[] = [];

  form = {
    nome: '',
    dataInicioFormacao: '',
    diaReuniao: '',
    horarioReuniaoId: '',
    modeloReuniao: '',
    linkZoom: '',
    enderecoRua: '',
    enderecoNumero: '',
    enderecoComplemento: '',
    enderecoBairro: '',
    enderecoCidade: '',
    enderecoEstado: '',
    enderecoCep: '',
  };

  readonly diasReuniao = ['TERCA', 'QUARTA', 'QUINTA', 'SEXTA'];
  readonly diasLabel: Record<string, string> = {
    TERCA: 'Terça-feira',
    QUARTA: 'Quarta-feira',
    QUINTA: 'Quinta-feira',
    SEXTA: 'Sexta-feira',
  };
  readonly modelosReuniao = ['PRESENCIAL', 'ONLINE', 'HIBRIDO'];
  readonly estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  nomeSufixo = '';
  previsaoLancamento = '';

  constructor(
    private equipeService: EquipeService,
    private horarioService: HorarioReuniaoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarHorarios();
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.isEdit = true;
      this.carregarEquipe();
    }
  }

  carregarHorarios(): void {
    this.horarioService.listarAtivos().subscribe({
      next: (res) => this.horarios = res.data,
      error: () => this.toastr.error('Erro ao carregar horários')
    });
  }

  onDataInicioChange(): void {
    if (!this.form.dataInicioFormacao) { this.previsaoLancamento = ''; return; }
    const d = new Date(this.form.dataInicioFormacao);
    d.setDate(d.getDate() + 63); // 9 semanas (§2.1)
    this.previsaoLancamento = d.toLocaleDateString('pt-BR');
  }

  carregarEquipe(): void {
    if (!this.id) return;
    this.equipeService.buscarPorId(this.id).subscribe({
      next: (res) => {
        const e = res.data;
        this.nomeSufixo = e.nome.replace(/^C\+C\s+/i, '');
        this.form.dataInicioFormacao = e.dataInicioFormacao;
        this.form.diaReuniao = e.diaReuniao;
        this.form.horarioReuniaoId = String(e.horarioReuniaoId ?? '');
        this.form.modeloReuniao = e.modeloReuniao;
        this.form.linkZoom = e.linkZoom ?? '';
        this.onDataInicioChange();
      },
      error: () => {
        this.toastr.error('Equipe não encontrada');
        this.router.navigate(['/equipes']);
      }
    });
  }

  aplicarMascaraCep(valor: string): void {
    let v = valor.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    this.form.enderecoCep = v;
  }

  salvar(): void {
    if (!this.nomeSufixo.trim()) {
      this.toastr.warning('Preencha o nome da equipe');
      return;
    }
    if (this.nomeSufixo.trim().length > 16) {
      this.toastr.warning('O nome deve ter no máximo 20 caracteres incluindo o prefixo "C+C"');
      return;
    }

    this.loading = true;
    const nomeCompleto = `C+C ${this.nomeSufixo.trim()}`;
    const payload: Record<string, unknown> = {
      nome: nomeCompleto,
      dataInicioFormacao: this.form.dataInicioFormacao || null,
      diaReuniao: this.form.diaReuniao || null,
      horarioReuniaoId: this.form.horarioReuniaoId ? +this.form.horarioReuniaoId : null,
      modeloReuniao: this.form.modeloReuniao || null,
      linkZoom: this.form.linkZoom || null,
      enderecoReuniao: (this.form.enderecoRua || this.form.enderecoCidade) ? {
        rua: this.form.enderecoRua,
        numero: this.form.enderecoNumero,
        complemento: this.form.enderecoComplemento,
        bairro: this.form.enderecoBairro,
        cidade: this.form.enderecoCidade,
        estado: this.form.enderecoEstado,
        cep: this.form.enderecoCep,
      } : null,
    };

    const req = this.isEdit && this.id
      ? this.equipeService.editar(this.id, payload)
      : this.equipeService.criar(payload);

    req.subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.router.navigate(['/equipes']);
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao salvar equipe');
        this.loading = false;
      }
    });
  }
}
