import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { HorarioReuniao } from '../models/horario-reuniao.model';

@Injectable({ providedIn: 'root' })
export class HorarioReuniaoService {

  private url = `${environment.apiUrl}/horarios-reuniao`;

  constructor(private http: HttpClient) {}

  listarAtivos(): Observable<ApiResponse<HorarioReuniao[]>> {
    return this.http.get<ApiResponse<HorarioReuniao[]>>(this.url);
  }

  buscarPorId(id: number): Observable<ApiResponse<HorarioReuniao>> {
    return this.http.get<ApiResponse<HorarioReuniao>>(`${this.url}/${id}`);
  }

  criar(data: { descricao: string }): Observable<ApiResponse<HorarioReuniao>> {
    return this.http.post<ApiResponse<HorarioReuniao>>(this.url, data);
  }

  editar(id: number, data: { descricao: string }): Observable<ApiResponse<HorarioReuniao>> {
    return this.http.put<ApiResponse<HorarioReuniao>>(`${this.url}/${id}`, data);
  }

  alterarStatus(id: number, ativo: boolean): Observable<ApiResponse<HorarioReuniao>> {
    return this.http.patch<ApiResponse<HorarioReuniao>>(`${this.url}/${id}/status?ativo=${ativo}`, {});
  }
}
