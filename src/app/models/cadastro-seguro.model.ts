import { Beneficiario } from './beneficiario.model';
import { ContatoEmergencia } from './contato-emergencia.model';

export interface CadastroSeguro {
	id: number;
	associadoId: number;
	nacionalidade: string;
	rgNumero: string;
	rgOrgaoEmissor: string;
	rgUf: string;
	estadoCivil: string;
	profissaoSecuritaria: string;
	editavel: boolean;
	lgpdDataAceite: string;
	beneficiarios: Beneficiario[];
	contatoEmergencia: ContatoEmergencia;
}
