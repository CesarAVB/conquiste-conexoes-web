// ============================================================
// MOCKS DE DESENVOLVIMENTO
// Para remover: apague este arquivo e retire o import de
// DEV_MOCK_PROVIDERS do app.config.ts
// ============================================================

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AssociadoService } from './services/associado';
import { AnuidadeService } from './services/anuidade';
import { AssociadoCargoService } from './services/associado-cargo';
import { AssociadoGrupamentoService } from './services/associado-grupamento';
import { AtuacaoEspecificaService } from './services/atuacao-especifica';
import { CadastroSeguroService } from './services/cadastro-seguro';
import { CargoLiderancaService } from './services/cargo-lideranca';
import { ClusterService } from './services/cluster';
import { ConexaoService } from './services/conexao';
import { EducacionalService } from './services/educacional';
import { EquipeService } from './services/equipe';
import { EmpresaService } from './services/empresa';
import { EnderecoService } from './services/endereco';
import { GrupamentoEstrategicoService } from './services/grupamento-estrategico';
import { HorarioReuniaoService } from './services/horario-reuniao';
import { PainelService } from './services/painel';
import { ParceriaService } from './services/parceria';
import { ParametrizacaoPontuacaoService } from './services/parametrizacao-pontuacao';
import { PerfilAssociadoService } from './services/perfil-associado';
import { ReuniaoService } from './services/reuniao';
import { VisitanteService } from './services/visitante';

// -----------------------------------------------------------
// Helper: embrulha dado no formato ApiResponse com delay leve
// -----------------------------------------------------------
const ok = <T>(data: T, message = 'ok') =>
  of({ success: true, message, data, timestamp: new Date().toISOString() }).pipe(delay(400));

const nowIso = () => new Date().toISOString().slice(0, 10);

// -----------------------------------------------------------
// Dados fictícios
// -----------------------------------------------------------

const CLUSTERS = [
  { id: 1, nome: 'Saúde', ativo: true },
  { id: 2, nome: 'Construção', ativo: true },
  { id: 3, nome: 'Negócios', ativo: true },
];

const ATUACOES = [
  { id: 1, nome: 'Nutrição Clínica', clusterId: 1, clusterNome: 'Saúde', ativo: true },
  { id: 2, nome: 'Medicina', clusterId: 1, clusterNome: 'Saúde', ativo: true },
  { id: 3, nome: 'Engenharia Civil', clusterId: 2, clusterNome: 'Construção', ativo: true },
  { id: 4, nome: 'Arquitetura', clusterId: 2, clusterNome: 'Construção', ativo: true },
  { id: 5, nome: 'Contabilidade', clusterId: 3, clusterNome: 'Negócios', ativo: true },
  { id: 6, nome: 'Advocacia', clusterId: 3, clusterNome: 'Negócios', ativo: true },
];

const HORARIOS = [
  { id: 1, descricao: 'Terça 07h30', ativo: true },
  { id: 2, descricao: 'Quarta 12h00', ativo: true },
  { id: 3, descricao: 'Quinta 18h00', ativo: false },
];

const GRUPAMENTOS = [
  { id: 1, nome: 'Civil e Liderança', sigla: 'CIVL', ativo: true },
  { id: 2, nome: 'Saúde e Integração', sigla: 'SAIN', ativo: true },
  { id: 3, nome: 'Imobiliário', sigla: 'IMOB', ativo: true },
];

const CARGOS = [
  { id: 1, nome: 'Presidente', classificacao: 'ISENTO' as const, ativo: true },
  { id: 2, nome: 'Vice-Presidente', classificacao: 'ISENTO' as const, ativo: true },
  { id: 3, nome: 'Diretor de Marketing', classificacao: 'NORMAL' as const, ativo: true },
  { id: 4, nome: 'Diretor Financeiro', classificacao: 'NORMAL' as const, ativo: true },
];

const EQUIPES = [
  {
    id: 1, nome: 'C+C Águia', dataInicioFormacao: '2024-01-15',
    dataPrevisaoLancamento: '2024-03-18', dataEfetivaLancamento: '2024-03-20',
    diaReuniao: 'TERCA', horarioReuniaoId: 1, horarioDescricao: 'Terça 07h30',
    modeloReuniao: 'PRESENCIAL', linkZoom: '', status: 'ATIVA', contadorReunioes: 48,
  },
  {
    id: 2, nome: 'C+C Leão', dataInicioFormacao: '2024-06-01',
    dataPrevisaoLancamento: '2024-08-03', dataEfetivaLancamento: '2024-08-10',
    diaReuniao: 'QUARTA', horarioReuniaoId: 2, horarioDescricao: 'Quarta 12h00',
    modeloReuniao: 'HIBRIDO', linkZoom: 'https://zoom.us/j/123456', status: 'ATIVA', contadorReunioes: 28,
  },
  {
    id: 3, nome: 'C+C Falcão', dataInicioFormacao: '2025-02-01',
    dataPrevisaoLancamento: '2025-04-05', dataEfetivaLancamento: '',
    diaReuniao: 'QUINTA', horarioReuniaoId: 3, horarioDescricao: 'Quinta 18h00',
    modeloReuniao: 'ONLINE', linkZoom: 'https://zoom.us/j/789012', status: 'EM_FORMACAO', contadorReunioes: 12,
  },
];

