import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface Parceria {
  id: number;
  associado1Id: number;
  associado1Nome: string;
  associado2Id: number;
  associado2Nome: string;
  dataParceria: string;
}

@Injectable({ providedIn: 'root' })
export class ParceriaService {
  private url = `${environment.apiUrl}/parcerias`;
  constructor(private http: HttpClient) {}

  listar(): Observable<ApiResponse<Parceria[]>> {
    return this.http.get<ApiResponse<Parceria[]>>(this.url);
  }

  registrar(associado2Id: number): Observable<ApiResponse<Parceria>> {
    return this.http.post<ApiResponse<Parceria>>(this.url, { associado2Id });
  }
}
