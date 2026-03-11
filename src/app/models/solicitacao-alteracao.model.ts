export interface SolicitacaoAlteracao {
	id: number;
	associadoId: number;
	justificativa: string;
	protocolo: string;
	status: 'SOLICITADO' | 'EM_ANALISE' | 'APROVADO' | 'REJEITADO';
	dataSolicitacao: string;
	dataResolucao: string;
	responsavelResolucaoId: number;
}