const ASSOCIADOS = [
  {
    id: 1, nomeCompleto: 'Ana Paula Ferreira', cpf: '111.222.333-44',
    email: 'ana.paula@email.com', whatsapp: '(11) 91234-5678',
    dataNascimento: '1988-03-15', mostrarAniversarioRede: true,
    dataIngresso: '2024-02-01', vencimentoAtual: '2025-03-01',
    status: 'ATIVO', equipeOrigemTipo: 'ORIGINAL',
    padrinhoId: 2, padrinhoNome: 'Carlos Mendes',
    equipeAtualId: 1, equipeOrigemId: 1, clusterId: 3,
    clusterNome: 'Negócios', atuacaoEspecificaId: 5, atuacaoEspecificaNome: 'Contabilidade',
  },
  {
    id: 2, nomeCompleto: 'Carlos Mendes', cpf: '222.333.444-55',
    email: 'carlos.mendes@email.com', whatsapp: '(11) 92345-6789',
    dataNascimento: '1982-07-22', mostrarAniversarioRede: false,
    dataIngresso: '2023-05-10', vencimentoAtual: '2025-06-01',
    status: 'ATIVO', equipeOrigemTipo: 'ORIGINAL',
    padrinhoId: 0, padrinhoNome: '',
    equipeAtualId: 1, equipeOrigemId: 1, clusterId: 3,
    clusterNome: 'Negócios', atuacaoEspecificaId: 6, atuacaoEspecificaNome: 'Advocacia',
  },
  {
    id: 3, nomeCompleto: 'Beatriz Costa', cpf: '333.444.555-66',
    email: 'beatriz.costa@email.com', whatsapp: '(21) 93456-7890',
    dataNascimento: '1992-11-08', mostrarAniversarioRede: true,
    dataIngresso: '2024-08-20', vencimentoAtual: '2025-09-01',
    status: 'ATIVO', equipeOrigemTipo: 'ORIGINAL',
    padrinhoId: 1, padrinhoNome: 'Ana Paula Ferreira',
    equipeAtualId: 2, equipeOrigemId: 2, clusterId: 2,
    clusterNome: 'Construção', atuacaoEspecificaId: 3, atuacaoEspecificaNome: 'Engenharia Civil',
  },
  {
    id: 4, nomeCompleto: 'Roberto Alves', cpf: '444.555.666-77',
    email: 'roberto.alves@email.com', whatsapp: '(31) 94567-8901',
    dataNascimento: '1975-05-30', mostrarAniversarioRede: false,
    dataIngresso: '2023-11-01', vencimentoAtual: '2024-12-01',
    status: 'INATIVO_PAUSA', equipeOrigemTipo: 'COLABORATIVA',
    padrinhoId: 2, padrinhoNome: 'Carlos Mendes',
    equipeAtualId: 2, equipeOrigemId: 2, clusterId: 2,
    clusterNome: 'Construção', atuacaoEspecificaId: 4, atuacaoEspecificaNome: 'Arquitetura',
  },
  {
    id: 5, nomeCompleto: 'Fernanda Lima', cpf: '555.666.777-88',
    email: 'fernanda.lima@email.com', whatsapp: '(41) 95678-9012',
    dataNascimento: '1995-09-12', mostrarAniversarioRede: true,
    dataIngresso: '2025-01-15', vencimentoAtual: '2026-02-01',
    status: 'PRE_ATIVO', equipeOrigemTipo: 'ORIGINAL',
    padrinhoId: 3, padrinhoNome: 'Beatriz Costa',
    equipeAtualId: 3, equipeOrigemId: 3, clusterId: 1,
    clusterNome: 'Saúde', atuacaoEspecificaId: 1, atuacaoEspecificaNome: 'Nutrição Clínica',
  },
];

