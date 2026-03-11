import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { GrupamentoEstrategico } from '../models/grupamento-estrategico.model';

@Injectable({ providedIn: 'root' })
export class GrupamentoEstrategicoService {

  private url = `${environment.apiUrl}/grupamentos`;

  constructor(private http: HttpClient) {}

  listarAtivos(): Observable<ApiResponse<GrupamentoEstrategico[]>> {
    return this.http.get<ApiResponse<GrupamentoEstrategico[]>>(this.url);
  }

  buscarPorId(id: number): Observable<ApiResponse<GrupamentoEstrategico>> {
    return this.http.get<ApiResponse<GrupamentoEstrategico>>(`${this.url}/${id}`);
  }

  criar(data: { nome: string; sigla: string }): Observable<ApiResponse<GrupamentoEstrategico>> {
    return this.http.post<ApiResponse<GrupamentoEstrategico>>(this.url, data);
  }

  editar(id: number, data: { nome: string; sigla: string }): Observable<ApiResponse<GrupamentoEstrategico>> {
    return this.http.put<ApiResponse<GrupamentoEstrategico>>(`${this.url}/${id}`, data);
  }

  alterarStatus(id: number, ativo: boolean): Observable<ApiResponse<GrupamentoEstrategico>> {
    return this.http.patch<ApiResponse<GrupamentoEstrategico>>(`${this.url}/${id}/status?ativo=${ativo}`, {});
  }
}
