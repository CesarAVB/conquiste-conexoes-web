import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParceriaService } from '../../../../services/parceria';
import { AssociadoService } from '../../../../services/associado';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-parceria-nova',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './parceria-nova.html',
  styleUrl: './parceria-nova.scss'
})
export class ParceriaNovaComponent {
  salvando = false;
  buscaTexto = '';
  buscando = false;
  resultados: { id: number; nomeCompleto: string; cpf: string }[] = [];
  associado2Id = 0;
  associado2Label = '';

  constructor(
    private service: ParceriaService,
    private associadoService: AssociadoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  buscar(): void {
    if (this.buscaTexto.trim().length < 2) return;
    this.buscando = true;
    this.associadoService.buscarParaSelect(this.buscaTexto.trim()).subscribe({
      next: (r) => { this.resultados = r.data; this.buscando = false; },
      error: () => { this.buscando = false; }
    });
  }

  selecionar(a: { id: number; nomeCompleto: string; cpf: string }): void {
    this.associado2Id = a.id;
    this.associado2Label = `${a.nomeCompleto} (${a.cpf})`;
    this.buscaTexto = this.associado2Label;
    this.resultados = [];
  }

  registrar(): void {
    if (!this.associado2Id) { this.toastr.warning('Selecione um associado'); return; }
    this.salvando = true;
    this.service.registrar(this.associado2Id).subscribe({
      next: (r) => { this.toastr.success(r.message); this.salvando = false; this.router.navigate(['/parcerias']); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro'); this.salvando = false; }
    });
  }
}