const REUNIOES = [
  {
    id: 1, associado1Id: 1, associado1Nome: 'Ana Paula Ferreira',
    associado2Id: 2, associado2Nome: 'Carlos Mendes',
    dataHora: '2026-03-12T07:30:00', tipo: 'PRESENCIAL' as const,
    status: 'PENDENTE' as const, prospects: 0, nenhuma: false,
    tangibilidades: [], dataValidacao: '',
  },
  {
    id: 2, associado1Id: 1, associado1Nome: 'Ana Paula Ferreira',
    associado2Id: 3, associado2Nome: 'Beatriz Costa',
    dataHora: '2026-03-05T12:00:00', tipo: 'ONLINE' as const,
    status: 'REALIZADA' as const, prospects: 2, nenhuma: false,
    tangibilidades: ['CONEXAO'], dataValidacao: '2026-03-05T13:00:00',
  },
  {
    id: 3, associado1Id: 2, associado1Nome: 'Carlos Mendes',
    associado2Id: 4, associado2Nome: 'Roberto Alves',
    dataHora: '2026-02-28T18:00:00', tipo: 'PRESENCIAL' as const,
    status: 'ADIADA' as const, prospects: 0, nenhuma: false,
    tangibilidades: [], dataValidacao: '',
  },
  {
    id: 4, associado1Id: 3, associado1Nome: 'Beatriz Costa',
    associado2Id: 5, associado2Nome: 'Fernanda Lima',
    dataHora: '2026-03-10T09:00:00', tipo: 'PRESENCIAL' as const,
    status: 'REALIZADA' as const, prospects: 1, nenhuma: false,
    tangibilidades: ['PARCERIA'], dataValidacao: '2026-03-10T10:00:00',
  },
  {
    id: 5, associado1Id: 4, associado1Nome: 'Roberto Alves',
    associado2Id: 5, associado2Nome: 'Fernanda Lima',
    dataHora: '2026-03-15T07:30:00', tipo: 'ONLINE' as const,
    status: 'PENDENTE' as const, prospects: 0, nenhuma: false,
    tangibilidades: [], dataValidacao: '',
  },
];

const CONEXOES = [
  {
    id: 1, geradoPorId: 1, geradoPorNome: 'Ana Paula Ferreira',
    receptorId: 2, receptorNome: 'Carlos Mendes',
    nomeContato: 'Marcelo Dias', telefoneContato: '(11) 98888-1111',
    empresaContato: 'Dias & Associados', tipo: 'QUENTE' as const,
    status: 'EM_ANDAMENTO' as const, valorNegocio: 8500, motivoNaoFechamento: '',
    dataCriacao: '2026-02-20', prazoEstourado: false,
  },
  {
    id: 2, geradoPorId: 1, geradoPorNome: 'Ana Paula Ferreira',
    receptorId: 3, receptorNome: 'Beatriz Costa',
    nomeContato: 'Patricia Rocha', telefoneContato: '(21) 97777-2222',
    empresaContato: 'Rocha Engenharia', tipo: 'MORNA' as const,
    status: 'FECHADA' as const, valorNegocio: 25000, motivoNaoFechamento: '',
    dataCriacao: '2026-01-15', prazoEstourado: false,
  },
  {
    id: 3, geradoPorId: 1, geradoPorNome: 'Ana Paula Ferreira',
    receptorId: 4, receptorNome: 'Roberto Alves',
    nomeContato: 'João Pires', telefoneContato: '(31) 96666-3333',
    empresaContato: 'Pires Tech', tipo: 'FRIA' as const,
    status: 'NAO_FECHADA' as const, valorNegocio: 0,
    motivoNaoFechamento: 'Sem orçamento no momento',
    dataCriacao: '2026-01-05', prazoEstourado: true,
  },
];

const CONEXOES_RECEBIDAS = [
  {
    id: 10, geradoPorId: 2, geradoPorNome: 'Carlos Mendes',
    receptorId: 1, receptorNome: 'Ana Paula Ferreira',
    nomeContato: 'Sandra Lima', telefoneContato: '(11) 95555-4444',
    empresaContato: 'Lima Consultoria', tipo: 'QUENTE' as const,
    status: 'NOVA' as const, valorNegocio: 0, motivoNaoFechamento: '',
    dataCriacao: '2026-03-08', prazoEstourado: false,
  },
  {
    id: 11, geradoPorId: 3, geradoPorNome: 'Beatriz Costa',
    receptorId: 1, receptorNome: 'Ana Paula Ferreira',
    nomeContato: 'Rodrigo Santos', telefoneContato: '(21) 94444-5555',
    empresaContato: 'Santos Obras', tipo: 'MORNA' as const,
    status: 'EM_ANDAMENTO' as const, valorNegocio: 12000, motivoNaoFechamento: '',
    dataCriacao: '2026-02-18', prazoEstourado: false,
  },
];

