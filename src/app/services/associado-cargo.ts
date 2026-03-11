import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AssociadoCargo } from '../models/associado-cargo.model';

@Injectable({ providedIn: 'root' })
export class AssociadoCargoService {

  private url = `${environment.apiUrl}/associados`;

  constructor(private http: HttpClient) {}

  listarPorAssociado(associadoId: number): Observable<ApiResponse<AssociadoCargo[]>> {
    return this.http.get<ApiResponse<AssociadoCargo[]>>(`${this.url}/${associadoId}/cargos`);
  }

  vincular(associadoId: number, data: { cargoId: number; dataInicio: string }): Observable<ApiResponse<AssociadoCargo>> {
    return this.http.post<ApiResponse<AssociadoCargo>>(`${this.url}/${associadoId}/cargos`, data);
  }

  encerrar(associadoId: number, vinculoId: number, dataFim: string): Observable<ApiResponse<AssociadoCargo>> {
    return this.http.patch<ApiResponse<AssociadoCargo>>(`${this.url}/${associadoId}/cargos/${vinculoId}/encerrar`, { dataFim });
  }
}
