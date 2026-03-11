import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast';
import { EducacionalService, TeenEvento } from '../../../../services/educacional';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-teen-inscricao',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './teen-inscricao.html',
  styleUrl: './teen-inscricao.scss'
})
export class TeenInscricaoComponent implements OnInit {
  loading = true;
  salvando = false;
  eventoId = 0;
  evento: TeenEvento | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: EducacionalService,
    private router: Router,
    private toastr: ToastService
  ) {}

  ngOnInit(): void {
    this.eventoId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.listarTeen().subscribe({
      next: (r) => {
        this.evento = r.data.find(e => e.id === this.eventoId) ?? null;
        this.loading = false;
        if (!this.evento) this.router.navigate(['/educacional/teen']);
      },
      error: () => { this.toastr.error('Evento não encontrado'); this.router.navigate(['/educacional/teen']); }
    });
  }

  inscrever(): void {
    this.salvando = true;
    this.service.inscreverTeen(this.eventoId).subscribe({
      next: (r) => { this.toastr.success(r.message); this.salvando = false; this.router.navigate(['/educacional/teen']); },
      error: (e) => { this.toastr.error(e.error?.message || 'Erro'); this.salvando = false; }
    });
  }
}