const PARCERIAS = [
  {
    id: 1, associado1Id: 1, associado1Nome: 'Ana Paula Ferreira',
    associado2Id: 2, associado2Nome: 'Carlos Mendes', dataParceria: '2026-02-10',
  },
  {
    id: 2, associado1Id: 1, associado1Nome: 'Ana Paula Ferreira',
    associado2Id: 3, associado2Nome: 'Beatriz Costa', dataParceria: '2026-03-01',
  },
];

const VISITANTES = [
  {
    id: 1, tipo: 'EXTERNO' as const, nomeCompleto: 'Lucas Vieira', cpf: '666.777.888-99',
    telefone: '(11) 93333-6666', email: 'lucas.v@email.com', profissao: 'Designer',
    equipeOrigemId: 0, equipeDestinoId: 1, dataVisita: '2026-03-12', validado: false,
  },
  {
    id: 2, tipo: 'INTERNO' as const, nomeCompleto: 'Juliana Torres', cpf: '777.888.999-00',
    telefone: '(21) 92222-7777', email: 'juliana.t@email.com', profissao: 'Advogada',
    equipeOrigemId: 2, equipeDestinoId: 1, dataVisita: '2026-03-12', validado: false,
  },
];

const PEEN_MODULOS = [
  {
    id: 1, titulo: 'Módulo 1 — Fundamentos do Networking', descricao: 'Aprenda as bases do networking eficaz.',
    urlPlataforma: 'https://plataforma.example.com/peen/1', duracaoHoras: 4, pontos: 5,
    concluido: true, dataConclusao: '2025-11-15',
  },
  {
    id: 2, titulo: 'Módulo 2 — Reuniões de Negócios', descricao: 'Técnicas para reuniões 1 a 1 produtivas.',
    urlPlataforma: 'https://plataforma.example.com/peen/2', duracaoHoras: 6, pontos: 5,
    concluido: false, dataConclusao: '',
  },
  {
    id: 3, titulo: 'Módulo 3 — Geração de Conexões', descricao: 'Como gerar e receber conexões estratégicas.',
    urlPlataforma: 'https://plataforma.example.com/peen/3', duracaoHoras: 5, pontos: 5,
    concluido: false, dataConclusao: '',
  },
];

const TEEN_EVENTOS = [
  {
    id: 1, titulo: 'Workshop de Apresentação Profissional',
    descricao: 'Aprenda a se apresentar de forma impactante.',
    dataEvento: '2026-04-05', local: 'Auditório Central — São Paulo',
    cargaHoraria: 8, pontos: 200, inscrito: true, presente: false,
  },
  {
    id: 2, titulo: 'Encontro Nacional C+C 2026',
    descricao: 'Maior evento do ano com palestrantes nacionais.',
    dataEvento: '2026-06-20', local: 'Centro de Convenções — São Paulo',
    cargaHoraria: 16, pontos: 400, inscrito: false, presente: false,
  },
];

// Indicadores corretos conforme especificação (3 colunas: Indicador, Ação, Acumulado)
const INDICADORES_SEMANAIS = [
  { nome: 'PEEN', meta: 1, realizado: 1, acumulado: 5, rotaAcao: '/educacional/peen', labelAcao: 'Acessar PEEN' },
  { nome: 'Reunião C+C', meta: 2, realizado: 2, acumulado: 2, rotaAcao: '/operacional/reunioes', labelAcao: 'Ver reuniões' },
  { nome: 'Conexões', meta: 1, realizado: 3, acumulado: 3, rotaAcao: '/operacional/conexoes/nova', labelAcao: 'Nova conexão' },
  { nome: 'NG (Negócios Gerados)', meta: 0, realizado: 1, acumulado: 33500, isMoney: true, rotaAcao: '/operacional/conexoes', labelAcao: 'Gerenciar' },
  { nome: 'Parcerias', meta: 0, realizado: 1, acumulado: 1, rotaAcao: '/operacional/parcerias/nova', labelAcao: 'Nova parceria' },
  { nome: 'NR (Negócios Recebidos)', meta: 0, realizado: 2, acumulado: 2 },
  { nome: 'Visitantes', meta: 0, realizado: 1, acumulado: 1, rotaAcao: '/operacional/visitantes/externo', labelAcao: 'Registrar' },
];

const EVOLUCAO = [
  { periodo: 'Jan/26', reunioes: 8, conexoes: 12, ng: 18, parcerias: 2, nr: 3, visitantes: 2, pontos: 340 },
  { periodo: 'Fev/26', reunioes: 9, conexoes: 10, ng: 22, parcerias: 1, nr: 4, visitantes: 3, pontos: 380 },
  { periodo: 'Mar/26', reunioes: 7, conexoes: 14, ng: 16, parcerias: 2, nr: 5, visitantes: 1, pontos: 360 },
];

