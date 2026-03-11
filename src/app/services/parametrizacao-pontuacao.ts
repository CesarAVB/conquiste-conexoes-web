import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { ParametrizacaoPontuacao } from '../models/parametrizacao-pontuacao.model';

@Injectable({ providedIn: 'root' })
export class ParametrizacaoPontuacaoService {

  private url = `${environment.apiUrl}/parametrizacao-pontuacao`;

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<ApiResponse<ParametrizacaoPontuacao[]>> {
    return this.http.get<ApiResponse<ParametrizacaoPontuacao[]>>(this.url);
  }

  buscarPorId(id: number): Observable<ApiResponse<ParametrizacaoPontuacao>> {
    return this.http.get<ApiResponse<ParametrizacaoPontuacao>>(`${this.url}/${id}`);
  }

  criar(data: { faixaMinima: number; faixaMaxima: number; pontuacao: number }): Observable<ApiResponse<ParametrizacaoPontuacao>> {
    return this.http.post<ApiResponse<ParametrizacaoPontuacao>>(this.url, data);
  }

  editar(id: number, data: { faixaMinima: number; faixaMaxima: number; pontuacao: number }): Observable<ApiResponse<ParametrizacaoPontuacao>> {
    return this.http.put<ApiResponse<ParametrizacaoPontuacao>>(`${this.url}/${id}`, data);
  }

  excluir(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${id}`);
  }
}
