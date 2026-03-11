import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Cluster } from '../models/cluster.model';

@Injectable({ providedIn: 'root' })
export class ClusterService {

  private url = `${environment.apiUrl}/clusters`;

  constructor(private http: HttpClient) {}

  listarAtivos(): Observable<ApiResponse<Cluster[]>> {
    return this.http.get<ApiResponse<Cluster[]>>(this.url);
  }

  buscarPorId(id: number): Observable<ApiResponse<Cluster>> {
    return this.http.get<ApiResponse<Cluster>>(`${this.url}/${id}`);
  }

  criar(data: { nome: string }): Observable<ApiResponse<Cluster>> {
    return this.http.post<ApiResponse<Cluster>>(this.url, data);
  }

  editar(id: number, data: { nome: string }): Observable<ApiResponse<Cluster>> {
    return this.http.put<ApiResponse<Cluster>>(`${this.url}/${id}`, data);
  }

  alterarStatus(id: number, ativo: boolean): Observable<ApiResponse<Cluster>> {
    return this.http.patch<ApiResponse<Cluster>>(`${this.url}/${id}/status?ativo=${ativo}`, {});
  }
}
