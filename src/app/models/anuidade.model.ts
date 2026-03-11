export interface Anuidade {
	id: number;
	tipo: 'PRIMEIRA' | 'RENOVACAO';
	statusPagamento: 'PAGO' | 'AGUARDANDO' | 'ISENTO';
	dataPagamento: string;
	vencimentoGerado: string;
}
