import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReuniaoService, Reuniao } from '../../../../services/reuniao';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-reuniao-validar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './reuniao-validar.html',
  styleUrl: './reuniao-validar.scss'
})
export class ReuniaoValidarComponent implements OnInit {
  loading = true;
  salvando = false;
  reuniao: Reuniao | null = null;
  form = { prospects: 0, nenhuma: false, tangibilidades: [] as string[] };

  tangibilidadesOpcoes = [
    'Produto entregue', 'Serviço prestado', 'Contrato assinado', 'Proposta enviada',
    'Reunião com prospect', 'Indicação gerada', 'Indicação recebida', 'Parceria fechada',
    'Visita realizada', 'Demonstração feita', 'Outro'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ReuniaoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.buscarPorId(id).subscribe({
      next: (r) => { this.reuniao = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar reunião'); this.loading = false; }
    });
  }

  toggleTangibilidade(t: string): void {
    const idx = this.form.tangibilidades.indexOf(t);
    if (idx >= 0) this.form.tangibilidades.splice(idx, 1);
    else this.form.tangibilidades.push(t);
  }

  validar(): void {
    if (!this.form.nenhuma && this.form.tangibilidades.length === 0) { this.toastr.warning('Selecione ao menos uma tangibilidade ou marque nenhuma'); return; }
    this.salvando = true;
    this.service.validar(this.reuniao!.id, this.form).subscribe({
      next: (r) => { this.toastr.success(r.message); this.salvando = false; this.router.navigate(['/reunioes']); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro'); this.salvando = false; }
    });
  }
}
