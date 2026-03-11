import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { PerfilAssociado } from '../models/perfil-associado.model';

@Injectable({ providedIn: 'root' })
export class PerfilAssociadoService {

  constructor(private http: HttpClient) {}

  private url(associadoId: number): string {
    return `${environment.apiUrl}/associados/${associadoId}/perfil`;
  }

  buscar(associadoId: number): Observable<ApiResponse<PerfilAssociado>> {
    return this.http.get<ApiResponse<PerfilAssociado>>(this.url(associadoId));
  }

  salvar(associadoId: number, data: Partial<PerfilAssociado>): Observable<ApiResponse<PerfilAssociado>> {
    return this.http.post<ApiResponse<PerfilAssociado>>(this.url(associadoId), data);
  }

  uploadFoto(associadoId: number, arquivo: File): Observable<ApiResponse<{ url: string }>> {
    const form = new FormData();
    form.append('foto', arquivo);
    return this.http.post<ApiResponse<{ url: string }>>(`${this.url(associadoId)}/foto`, form);
  }

  uploadLogomarca(associadoId: number, arquivo: File): Observable<ApiResponse<{ url: string }>> {
    const form = new FormData();
    form.append('logomarca', arquivo);
    return this.http.post<ApiResponse<{ url: string }>>(`${this.url(associadoId)}/logomarca`, form);
  }
