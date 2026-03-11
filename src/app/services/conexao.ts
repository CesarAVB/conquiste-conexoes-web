import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface Conexao {
  id: number;
  geradoPorId: number;
  geradoPorNome: string;
  receptorId: number;
  receptorNome: string;
  nomeContato: string;
  telefoneContato: string;
  empresaContato: string;
  tipo: 'QUENTE' | 'MORNA' | 'FRIA';
  status: 'NOVA' | 'EM_ANDAMENTO' | 'FECHADA' | 'NAO_FECHADA';
  valorNegocio: number;
  motivoNaoFechamento: string;
  dataCriacao: string;
  prazoEstourado: boolean;
}

export interface ConexaoFiltro { status?: string; }

@Injectable({ providedIn: 'root' })
export class ConexaoService {
  private url = `${environment.apiUrl}/conexoes`;
  constructor(private http: HttpClient) {}

  listarGeradas(filtro?: ConexaoFiltro): Observable<ApiResponse<Conexao[]>> {
    let params = new HttpParams();
    if (filtro?.status) params = params.set('status', filtro.status);
    return this.http.get<ApiResponse<Conexao[]>>(`${this.url}/geradas`, { params });
  }

  listarRecebidas(filtro?: ConexaoFiltro): Observable<ApiResponse<Conexao[]>> {
    let params = new HttpParams();
    if (filtro?.status) params = params.set('status', filtro.status);
    return this.http.get<ApiResponse<Conexao[]>>(`${this.url}/recebidas`, { params });
  }

  criar(data: Partial<Conexao>): Observable<ApiResponse<Conexao>> {
    return this.http.post<ApiResponse<Conexao>>(this.url, data);
  }

  atualizar(id: number, data: { status: string; valorNegocio?: number; motivoNaoFechamento?: string }): Observable<ApiResponse<Conexao>> {
    return this.http.patch<ApiResponse<Conexao>>(`${this.url}/${id}`, data);
  }

  excluir(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${id}`);
  }
}
