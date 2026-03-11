import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EducacionalService, TeenEvento } from '../../../../services/educacional';
import { LoadingSpinner } from '../../../../components/shared/loading-spinner/loading-spinner';
import { PageHeaderComponent } from '../../../../components/shared/page-header/page-header';

@Component({
  selector: 'app-teen-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinner, PageHeaderComponent],
  templateUrl: './teen-eventos.html',
  styleUrl: './teen-eventos.scss'
})
export class TeenEventosComponent implements OnInit {
  loading = true;
  eventos: TeenEvento[] = [];

  constructor(private service: EducacionalService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.listarTeen().subscribe({
      next: (r) => { this.eventos = r.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar eventos'); this.loading = false; }
    });
  }
}
