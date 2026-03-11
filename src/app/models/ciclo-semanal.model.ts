export interface CicloSemanal {
	id: number;
	numeroReuniao: number;
	dataReuniao: string;
	dataInicioCiclo: string;
	dataEncerramentoCiclo: string;
	mesCompetencia: number;
	anoCompetencia: number;
	tipoReuniao: 'PRESENCIAL' | 'ONLINE';
}
