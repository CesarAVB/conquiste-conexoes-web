import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Endereco } from '../models/endereco.model';

@Injectable({ providedIn: 'root' })
export class EnderecoService {

  private url = `${environment.apiUrl}/associados`;

  constructor(private http: HttpClient) {}

  listarPorAssociado(associadoId: number): Observable<ApiResponse<Endereco[]>> {
    return this.http.get<ApiResponse<Endereco[]>>(`${this.url}/${associadoId}/enderecos`);
  }

  criar(associadoId: number, data: Partial<Endereco>): Observable<ApiResponse<Endereco>> {
    return this.http.post<ApiResponse<Endereco>>(`${this.url}/${associadoId}/enderecos`, data);
  }

  editar(associadoId: number, enderecoId: number, data: Partial<Endereco>): Observable<ApiResponse<Endereco>> {
    return this.http.put<ApiResponse<Endereco>>(`${this.url}/${associadoId}/enderecos/${enderecoId}`, data);
  }

  excluir(associadoId: number, enderecoId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${associadoId}/enderecos/${enderecoId}`);
  }
}
