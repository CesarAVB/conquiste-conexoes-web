import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReuniaoService } from '../../../../services/reuniao';
import { AssociadoService } from '../../../../services/associado';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-reuniao-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './reuniao-agendar.html',
  styleUrl: './reuniao-agendar.scss'
})
export class ReuniaoAgendarComponent {
  salvando = false;
  buscaAssociado = '';
  buscando = false;
  associadosResultado: { id: number; nomeCompleto: string; cpf: string }[] = [];
  form = { associado2Id: 0, associado2Label: '', dataHora: '', tipo: 'PRESENCIAL' };

  constructor(
    private service: ReuniaoService,
    private associadoService: AssociadoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  buscar(): void {
    if (this.buscaAssociado.trim().length < 2) return;
    this.buscando = true;
    this.associadoService.buscarParaSelect(this.buscaAssociado.trim()).subscribe({
      next: (r) => { this.associadosResultado = r.data; this.buscando = false; },
      error: () => { this.buscando = false; }
    });
  }

  selecionar(a: { id: number; nomeCompleto: string; cpf: string }): void {
    this.form.associado2Id = a.id;
    this.form.associado2Label = `${a.nomeCompleto} (${a.cpf})`;
    this.buscaAssociado = this.form.associado2Label;
    this.associadosResultado = [];
  }

  salvar(): void {
    if (!this.form.associado2Id || !this.form.dataHora) { this.toastr.warning('Preencha todos os campos'); return; }
    this.salvando = true;
    this.service.agendar({ associado2Id: this.form.associado2Id, dataHora: this.form.dataHora, tipo: this.form.tipo as any }).subscribe({
      next: (r) => { this.toastr.success(r.message); this.salvando = false; this.router.navigate(['/reunioes']); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro ao agendar'); this.salvando = false; }
    });
  }
}