// Pontuacao por performance de grupo (§2.2)
const PARAMETRIZACOES = [
  { id: 1, faixaMinima: 15, faixaMaxima: 24, pontuacao: 20 },
  { id: 2, faixaMinima: 25, faixaMaxima: 34, pontuacao: 22 },
  { id: 3, faixaMinima: 35, faixaMaxima: 44, pontuacao: 24 },
  { id: 4, faixaMinima: 45, faixaMaxima: 54, pontuacao: 26 },
  { id: 5, faixaMinima: 55, faixaMaxima: 64, pontuacao: 28 },
  { id: 6, faixaMinima: 65, faixaMaxima: 9999, pontuacao: 30 },
];

const PERFIL: import('./models/perfil-associado.model').PerfilAssociado = {
  id: 1, associadoId: 1, fotoUrl: '', nomeProfissional: 'Ana Paula Ferreira',
  nomeEmpresa: 'Ferreira Contabilidade', logomarcaUrl: '',
  exibirEnderecoComercial: false, telefonePrincipal: '(11) 91234-5678',
  telefoneSecundario: '', emailPrincipal: 'ana.paula@email.com',
  site: 'https://ferreiracontabilidade.com.br', linkedin: 'https://linkedin.com/in/anapaula',
  instagram: '', youtube: '', outraRedeSocial: '',
  oQueEuFaco: 'Auxiliamos empresas e pessoas físicas com contabilidade, impostos e planejamento financeiro.',
  publicoIdeal: 'Empreendedores e profissionais liberais que buscam organização financeira.',
  principalProblemaQueResolvo: 'Regularização fiscal e redução de carga tributária.',
  conexoesEstrategicas: 'Advogados, consultores financeiros, gestores de RH.',
  interessesPessoais: 'Leitura, corrida, viagens.',
  clusterNome: 'Negócios', atuacaoEspecificaNome: 'Contabilidade',
  equipeNome: 'C+C Águia', status: 'ATIVO',
  dataIngresso: '2024-02-01', vencimento: '2025-03-01',
};

const SEGURO: import('./models/cadastro-seguro.model').CadastroSeguro = {
  id: 1, associadoId: 1, nacionalidade: 'Brasileira', rgNumero: '12.345.678-9',
  rgOrgaoEmissor: 'SSP', rgUf: 'SP', estadoCivil: 'CASADO',
  profissaoSecuritaria: 'Contadora', editavel: false,
  lgpdDataAceite: '2024-02-01T10:00:00',
  beneficiarios: [
    { id: 1, nomeCompleto: 'Pedro Ferreira', cpf: '888.999.000-11', grauParentesco: 'CONJUGE', dataNascimento: '1985-06-20', percentual: 100, telefone: '(11) 99999-0000' },
  ],
  contatoEmergencia: { id: 1, nomeCompleto: 'Maria Ferreira', grauRelacionamento: 'MAE', telefonePrincipal: '(11) 98888-0001', telefoneSecundario: '' },
};

