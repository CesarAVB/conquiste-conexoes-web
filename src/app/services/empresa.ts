import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Empresa } from '../models/empresa.model';

@Injectable({ providedIn: 'root' })
export class EmpresaService {

  private url = `${environment.apiUrl}/associados`;

  constructor(private http: HttpClient) {}

  buscarPorAssociado(associadoId: number): Observable<ApiResponse<Empresa>> {
    return this.http.get<ApiResponse<Empresa>>(`${this.url}/${associadoId}/empresa`);
  }

  salvar(associadoId: number, data: Partial<Empresa>): Observable<ApiResponse<Empresa>> {
    return this.http.post<ApiResponse<Empresa>>(`${this.url}/${associadoId}/empresa`, data);
  }

  editar(associadoId: number, empresaId: number, data: Partial<Empresa>): Observable<ApiResponse<Empresa>> {
    return this.http.put<ApiResponse<Empresa>>(`${this.url}/${associadoId}/empresa/${empresaId}`, data);
  }
}
