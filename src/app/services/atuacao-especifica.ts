import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AtuacaoEspecifica } from '../models/atuacao-especifica.model';

@Injectable({ providedIn: 'root' })
export class AtuacaoEspecificaService {

  private url = `${environment.apiUrl}/atuacoes-especificas`;

  constructor(private http: HttpClient) {}

  listarPorCluster(clusterId: number): Observable<ApiResponse<AtuacaoEspecifica[]>> {
    return this.http.get<ApiResponse<AtuacaoEspecifica[]>>(`${this.url}/cluster/${clusterId}`);
  }

  buscarPorId(id: number): Observable<ApiResponse<AtuacaoEspecifica>> {
    return this.http.get<ApiResponse<AtuacaoEspecifica>>(`${this.url}/${id}`);
  }

  criar(data: { nome: string; clusterId: number }): Observable<ApiResponse<AtuacaoEspecifica>> {
    return this.http.post<ApiResponse<AtuacaoEspecifica>>(this.url, data);
  }

  editar(id: number, data: { nome: string; clusterId: number }): Observable<ApiResponse<AtuacaoEspecifica>> {
    return this.http.put<ApiResponse<AtuacaoEspecifica>>(`${this.url}/${id}`, data);
  }

  alterarStatus(id: number, ativo: boolean): Observable<ApiResponse<AtuacaoEspecifica>> {
    return this.http.patch<ApiResponse<AtuacaoEspecifica>>(`${this.url}/${id}/status?ativo=${ativo}`, {});
  }
}
