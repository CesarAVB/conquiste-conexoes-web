import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { VisitanteService } from '../../../../services/visitante';
import { EquipeService } from '../../../../services/equipe';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-visita-interna-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './visita-interna-form.html',
  styleUrl: './visita-interna-form.scss'
})
export class VisitaInternaFormComponent implements OnInit {
  salvando = false;
  equipes: { id: number; nome: string }[] = [];
  form = { equipeDestinoId: 0, nomeCompleto: '', cpf: '', telefone: '' };

  constructor(private service: VisitanteService, private equipeService: EquipeService, private router: Router, private toastr: ToastService) {}

  ngOnInit(): void {
    this.equipeService.listar().subscribe({ next: (r) => this.equipes = r.data });
  }

  salvar(): void {
    if (!this.form.equipeDestinoId || !this.form.nomeCompleto) { this.toastr.warning('Preencha os campos obrigatórios'); return; }
    this.salvando = true;
    this.service.registrarInterno(this.form).subscribe({
      next: (r) => { this.toastr.success(r.message); this.salvando = false; this.router.navigate(['/visitantes/validacao']); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro'); this.salvando = false; }
    });
  }
}
