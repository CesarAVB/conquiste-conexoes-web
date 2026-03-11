import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface Reuniao {
  id: number;
  associado1Id: number;
  associado1Nome: string;
  associado2Id: number;
  associado2Nome: string;
  dataHora: string;
  tipo: 'PRESENCIAL' | 'ONLINE';
  status: 'PENDENTE' | 'REALIZADA' | 'ADIADA' | 'CANCELADA';
  prospects: number;
  nenhuma: boolean;
  tangibilidades: string[];
  dataValidacao: string;
}

export interface ReuniaoFiltro {
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class ReuniaoService {
  private url = `${environment.apiUrl}/reunioes`;
  constructor(private http: HttpClient) {}

  listar(filtro?: ReuniaoFiltro): Observable<ApiResponse<Reuniao[]>> {
    let params = new HttpParams();
    if (filtro?.status) params = params.set('status', filtro.status);
    return this.http.get<ApiResponse<Reuniao[]>>(this.url, { params });
  }

  buscarPorId(id: number): Observable<ApiResponse<Reuniao>> {
    return this.http.get<ApiResponse<Reuniao>>(`${this.url}/${id}`);
  }

  agendar(data: Partial<Reuniao>): Observable<ApiResponse<Reuniao>> {
    return this.http.post<ApiResponse<Reuniao>>(this.url, data);
  }

  adiar(id: number, data: { novaDataHora: string; justificativa: string }): Observable<ApiResponse<Reuniao>> {
    return this.http.patch<ApiResponse<Reuniao>>(`${this.url}/${id}/adiar`, data);
  }

  cancelar(id: number, justificativa: string): Observable<ApiResponse<Reuniao>> {
    return this.http.patch<ApiResponse<Reuniao>>(`${this.url}/${id}/cancelar`, { justificativa });
  }

  validar(id: number, data: { prospects: number; nenhuma: boolean; tangibilidades: string[] }): Observable<ApiResponse<Reuniao>> {
    return this.http.patch<ApiResponse<Reuniao>>(`${this.url}/${id}/validar`, data);
  }
}
