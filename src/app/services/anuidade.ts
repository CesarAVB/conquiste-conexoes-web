import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Anuidade } from '../models/anuidade.model';

export interface RenovacaoPayload {
  statusPagamento: 'PAGO' | 'AGUARDANDO' | 'ISENTO';
  dataPagamento?: string;
}

@Injectable({ providedIn: 'root' })
export class AnuidadeService {

  private url = `${environment.apiUrl}/associados`;

  constructor(private http: HttpClient) {}

  listarPorAssociado(associadoId: number): Observable<ApiResponse<Anuidade[]>> {
    return this.http.get<ApiResponse<Anuidade[]>>(`${this.url}/${associadoId}/anuidades`);
  }

  renovar(associadoId: number, payload: RenovacaoPayload): Observable<ApiResponse<Anuidade>> {
    return this.http.post<ApiResponse<Anuidade>>(`${this.url}/${associadoId}/anuidades/renovar`, payload);
  }
}
