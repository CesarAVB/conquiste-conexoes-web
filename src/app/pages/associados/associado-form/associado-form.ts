// src/app/pages/associados/associado-form/associado-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { AssociadoService } from '../../../services/associado';
import { ClusterService } from '../../../services/cluster';
import { AtuacaoEspecificaService } from '../../../services/atuacao-especifica';
import { EquipeService } from '../../../services/equipe';
import { Cluster } from '../../../models/cluster.model';
import { AtuacaoEspecifica } from '../../../models/atuacao-especifica.model';
import { Equipe } from '../../../models/equipe.model';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-associado-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './associado-form.html',
  styleUrl: './associado-form.scss'
})
export class AssociadoFormComponent implements OnInit {

  id: number | null = null;
  isEdit = false;
  loading = false;
  loadingAtuacoes = false;

  clusters: Cluster[] = [];
  atuacoes: AtuacaoEspecifica[] = [];
  equipes: Equipe[] = [];
  padrinhoResultados: { id: number; nomeCompleto: string; cpf: string }[] = [];
  buscandoPadrinho = false;
  buscaPadrinho = '';

  form = {
    nomeCompleto: '',
    cpf: '',
    email: '',
    whatsapp: '',
    dataNascimento: '',
    mostrarAniversarioRede: false,
    dataIngresso: '',
    clusterId: '',
    atuacaoEspecificaId: '',
    equipeAtualId: '',
    equipeOrigemId: '',
    equipeOrigemTipo: '',
    padrinhoId: '',
  };

  readonly origemOpcoes = [
    { valor: 'ORIGINAL', label: 'Original' },
    { valor: 'COLABORATIVA', label: 'Colaborativa' },
  ];

  constructor(
    private associadoService: AssociadoService,
    private clusterService: ClusterService,
    private atuacaoService: AtuacaoEspecificaService,
    private equipeService: EquipeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarClusters();
    this.carregarEquipes();
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.isEdit = true;
      this.carregarAssociado();
    }
  }

  carregarClusters(): void {
    this.clusterService.listarAtivos().subscribe({
      next: (res) => this.clusters = res.data,
      error: () => this.toastr.error('Erro ao carregar clusters')
    });
  }

  carregarEquipes(): void {
    this.equipeService.listar().subscribe({
      next: (res) => this.equipes = res.data,
      error: () => {}
    });
  }

  onClusterChange(): void {
    this.form.atuacaoEspecificaId = '';
    this.atuacoes = [];
    if (!this.form.clusterId) return;
    this.loadingAtuacoes = true;
    this.atuacaoService.listarPorCluster(+this.form.clusterId).subscribe({
      next: (res) => {
        this.atuacoes = res.data.filter(a => a.ativo);
        this.loadingAtuacoes = false;
      },
      error: () => { this.loadingAtuacoes = false; }
    });
  }

  buscarPadrinho(): void {
    if (this.buscaPadrinho.trim().length < 2) return;
    this.buscandoPadrinho = true;
    this.associadoService.buscarParaSelect(this.buscaPadrinho.trim()).subscribe({
      next: (res) => {
        this.padrinhoResultados = res.data;
        this.buscandoPadrinho = false;
      },
      error: () => { this.buscandoPadrinho = false; }
    });
  }

  selecionarPadrinho(p: { id: number; nomeCompleto: string; cpf: string }): void {
    this.form.padrinhoId = String(p.id);
    this.buscaPadrinho = `${p.nomeCompleto} (${p.cpf})`;
    this.padrinhoResultados = [];
  }

  carregarAssociado(): void {
    if (!this.id) return;
    this.associadoService.buscarPorId(this.id).subscribe({
      next: (res) => {
        const a = res.data;
        this.form = {
          nomeCompleto: a.nomeCompleto,
          cpf: a.cpf,
          email: a.email,
          whatsapp: a.whatsapp,
          dataNascimento: a.dataNascimento,
          mostrarAniversarioRede: a.mostrarAniversarioRede,
          dataIngresso: a.dataIngresso,
          clusterId: String(a.clusterId),
          atuacaoEspecificaId: String(a.atuacaoEspecificaId),
          equipeAtualId: String(a.equipeAtualId ?? ''),
          equipeOrigemId: String(a.equipeOrigemId ?? ''),
          equipeOrigemTipo: a.equipeOrigemTipo,
          padrinhoId: String(a.padrinhoId ?? ''),
        };
        if (a.padrinhoNome) this.buscaPadrinho = `${a.padrinhoNome} (${a.cpf})`;
        if (a.clusterId) this.onClusterChange();
      },
      error: () => {
        this.toastr.error('Associado não encontrado');
        this.router.navigate(['/associados']);
      }
    });
  }

  aplicarMascaraCpf(valor: string): void {
    let v = valor.replace(/\D/g, '').slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    this.form.cpf = v;
  }

  aplicarMascaraTelefone(valor: string): void {
    let v = valor.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    this.form.whatsapp = v;
  }

  salvar(): void {
    if (!this.form.nomeCompleto.trim() || !this.form.cpf || !this.form.email) {
      this.toastr.warning('Preencha os campos obrigatórios');
      return;
    }

    this.loading = true;
    const payload: Record<string, unknown> = {
      nomeCompleto: this.form.nomeCompleto.trim(),
      cpf: this.form.cpf,
      email: this.form.email.trim(),
      whatsapp: this.form.whatsapp,
      dataNascimento: this.form.dataNascimento || null,
      mostrarAniversarioRede: this.form.mostrarAniversarioRede,
      dataIngresso: this.form.dataIngresso || null,
      clusterId: this.form.clusterId ? +this.form.clusterId : null,
      atuacaoEspecificaId: this.form.atuacaoEspecificaId ? +this.form.atuacaoEspecificaId : null,
      equipeAtualId: this.form.equipeAtualId ? +this.form.equipeAtualId : null,
      equipeOrigemId: this.form.equipeOrigemId ? +this.form.equipeOrigemId : null,
      equipeOrigemTipo: this.form.equipeOrigemTipo || null,
      padrinhoId: this.form.padrinhoId ? +this.form.padrinhoId : null,
    };

    const req = this.isEdit && this.id
      ? this.associadoService.editar(this.id, payload)
      : this.associadoService.criar(payload);

    req.subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.router.navigate(['/associados']);
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao salvar associado');
        this.loading = false;
      }
    });
  }
}
