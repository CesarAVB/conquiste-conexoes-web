import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface Visitante {
  id: number;
  tipo: 'EXTERNO' | 'INTERNO' | 'SUBSTITUTO';
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
  profissao: string;
  equipeOrigemId: number;
  equipeDestinoId: number;
  dataVisita: string;
  validado: boolean;
}

@Injectable({ providedIn: 'root' })
export class VisitanteService {
  private url = `${environment.apiUrl}/visitantes`;
  constructor(private http: HttpClient) {}

  listarPendentes(): Observable<ApiResponse<Visitante[]>> {
    return this.http.get<ApiResponse<Visitante[]>>(`${this.url}/pendentes`);
  }

  registrarExterno(data: Partial<Visitante>): Observable<ApiResponse<Visitante>> {
    return this.http.post<ApiResponse<Visitante>>(`${this.url}/externo`, data);
  }

  registrarInterno(data: Partial<Visitante>): Observable<ApiResponse<Visitante>> {
    return this.http.post<ApiResponse<Visitante>>(`${this.url}/interno`, data);
  }

  registrarSubstituto(data: Partial<Visitante>): Observable<ApiResponse<Visitante>> {
    return this.http.post<ApiResponse<Visitante>>(`${this.url}/substituto`, data);
  }

  validar(id: number): Observable<ApiResponse<Visitante>> {
    return this.http.patch<ApiResponse<Visitante>>(`${this.url}/${id}/validar`, {});
  }
}
