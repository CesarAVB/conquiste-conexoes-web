import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Associado } from '../models/associado.model';

export interface AssociadoFiltro {
  busca?: string;
  status?: string;
  equipeId?: number;
  clusterId?: number;
}

export interface AlterarStatusPayload {
  novoStatus: string;
  motivo?: string;
  dataInicioPausa?: string;
  dataPrevistaRetorno?: string;
  responsavelId: number;
}

@Injectable({ providedIn: 'root' })
export class AssociadoService {

  private url = `${environment.apiUrl}/associados`;

  constructor(private http: HttpClient) {}

  listar(filtro?: AssociadoFiltro): Observable<ApiResponse<Associado[]>> {
    let params = new HttpParams();
    if (filtro?.busca) params = params.set('busca', filtro.busca);
    if (filtro?.status) params = params.set('status', filtro.status);
    if (filtro?.equipeId) params = params.set('equipeId', filtro.equipeId);
    if (filtro?.clusterId) params = params.set('clusterId', filtro.clusterId);
    return this.http.get<ApiResponse<Associado[]>>(this.url, { params });
  }

  buscarPorId(id: number): Observable<ApiResponse<Associado>> {
    return this.http.get<ApiResponse<Associado>>(`${this.url}/${id}`);
  }

  criar(data: Partial<Associado>): Observable<ApiResponse<Associado>> {
    return this.http.post<ApiResponse<Associado>>(this.url, data);
  }

  editar(id: number, data: Partial<Associado>): Observable<ApiResponse<Associado>> {
    return this.http.put<ApiResponse<Associado>>(`${this.url}/${id}`, data);
  }

  alterarStatus(id: number, payload: AlterarStatusPayload): Observable<ApiResponse<Associado>> {
    return this.http.patch<ApiResponse<Associado>>(`${this.url}/${id}/status`, payload);
  }

  buscarParaSelect(busca: string): Observable<ApiResponse<{ id: number; nomeCompleto: string; cpf: string }[]>> {
    return this.http.get<ApiResponse<{ id: number; nomeCompleto: string; cpf: string }[]>>(
      `${this.url}/select`, { params: new HttpParams().set('busca', busca) }
    );
  }
}
