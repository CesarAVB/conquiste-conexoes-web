import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface PeenModulo {
  id: number;
  titulo: string;
  descricao: string;
  urlPlataforma: string;
  duracaoHoras: number;
  pontos: number;
  concluido: boolean;
  dataConclusao: string;
}

export interface TeenEvento {
  id: number;
  titulo: string;
  descricao: string;
  dataEvento: string;
  local: string;
  cargaHoraria: number;
  pontos: number;
  inscrito: boolean;
  presente: boolean;
}

@Injectable({ providedIn: 'root' })
export class EducacionalService {
  private url = `${environment.apiUrl}/educacional`;
  constructor(private http: HttpClient) {}

  listarPeen(): Observable<ApiResponse<PeenModulo[]>> {
    return this.http.get<ApiResponse<PeenModulo[]>>(`${this.url}/peen`);
  }

  validarPeen(moduloId: number): Observable<ApiResponse<PeenModulo>> {
    return this.http.patch<ApiResponse<PeenModulo>>(`${this.url}/peen/${moduloId}/validar`, {});
  }

  listarTeen(): Observable<ApiResponse<TeenEvento[]>> {
    return this.http.get<ApiResponse<TeenEvento[]>>(`${this.url}/teen`);
  }

  inscreverTeen(eventoId: number): Observable<ApiResponse<TeenEvento>> {
    return this.http.post<ApiResponse<TeenEvento>>(`${this.url}/teen/${eventoId}/inscrever`, {});
  }
}
