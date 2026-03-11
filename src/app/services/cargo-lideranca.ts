import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { CargoLideranca } from '../models/cargo-lideranca.model';

@Injectable({ providedIn: 'root' })
export class CargoLiderancaService {

  private url = `${environment.apiUrl}/cargos-lideranca`;

  constructor(private http: HttpClient) {}

  listarAtivos(): Observable<ApiResponse<CargoLideranca[]>> {
    return this.http.get<ApiResponse<CargoLideranca[]>>(this.url);
  }

  buscarPorId(id: number): Observable<ApiResponse<CargoLideranca>> {
    return this.http.get<ApiResponse<CargoLideranca>>(`${this.url}/${id}`);
  }

  criar(data: { nome: string; classificacao: string }): Observable<ApiResponse<CargoLideranca>> {
    return this.http.post<ApiResponse<CargoLideranca>>(this.url, data);
  }

  editar(id: number, data: { nome: string; classificacao: string }): Observable<ApiResponse<CargoLideranca>> {
    return this.http.put<ApiResponse<CargoLideranca>>(`${this.url}/${id}`, data);
  }

  alterarStatus(id: number, ativo: boolean): Observable<ApiResponse<CargoLideranca>> {
    return this.http.patch<ApiResponse<CargoLideranca>>(`${this.url}/${id}/status?ativo=${ativo}`, {});
  }
}
