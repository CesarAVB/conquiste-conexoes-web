export interface AssociadoStatusHistorico {
	id: number;
	statusAnterior: string;
	statusNovo: string;
	motivo: string;
	dataInicioPausa: string;
	dataPrevistaRetorno: string;
	responsavelId: number;
	dataHora: string;
}
