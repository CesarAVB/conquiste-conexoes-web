import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Equipe } from '../models/equipe.model';
import { DiretorVinculo } from '../models/diretor-vinculo.model';
import { CargoAtivoEquipe } from '../models/cargo-ativo-equipe.model';
import { DesignacaoLideranca } from '../models/designacao-lideranca.model';
import { CicloSemanal } from '../models/ciclo-semanal.model';

export interface EquipeFiltro {
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class EquipeService {

  private url = `${environment.apiUrl}/equipes`;

  constructor(private http: HttpClient) {}

  listar(filtro?: EquipeFiltro): Observable<ApiResponse<Equipe[]>> {
    let params = new HttpParams();
    if (filtro?.status) params = params.set('status', filtro.status);
    return this.http.get<ApiResponse<Equipe[]>>(this.url, { params });
  }

  buscarPorId(id: number): Observable<ApiResponse<Equipe>> {
    return this.http.get<ApiResponse<Equipe>>(`${this.url}/${id}`);
  }

  criar(data: Partial<Equipe>): Observable<ApiResponse<Equipe>> {
    return this.http.post<ApiResponse<Equipe>>(this.url, data);
  }

  editar(id: number, data: Partial<Equipe>): Observable<ApiResponse<Equipe>> {
    return this.http.put<ApiResponse<Equipe>>(`${this.url}/${id}`, data);
  }

  lancar(id: number): Observable<ApiResponse<Equipe>> {
    return this.http.patch<ApiResponse<Equipe>>(`${this.url}/${id}/lancar`, {});
  }

  // --- Diretores ---
  listarDiretores(equipeId: number, tipo: 'TERRITORIO' | 'EQUIPE'): Observable<ApiResponse<DiretorVinculo[]>> {
    const params = new HttpParams().set('tipo', tipo);
    return this.http.get<ApiResponse<DiretorVinculo[]>>(`${this.url}/${equipeId}/diretores`, { params });
  }

  vincularDiretor(equipeId: number, data: { associadoId: number; tipo: string; dataInicio: string; dataFim: string | null }): Observable<ApiResponse<DiretorVinculo>> {
    return this.http.post<ApiResponse<DiretorVinculo>>(`${this.url}/${equipeId}/diretores`, data);
  }

  encerrarDiretor(equipeId: number, diretorId: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.url}/${equipeId}/diretores/${diretorId}/encerrar`, {});
  }

  // --- Cargos Ativos ---
  listarCargosAtivos(equipeId: number): Observable<ApiResponse<CargoAtivoEquipe[]>> {
    return this.http.get<ApiResponse<CargoAtivoEquipe[]>>(`${this.url}/${equipeId}/cargos-ativos`);
  }

  ativarCargo(equipeId: number, cargoId: number): Observable<ApiResponse<CargoAtivoEquipe>> {
    return this.http.post<ApiResponse<CargoAtivoEquipe>>(`${this.url}/${equipeId}/cargos-ativos`, { cargoId });
  }

  // --- Designações ---
  listarDesignacoes(equipeId: number): Observable<ApiResponse<DesignacaoLideranca[]>> {
    return this.http.get<ApiResponse<DesignacaoLideranca[]>>(`${this.url}/${equipeId}/designacoes`);
  }

  criarDesignacao(equipeId: number, data: { cargoAtivoEquipeId: number; associadoId: number; dataInicio: string; dataFim: string | null }): Observable<ApiResponse<DesignacaoLideranca>> {
    return this.http.post<ApiResponse<DesignacaoLideranca>>(`${this.url}/${equipeId}/designacoes`, data);
  }

  // --- Ciclos ---
  listarCiclos(equipeId: number): Observable<ApiResponse<CicloSemanal[]>> {
    return this.http.get<ApiResponse<CicloSemanal[]>>(`${this.url}/${equipeId}/ciclos`);
  }

  gerarProximoCiclo(equipeId: number): Observable<ApiResponse<CicloSemanal>> {
    return this.http.post<ApiResponse<CicloSemanal>>(`${this.url}/${equipeId}/ciclos/gerar-proximo`, {});
  }
}