// -----------------------------------------------------------
// Providers de mock (substitui todos os services reais)
// -----------------------------------------------------------
export const DEV_MOCK_PROVIDERS = [

  {
    provide: AssociadoService,
    useValue: {
      listar: () => ok([...ASSOCIADOS]),
      buscarPorId: (id: number) => ok(ASSOCIADOS.find(a => a.id === id) ?? ASSOCIADOS[0]),
      criar: (data: unknown) => ok({ ...ASSOCIADOS[0], ...data as object, id: 99 }, 'Associado criado'),
      editar: (id: number, data: unknown) => ok({ ...ASSOCIADOS[0], ...data as object, id }, 'Associado atualizado'),
      alterarStatus: (id: number) => ok({ ...ASSOCIADOS[0], id }, 'Status alterado'),
      buscarParaSelect: (query: string) => ok(
        ASSOCIADOS
          .filter(a => a.nomeCompleto.toLowerCase().includes(query.toLowerCase()) || a.cpf.includes(query))
          .map(a => ({ id: a.id, nomeCompleto: a.nomeCompleto, cpf: a.cpf }))
      ),
    },
  },

  {
    provide: AnuidadeService,
    useValue: {
      listarPorAssociado: () => ok([
        { id: 1, tipo: 'PRIMEIRA', statusPagamento: 'PAGO', dataPagamento: '2024-03-05', vencimentoGerado: '2025-03-01' },
        { id: 2, tipo: 'RENOVACAO', statusPagamento: 'AGUARDANDO', dataPagamento: '', vencimentoGerado: '2026-03-01' },
      ]),
      renovar: (_id: number, data: unknown) => ok({ id: 3, tipo: 'RENOVACAO', ...data as object }, 'Anuidade renovada'),
    },
  },

  {
    provide: AssociadoCargoService,
    useValue: {
      listarPorAssociado: () => ok([
        { id: 1, cargoId: 1, cargoNome: 'Presidente', dataInicio: '2025-01-01', dataFim: '' },
      ]),
      vincular: (_id: number, data: unknown) => ok({ id: 99, ...data as object }, 'Cargo vinculado'),
      encerrar: (id: number) => ok({ id }, 'Cargo encerrado'),
    },
  },

  {
    provide: AssociadoGrupamentoService,
    useValue: {
      listarPorAssociado: () => ok([
        { id: 1, grupamentoId: 1, grupamentoNome: 'Civil e Liderança', grupamentoSigla: 'CIVL' },
      ]),
      vincular: (_id: number, grupamentoId: number) =>
        ok({ id: 99, grupamentoId, grupamentoNome: 'Civil e Liderança', grupamentoSigla: 'CIVL' }, 'Vinculado'),
      desvincular: () => ok(null, 'Desvinculado'),
    },
  },

  {
    provide: AtuacaoEspecificaService,
    useValue: {
      listarPorCluster: (clusterId: number) => ok(ATUACOES.filter(a => a.clusterId === clusterId && a.ativo)),
      buscarPorId: (id: number) => ok(ATUACOES.find(a => a.id === id) ?? ATUACOES[0]),
      criar: (data: unknown) => ok({ ...ATUACOES[0], ...data as object, id: 99 }, 'Atuação criada'),
      editar: (id: number, data: unknown) => ok({ ...ATUACOES[0], ...data as object, id }, 'Atuação atualizada'),
      alterarStatus: (id: number, ativo: boolean) => ok({ ...ATUACOES[0], id, ativo }, 'Status alterado'),
    },
  },

  {
    provide: CadastroSeguroService,
    useValue: {
      buscar: () => ok(SEGURO),
      criar: (_id: number, data: unknown) => ok({ ...SEGURO, ...data as object }, 'Cadastro salvo'),
      listarSolicitacoes: () => ok([
        { id: 1, associadoId: 1, justificativa: 'Alteração de beneficiário', protocolo: 'SOL-2026-001', status: 'SOLICITADO', dataSolicitacao: nowIso(), dataResolucao: '', responsavelResolucaoId: 0 },
      ]),
      criarSolicitacao: (_id: number, justificativa: string) =>
        ok({ id: 99, associadoId: 1, justificativa, protocolo: 'SOL-2026-099', status: 'SOLICITADO', dataSolicitacao: nowIso(), dataResolucao: '', responsavelResolucaoId: 0 }, 'Solicitação criada'),
      resolverSolicitacao: () => ok(null, 'Solicitação resolvida'),
    },
  },

  {
    provide: CargoLiderancaService,
    useValue: {
      listarAtivos: () => ok(CARGOS.filter(c => c.ativo)),
      buscarPorId: (id: number) => ok(CARGOS.find(c => c.id === id) ?? CARGOS[0]),
      criar: (data: unknown) => ok({ ...CARGOS[0], ...data as object, id: 99 }, 'Cargo criado'),
      editar: (id: number, data: unknown) => ok({ ...CARGOS[0], ...data as object, id }, 'Cargo atualizado'),
      alterarStatus: (id: number, ativo: boolean) => ok({ ...CARGOS[0], id, ativo }, 'Status alterado'),
    },
  },

  {
    provide: ClusterService,
    useValue: {
      listarAtivos: () => ok(CLUSTERS.filter(c => c.ativo)),
      buscarPorId: (id: number) => ok(CLUSTERS.find(c => c.id === id) ?? CLUSTERS[0]),
      criar: (data: unknown) => ok({ ...CLUSTERS[0], ...data as object, id: 99 }, 'Cluster criado'),
      editar: (id: number, data: unknown) => ok({ ...CLUSTERS[0], ...data as object, id }, 'Cluster atualizado'),
      alterarStatus: (id: number, ativo: boolean) => ok({ ...CLUSTERS[0], id, ativo }, 'Status alterado'),
    },
  },

  {
    provide: ConexaoService,
    useValue: {
      listarGeradas: () => ok([...CONEXOES]),
      listarRecebidas: () => ok([...CONEXOES_RECEBIDAS]),
      criar: (data: unknown) => ok({ ...CONEXOES[0], ...data as object, id: 99 }, 'Conexão registrada'),
      atualizar: (id: number, data: unknown) => ok({ ...CONEXOES[0], ...data as object, id }, 'Conexão atualizada'),
      excluir: () => ok(null, 'Conexão excluída'),
    },
  },

  {
    provide: EducacionalService,
    useValue: {
      listarPeen: () => ok([...PEEN_MODULOS]),
      validarPeen: (id: number) => ok({ ...PEEN_MODULOS[0], id, concluido: true, dataConclusao: nowIso() }, 'Módulo validado'),
      listarTeen: () => ok([...TEEN_EVENTOS]),
      inscreverTeen: (id: number) => ok({ ...TEEN_EVENTOS[0], id, inscrito: true }, 'Inscrição realizada'),
    },
  },

  {
    provide: EquipeService,
    useValue: {
      listar: () => ok([...EQUIPES]),
      buscarPorId: (id: number) => ok(EQUIPES.find(e => e.id === id) ?? EQUIPES[0]),
      criar: (data: unknown) => ok({ ...EQUIPES[0], ...data as object, id: 99 }, 'Equipe criada'),
      editar: (id: number, data: unknown) => ok({ ...EQUIPES[0], ...data as object, id }, 'Equipe atualizada'),
      lancar: (id: number) => ok({ ...EQUIPES[0], id, status: 'ATIVA', dataEfetivaLancamento: nowIso() }, 'Equipe lançada'),
      listarDiretores: () => ok([
        { id: 1, associadoId: 1, associadoNome: 'Ana Paula Ferreira', dataInicio: '2025-01-01', dataFim: '' },
      ]),
      vincularDiretor: (equipeId: number, data: unknown) => ok({ id: 99, ...data as object, equipeId }, 'Diretor vinculado'),
      encerrarDiretor: () => ok(null, 'Encerrado'),
      listarCargosAtivos: () => ok([
        { id: 1, cargoId: 1, cargoNome: 'Presidente' },
        { id: 2, cargoId: 3, cargoNome: 'Diretor de Marketing' },
      ]),
      ativarCargo: (equipeId: number, cargoId: number) => ok({ id: 99, cargoId, cargoNome: 'Cargo Ativado', equipeId }, 'Cargo ativado'),
      listarDesignacoes: () => ok([
        { id: 1, cargoAtivoEquipeId: 1, cargoNome: 'Presidente', associadoId: 1, associadoNome: 'Ana Paula Ferreira', dataInicio: '2025-01-01', dataFim: '' },
      ]),
      criarDesignacao: (_id: number, data: unknown) => ok({ id: 99, ...data as object }, 'Designação criada'),
      listarCiclos: () => ok([
        { id: 1, numeroReuniao: 48, dataReuniao: '2026-03-11', dataInicioCiclo: '2026-03-10', dataEncerramentoCiclo: '2026-03-16', mesCompetencia: 3, anoCompetencia: 2026, tipoReuniao: 'PRESENCIAL' },
        { id: 2, numeroReuniao: 47, dataReuniao: '2026-03-04', dataInicioCiclo: '2026-03-03', dataEncerramentoCiclo: '2026-03-09', mesCompetencia: 3, anoCompetencia: 2026, tipoReuniao: 'PRESENCIAL' },
      ]),
      gerarProximoCiclo: () => ok({ id: 3, numeroReuniao: 49, dataReuniao: '2026-03-18', dataInicioCiclo: '2026-03-17', dataEncerramentoCiclo: '2026-03-23', mesCompetencia: 3, anoCompetencia: 2026, tipoReuniao: 'PRESENCIAL' }, 'Ciclo gerado'),
    },
  },

  {
    provide: EmpresaService,
    useValue: {
      buscarPorAssociado: () => ok({ id: 1, cnpj: '12.345.678/0001-90', razaoSocial: 'Ferreira Contabilidade Ltda' }),
      salvar: (_id: number, data: unknown) => ok({ id: 99, ...data as object }, 'Empresa salva'),
      editar: (_associadoId: number, id: number, data: unknown) => ok({ id, ...data as object }, 'Empresa atualizada'),
    },
  },

  {
    provide: EnderecoService,
    useValue: {
      listarPorAssociado: () => ok([
        { id: 1, tipo: 'RESIDENCIAL', rua: 'Rua das Flores', numero: '123', complemento: 'Apto 4B', bairro: 'Jardim Paulista', cidade: 'São Paulo', estado: 'SP', cep: '01310-100', visivelParaRede: false },
        { id: 2, tipo: 'COMERCIAL', rua: 'Av. Paulista', numero: '1000', complemento: '10º andar', bairro: 'Bela Vista', cidade: 'São Paulo', estado: 'SP', cep: '01310-200', visivelParaRede: true },
      ]),
      criar: (_id: number, data: unknown) => ok({ id: 99, ...data as object }, 'Endereço salvo'),
      editar: (_associadoId: number, id: number, data: unknown) => ok({ id, ...data as object }, 'Endereço atualizado'),
      excluir: () => ok(null, 'Endereço excluído'),
    },
  },

  {
    provide: GrupamentoEstrategicoService,
    useValue: {
      listarAtivos: () => ok(GRUPAMENTOS.filter(g => g.ativo)),
      buscarPorId: (id: number) => ok(GRUPAMENTOS.find(g => g.id === id) ?? GRUPAMENTOS[0]),
      criar: (data: unknown) => ok({ ...GRUPAMENTOS[0], ...data as object, id: 99 }, 'Grupamento criado'),
      editar: (id: number, data: unknown) => ok({ ...GRUPAMENTOS[0], ...data as object, id }, 'Grupamento atualizado'),
      alterarStatus: (id: number, ativo: boolean) => ok({ ...GRUPAMENTOS[0], id, ativo }, 'Status alterado'),
    },
  },

  {
    provide: HorarioReuniaoService,
    useValue: {
      listarAtivos: () => ok(HORARIOS.filter(h => h.ativo)),
      buscarPorId: (id: number) => ok(HORARIOS.find(h => h.id === id) ?? HORARIOS[0]),
      criar: (data: unknown) => ok({ ...HORARIOS[0], ...data as object, id: 99 }, 'Horário criado'),
      editar: (id: number, data: unknown) => ok({ ...HORARIOS[0], ...data as object, id }, 'Horário atualizado'),
      alterarStatus: (id: number, ativo: boolean) => ok({ ...HORARIOS[0], id, ativo }, 'Status alterado'),
    },
  },

  {
    provide: PainelService,
    useValue: {
      semanal: () => ok([...INDICADORES_SEMANAIS]),
      evolucaoIndividual: () => ok([...EVOLUCAO]),
      performanceEquipe: () => ok([...EVOLUCAO]),
    },
  },

  {
    provide: ParceriaService,
    useValue: {
      listar: () => ok([...PARCERIAS]),
      registrar: (associado2Id: number) =>
        ok({ id: 99, associado1Id: 1, associado1Nome: 'Ana Paula Ferreira', associado2Id, associado2Nome: 'Novo Parceiro', dataParceria: nowIso() }, 'Parceria registrada'),
    },
  },

  {
    provide: ParametrizacaoPontuacaoService,
    useValue: {
      listarTodas: () => ok([...PARAMETRIZACOES]),
      buscarPorId: (id: number) => ok(PARAMETRIZACOES.find(p => p.id === id) ?? PARAMETRIZACOES[0]),
      criar: (data: unknown) => ok({ ...PARAMETRIZACOES[0], ...data as object, id: 99 }, 'Parametrização criada'),
      editar: (id: number, data: unknown) => ok({ ...PARAMETRIZACOES[0], ...data as object, id }, 'Parametrização atualizada'),
      excluir: () => ok(null, 'Parametrização excluída'),
    },
  },

  {
    provide: PerfilAssociadoService,
    useValue: {
      buscar: () => ok({ ...PERFIL }),
      salvar: (_id: number, data: unknown) => ok({ ...PERFIL, ...data as object }, 'Perfil salvo'),
      uploadFoto: () => ok({ url: 'https://placehold.co/120x120' }, 'Foto enviada'),
      uploadLogomarca: () => ok({ url: 'https://placehold.co/200x80' }, 'Logomarca enviada'),
    },
  },

  {
    provide: ReuniaoService,
    useValue: {
      listar: () => ok([...REUNIOES]),
      buscarPorId: (id: number) => ok(REUNIOES.find(r => r.id === id) ?? REUNIOES[0]),
      agendar: (data: unknown) => ok({ ...REUNIOES[0], ...data as object, id: 99 }, 'Reunião agendada'),
      adiar: (id: number, data: unknown) => ok({ ...REUNIOES[0], id, ...data as object, status: 'ADIADA' }, 'Reunião adiada'),
      cancelar: (id: number) => ok({ ...REUNIOES[0], id, status: 'CANCELADA' }, 'Reunião cancelada'),
      validar: (id: number, data: unknown) => ok({ ...REUNIOES[0], id, ...data as object, status: 'REALIZADA', dataValidacao: new Date().toISOString() }, 'Reunião validada'),
    },
  },

  {
    provide: VisitanteService,
    useValue: {
      listarPendentes: () => ok([...VISITANTES]),
      registrarExterno: (data: unknown) => ok({ ...VISITANTES[0], ...data as object, id: 99 }, 'Visitante registrado'),
      registrarInterno: (data: unknown) => ok({ ...VISITANTES[1], ...data as object, id: 99 }, 'Visitante registrado'),
      registrarSubstituto: (data: unknown) => ok({ ...VISITANTES[0], tipo: 'SUBSTITUTO', ...data as object, id: 99 }, 'Substituto registrado'),
      validar: (id: number) => ok({ ...VISITANTES[0], id, validado: true }, 'Visita validada'),
    },
  },
];
