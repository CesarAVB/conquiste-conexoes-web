import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AssociadoGrupamento } from '../models/associado-grupamento.model';

@Injectable({ providedIn: 'root' })
export class AssociadoGrupamentoService {

  private url = `${environment.apiUrl}/associados`;

  constructor(private http: HttpClient) {}

  listarPorAssociado(associadoId: number): Observable<ApiResponse<AssociadoGrupamento[]>> {
    return this.http.get<ApiResponse<AssociadoGrupamento[]>>(`${this.url}/${associadoId}/grupamentos`);
  }

  vincular(associadoId: number, grupamentoId: number): Observable<ApiResponse<AssociadoGrupamento>> {
    return this.http.post<ApiResponse<AssociadoGrupamento>>(`${this.url}/${associadoId}/grupamentos`, { grupamentoId });
  }

  desvincular(associadoId: number, vinculoId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${associadoId}/grupamentos/${vinculoId}`);
  }
}
