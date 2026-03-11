// src/app/pages/seguro/seguro-form/seguro-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CadastroSeguroService } from '../../../services/cadastro-seguro';
import { CadastroSeguro } from '../../../models/cadastro-seguro.model';
import { Beneficiario } from '../../../models/beneficiario.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';

interface BeneficiarioForm extends Partial<Beneficiario> {}

@Component({
  selector: 'app-seguro-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './seguro-form.html',
  styleUrl: './seguro-form.scss'
})
export class SeguroFormComponent implements OnInit {
  associadoId!: number;
  loading = true;
  salvando = false;
  cadastroExistente: CadastroSeguro | null = null;
  editavel = true;

  lgpd1 = false;
  lgpd2 = false;
  lgpd3 = false;

  form = {
    nacionalidade: '',
    rgNumero: '',
    rgOrgaoEmissor: '',
    rgUf: '',
    estadoCivil: '',
    profissaoSecuritaria: '',
  };

  beneficiarios: BeneficiarioForm[] = [
    { nomeCompleto: '', cpf: '', grauParentesco: '', dataNascimento: '', percentual: 100, telefone: '' }
  ];

  contatoEmergencia = { nomeCompleto: '', grauRelacionamento: '', telefonePrincipal: '', telefoneSecundario: '' };

  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'Diórcio(a)', 'Viúvo(a)', 'União Estável'];
  ufs = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seguroService: CadastroSeguroService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.associadoId = +this.route.snapshot.paramMap.get('id')!;
    this.seguroService.buscar(this.associadoId).subscribe({
      next: (res) => {
        if (res.data) {
          this.cadastroExistente = res.data;
          this.editavel = res.data.editavel;
          if (!this.editavel) {
            this.router.navigate(['/associados', this.associadoId, 'seguro', 'view']);
            return;
          }
          this.preencherForm(res.data);
        }
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  preencherForm(data: CadastroSeguro): void {
    this.form = {
      nacionalidade: data.nacionalidade,
      rgNumero: data.rgNumero,
      rgOrgaoEmissor: data.rgOrgaoEmissor,
      rgUf: data.rgUf,
      estadoCivil: data.estadoCivil,
      profissaoSecuritaria: data.profissaoSecuritaria,
    };
    if (data.beneficiarios?.length) {
      this.beneficiarios = data.beneficiarios.map(b => ({ ...b }));
    }
    if (data.contatoEmergencia) {
      this.contatoEmergencia = { ...data.contatoEmergencia };
    }
  }

  adicionarBeneficiario(): void {
    if (this.beneficiarios.length >= 2) return;
    this.beneficiarios.push({ nomeCompleto: '', cpf: '', grauParentesco: '', dataNascimento: '', percentual: 0, telefone: '' });
    this.redistribuirPercentual();
  }

  removerBeneficiario(i: number): void {
    this.beneficiarios.splice(i, 1);
    if (this.beneficiarios.length === 1) this.beneficiarios[0].percentual = 100;
  }

  redistribuirPercentual(): void {
    if (this.beneficiarios.length === 1) { this.beneficiarios[0].percentual = 100; }
    else if (this.beneficiarios.length === 2) { this.beneficiarios[0].percentual = 50; this.beneficiarios[1].percentual = 50; }
  }

  somaPercentual(): number { return this.beneficiarios.reduce((s, b) => s + (b.percentual || 0), 0); }

  salvar(): void {
    if (!this.lgpd1 || !this.lgpd2 || !this.lgpd3) {
      this.toastr.warning('Você deve aceitar todos os termos LGPD para continuar.');
      return;
    }
    if (this.somaPercentual() !== 100) {
      this.toastr.warning('A soma dos percentuais dos beneficiários deve ser 100%.');
      return;
    }
    this.salvando = true;
    const payload = {
      ...this.form,
      beneficiarios: this.beneficiarios,
      contatoEmergencia: this.contatoEmergencia,
      lgpdDataAceite: new Date().toISOString(),
    };
    this.seguroService.criar(this.associadoId, payload).subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'Seguro cadastrado com sucesso!');
        this.salvando = false;
        this.router.navigate(['/associados', this.associadoId, 'perfil']);
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao salvar seguro');
        this.salvando = false;
      }
    });
  }
}
