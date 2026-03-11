export interface Associado {
	id: number;
	nomeCompleto: string;
	cpf: string;
	email: string;
	whatsapp: string;
	dataNascimento: string;
	mostrarAniversarioRede: boolean;
	dataIngresso: string;
	vencimentoAtual: string;
	status: string;
	equipeOrigemTipo: string;
	padrinhoId: number;
	padrinhoNome: string;
	equipeAtualId: number;
	equipeOrigemId: number;
	clusterId: number;
	clusterNome: string;
	atuacaoEspecificaId: number;
	atuacaoEspecificaNome: string;
}
