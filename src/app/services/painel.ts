import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface IndicadorSemanal {
  nome: string;
  meta: number;
  realizado: number;
  acumulado: number;
  rotaAcao?: string;
  labelAcao?: string;
  /** Se true, o acumulado é exibido como valor monetário (R$) */
  isMoney?: boolean;
}

export interface EvolucaoItem {
  periodo: string;
  reunioes: number;
  conexoes: number;
  ng: number;
  parcerias: number;
  nr: number;
  visitantes: number;
  pontos: number;
}

@Injectable({ providedIn: 'root' })
export class PainelService {
  private url = `${environment.apiUrl}/paineis`;
  constructor(private http: HttpClient) {}

  semanal(): Observable<ApiResponse<IndicadorSemanal[]>> {
    return this.http.get<ApiResponse<IndicadorSemanal[]>>(`${this.url}/semanal`);
  }

  evolucaoIndividual(periodo: '1M' | '6M' | 'TOTAL'): Observable<ApiResponse<EvolucaoItem[]>> {
    return this.http.get<ApiResponse<EvolucaoItem[]>>(`${this.url}/evolucao`, { params: new HttpParams().set('periodo', periodo) });
  }

  performanceEquipe(periodo: '1M' | '3M' | 'TOTAL'): Observable<ApiResponse<EvolucaoItem[]>> {
    return this.http.get<ApiResponse<EvolucaoItem[]>>(`${this.url}/equipe`, { params: new HttpParams().set('periodo', periodo) });
  }
}
