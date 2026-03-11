import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { CadastroSeguro } from '../models/cadastro-seguro.model';
import { SolicitacaoAlteracao } from '../models/solicitacao-alteracao.model';

@Injectable({ providedIn: 'root' })
export class CadastroSeguroService {

  constructor(private http: HttpClient) {}

  private url(associadoId: number): string {
    return `${environment.apiUrl}/associados/${associadoId}/seguro`;
  }

  buscar(associadoId: number): Observable<ApiResponse<CadastroSeguro>> {
    return this.http.get<ApiResponse<CadastroSeguro>>(this.url(associadoId));
  }

  criar(associadoId: number, data: Partial<CadastroSeguro>): Observable<ApiResponse<CadastroSeguro>> {
    return this.http.post<ApiResponse<CadastroSeguro>>(this.url(associadoId), data);
  }

  // Solicitações de alteração
  listarSolicitacoes(associadoId: number): Observable<ApiResponse<SolicitacaoAlteracao[]>> {
    return this.http.get<ApiResponse<SolicitacaoAlteracao[]>>(`${this.url(associadoId)}/solicitacoes`);
  }

  criarSolicitacao(associadoId: number, justificativa: string): Observable<ApiResponse<SolicitacaoAlteracao>> {
    return this.http.post<ApiResponse<SolicitacaoAlteracao>>(`${this.url(associadoId)}/solicitacoes`, { justificativa });
  }

  resolverSolicitacao(associadoId: number, solicitacaoId: number, data: { status: string; responsavelId: number }): Observable<ApiResponse<SolicitacaoAlteracao>> {
    return this.http.patch<ApiResponse<SolicitacaoAlteracao>>(`${this.url(associadoId)}/solicitacoes/${solicitacaoId}/resolver`, data);
  }
}
