// src/app/pages/equipes/equipe-ciclos/equipe-ciclos.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EquipeService } from '../../../services/equipe';
import { CicloSemanal } from '../../../models/ciclo-semanal.model';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-equipe-ciclos',
  standalone: true,
  imports: [CommonModule, LoadingSpinner],
  templateUrl: './equipe-ciclos.html',
  styleUrl: './equipe-ciclos.scss'
})
export class EquipeCiclosComponent implements OnInit {
  @Input() equipeId!: number;

  ciclos: CicloSemanal[] = [];
  loading = true;
  gerandoProximo = false;

  constructor(
    private equipeService: EquipeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.loading = true;
    this.equipeService.listarCiclos(this.equipeId).subscribe({
      next: (res) => { this.ciclos = res.data; this.loading = false; },
      error: () => { this.toastr.error('Erro ao carregar ciclos'); this.loading = false; }
    });
  }

  gerarProximo(): void {
    this.gerandoProximo = true;
    this.equipeService.gerarProximoCiclo(this.equipeId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.gerandoProximo = false;
        this.carregar();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Erro ao gerar ciclo');
        this.gerandoProximo = false;
      }
    });
  }

  meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  labelMes(mes: number, ano: number): string { return `${this.meses[mes - 1]}/${ano}`; }
}
