// src/app/pages/perfil/perfil-form/perfil-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { PerfilAssociadoService } from '../../../services/perfil-associado';
import { PerfilAssociado } from '../../../models/perfil-associado.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-perfil-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './perfil-form.html',
  styleUrl: './perfil-form.scss'
})
export class PerfilFormComponent implements OnInit {
  associadoId!: number;
  loading = true;
  salvando = false;
  perfilExistente: PerfilAssociado | null = null;

  // Campos auto-preenchidos (somente leitura)
  clusterNome = '';
  atuacaoNome = '';
  equipeNome = '';
  status = '';
  dataIngresso = '';
  vencimento = '';

  // Previews
  fotoPreview: string | null = null;
  logoPreview: string | null = null;
  fotoArquivo: File | null = null;
  logoArquivo: File | null = null;
  uploadandoFoto = false;
  uploadandoLogo = false;

  form: Partial<PerfilAssociado> = {
    nomeProfissional: '',
    nomeEmpresa: '',
    exibirEnderecoComercial: false,
    telefonePrincipal: '',
    telefoneSecundario: '',
    emailPrincipal: '',
    site: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    outraRedeSocial: '',
    oQueEuFaco: '',
    publicoIdeal: '',
    principalProblemaQueResolvo: '',
    conexoesEstrategicas: '',
    interessesPessoais: '',
  };

  limites = { oQueEuFaco: 300, publicoIdeal: 300, principalProblemaQueResolvo: 300, conexoesEstrategicas: 300, interessesPessoais: 200 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private perfilService: PerfilAssociadoService,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.associadoId = +this.route.snapshot.paramMap.get('id')!;
    this.perfilService.buscar(this.associadoId).subscribe({
      next: (res) => {
        if (res.data) {
          this.perfilExistente = res.data;
          this.preencherForm(res.data);
        }
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  preencherForm(p: PerfilAssociado): void {
    this.form = {
      nomeProfissional: p.nomeProfissional,
      nomeEmpresa: p.nomeEmpresa,
      exibirEnderecoComercial: p.exibirEnderecoComercial,
      telefonePrincipal: p.telefonePrincipal,
      telefoneSecundario: p.telefoneSecundario,
      emailPrincipal: p.emailPrincipal,
      site: p.site,
      linkedin: p.linkedin,
      instagram: p.instagram,
      youtube: p.youtube,
      outraRedeSocial: p.outraRedeSocial,
      oQueEuFaco: p.oQueEuFaco,
      publicoIdeal: p.publicoIdeal,
      principalProblemaQueResolvo: p.principalProblemaQueResolvo,
      conexoesEstrategicas: p.conexoesEstrategicas,
      interessesPessoais: p.interessesPessoais,
    };
    this.clusterNome = p.clusterNome;
    this.atuacaoNome = p.atuacaoEspecificaNome;
    this.equipeNome = p.equipeNome;
    this.status = p.status;
    this.dataIngresso = p.dataIngresso;
    this.vencimento = p.vencimento;
    if (p.fotoUrl) this.fotoPreview = p.fotoUrl;
    if (p.logomarcaUrl) this.logoPreview = p.logomarcaUrl;
  }

  contador(campo: keyof typeof this.limites): number {
    const val = (this.form as Record<string, unknown>)[campo];
    return typeof val === 'string' ? val.length : 0;
  }

  onFotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.fotoArquivo = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => this.fotoPreview = e.target?.result as string;
    reader.readAsDataURL(this.fotoArquivo);
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.logoArquivo = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => this.logoPreview = e.target?.result as string;
    reader.readAsDataURL(this.logoArquivo);
  }

  salvar(): void {
    this.salvando = true;
    const uploads: Promise<void>[] = [];

    if (this.fotoArquivo) {
      uploads.push(new Promise<void>((res, rej) => {
        this.perfilService.uploadFoto(this.associadoId, this.fotoArquivo!).subscribe({
          next: (r) => { this.form.fotoUrl = r.data.url; res(); },
          error: () => rej()
        });
      }));
    }
    if (this.logoArquivo) {
      uploads.push(new Promise<void>((res, rej) => {
        this.perfilService.uploadLogomarca(this.associadoId, this.logoArquivo!).subscribe({
          next: (r) => { this.form.logomarcaUrl = r.data.url; res(); },
          error: () => rej()
        });
      }));
    }

    Promise.all(uploads).then(() => {
      this.perfilService.salvar(this.associadoId, this.form).subscribe({
        next: (res) => {
          this.toastr.success(res.message || 'Perfil salvo com sucesso!');
          this.salvando = false;
          this.router.navigate(['/associados', this.associadoId, 'perfil', 'view']);
        },
        error: (err) => { this.toastr.error(err.error?.message || 'Erro ao salvar perfil'); this.salvando = false; }
      });
    }).catch(() => { this.toastr.error('Erro no upload de imagens'); this.salvando = false; });
  }
}
