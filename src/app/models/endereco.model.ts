export interface Endereco {
	id: number;
	tipo: 'RESIDENCIAL' | 'COMERCIAL';
	rua: string;
	numero: string;
	complemento: string;
	bairro: string;
	cidade: string;
	estado: string;
	cep: string;
	visivelParaRede: boolean;
}
