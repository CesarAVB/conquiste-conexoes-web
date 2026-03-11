import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Equipe } from '../models/equipe.model';

export interface EquipeFiltro {
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class EquipeService {

  private url = `${environment.apiUrl}/equipes`;

  constructor(private http: HttpClient) {}

  listar(filtro?: EquipeFiltro): Observable<ApiResponse<Equipe[]>> {
    let params = new HttpParams();
    if (filtro?.status) params = params.set('status', filtro.status);
    return this.http.get<ApiResponse<Equipe[]>>(this.url, { params });
  }

  buscarPorId(id: number): Observable<ApiResponse<Equipe>> {
    return this.http.get<ApiResponse<Equipe>>(`${this.url}/${id}`);
  }

  criar(data: Partial<Equipe>): Observable<ApiResponse<Equipe>> {
    return this.http.post<ApiResponse<Equipe>>(this.url, data);
  }

  editar(id: number, data: Partial<Equipe>): Observable<ApiResponse<Equipe>> {
    return this.http.put<ApiResponse<Equipe>>(`${this.url}/${id}`, data);
  }

  lancar(id: number): Observable<ApiResponse<Equipe>> {
    return this.http.patch<ApiResponse<Equipe>>(`${this.url}/${id}/lancar`, {});
  }
}
