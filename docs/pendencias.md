# Pendências Frontend — Conquiste + Conexões (C+C)

> Última atualização: Março/2026

---

## Status Geral

| Bloco | Descrição | Status |
|-------|-----------|--------|
| F0 | Setup, Layout, Auth, Shared Components | ✅ Concluído |
| F1 | CRUDs Admin (Tabelas Base) + Dashboard | ✅ Concluído |
| F2 | Gestão de Associados | ❌ Pendente |
| F3 | Gestão de Equipes | ❌ Pendente |
| F4 | Cadastro de Seguro (Fase 2) | ❌ Pendente |
| F5 | Perfil C+C (Fase 3) | ❌ Pendente |
| F6 | Módulos Operacionais | ❌ Pendente |

---

## Bloco F2 — Gestão de Associados

### Componentes pendentes

**associado-list** (listagem)
- Tabela com dados principais (nome, CPF, email, status, equipe, cluster)
- Filtros por: status, equipe, cluster
- Busca por nome ou CPF
- Badge de status com cores por tipo
- Botões: ver detalhes, editar, alterar status
- Paginação (avaliar necessidade)

**associado-form** (cadastro/edição)
- Formulário com todos os campos da Fase 1
- Select encadeado: Cluster → Atuação Específica
- Select de padrinho (busca por CPF ou nome)
- Select de equipe atual e equipe origem
- Select de tipo origem (Original/Colaborativa)
- Máscara para CPF
- Validações nos campos obrigatórios

**associado-detail** (visualização completa)
- Exibição de todos os dados do associado
- Abas ou seções para: Dados Pessoais, Endereços, Empresa, Cargos, Grupamentos, Anuidades, Histórico de Status
- Botões de ação rápida (editar, alterar status, renovar anuidade)

**associado-status** (alteração de status)
- Modal ou tela para alterar status
- Campos condicionais: motivo (desistência/desligamento), datas de pausa (pausa programada)
- Select do responsável pela alteração

**associado-enderecos** (gestão de endereços)
- Listagem de endereços (residencial e comercial)
- Formulário para criar/editar endereço
- Toggle de visibilidade para rede (endereço comercial)

**associado-empresa** (gestão da empresa)
- Formulário de criação/edição
- Máscara para CNPJ
- Validação de unicidade

**associado-cargos** (gestão de cargos)
- Listagem de cargos vinculados (ativos e histórico)
- Formulário para vincular novo cargo com datas de vigência
- Botão para encerrar vínculo (definir data fim)

**associado-grupamentos** (gestão de grupamentos)
- Listagem de grupamentos vinculados com sigla
- Select para vincular novo grupamento
- Botão para desvincular

**associado-anuidades** (gestão de anuidades)
- Listagem de anuidades (primeira + renovações)
- Formulário de renovação com status de pagamento
- Exibição do vencimento atual

### Services pendentes
- AssociadoService (já criado na estrutura, falta implementar)
- EnderecoService
- EmpresaService
- AssociadoCargoService (usar CargoLiderancaService existente para selects)
- AssociadoGrupamentoService (usar GrupamentoEstrategicoService existente para selects)
- AnuidadeService

---

## Bloco F3 — Gestão de Equipes

### Componentes pendentes

**equipe-list** (listagem)
- Tabela com nome, status, dia reunião, horário, componentes
- Filtro por status (Em Formação, Ativa, Inativa)
- Badge de status com cores

**equipe-form** (cadastro/edição)
- Nome (prefixo C+C validado)
- Data início formação (previsão de lançamento calculada automaticamente)
- Select dia da reunião (Terça a Sexta)
- Select horário da reunião
- Select modelo de reunião
- Campo link Zoom
- Formulário de endereço da reunião presencial embutido

**equipe-detail** (visualização completa)
- Dados gerais da equipe
- Info da próxima reunião (presencial ou online, com local/link)
- Abas: Diretores, Cargos Ativos, Designações, Ciclos Semanais
- Contador de componentes
- Botão de lançamento (com validação de mínimo 15 ativos)

**equipe-diretores** (gestão de diretores)
- Seções separadas: Diretores de Território e Diretores de Equipe
- Formulário para vincular (select de associado + datas)
- Listagem com vigência

**equipe-cargos** (cargos ativos na equipe)
- Listagem de cargos ativados
- Select para ativar novo cargo (a partir do banco de cargos)

**equipe-designacoes** (designação de liderança)
- Listagem de designações (cargo → associado → vigência)
- Formulário: select cargo ativo + select associado + datas
- Validação: só permite cargos previamente ativados

**equipe-ciclos** (ciclos semanais)
- Listagem de ciclos com número da reunião, data, tipo (presencial/online)
- Botão para gerar próximo ciclo
- Exibição do mês de competência

### Services pendentes
- EquipeService (já criado na estrutura, falta implementar)

---

## Bloco F4 — Cadastro de Seguro (Fase 2)

### Componentes pendentes

**seguro-form** (cadastro completo)
- Seção dados pessoais: nacionalidade, RG, estado civil, profissão
- Seção beneficiários: formulário dinâmico (1 ou 2 beneficiários)
  - Validação de percentual: 1 beneficiário = 100% fixo, 2 = soma 100%
  - Máscara para CPF do beneficiário
- Seção contato de emergência
- Seção LGPD: 3 checkboxes obrigatórios com registro de data/hora/IP
- Bloqueio de campos após salvar
- Transição automática para Fase 3 (Perfil) após salvar

**seguro-view** (visualização)
- Exibição de todos os dados do seguro (somente leitura)
- Badge informando se está editável ou bloqueado
- Botão "Solicitar Alteração de Beneficiário"

**solicitacao-list** (listagem de solicitações)
- Listagem com protocolo, status, data, responsável
- Badges de status com cores (Solicitado, Em Análise, Aprovado, Rejeitado)
- Filtro por status

**solicitacao-form** (nova solicitação / resolução)
- Para associado: campo de justificativa + botão enviar
- Para ADM C+C: botões Aprovar/Rejeitar + select responsável

### Services pendentes
- CadastroSeguroService (já criado na estrutura, falta implementar)

---

## Bloco F5 — Perfil C+C (Fase 3)

### Componentes pendentes

**perfil-form** (criação/edição)
- Todos os campos do perfil com contadores de caracteres
- Upload de foto profissional (preview antes de salvar)
- Upload de logomarca (preview antes de salvar)
- Toggle exibir endereço comercial
- Campos automáticos (somente leitura): Cluster, Atuação, Equipe, Status, Ingresso, Vencimento
- Campos de redes sociais opcionais

**perfil-view** (visualização pública)
- Layout tipo cartão profissional
- Foto + logomarca
- Dados do perfil organizados por seções
- Campos automáticos da Fase 1 exibidos
- Responsivo (card adaptável para mobile)

### Services pendentes
- PerfilAssociadoService (já criado na estrutura, falta implementar)

---

## Bloco F6 — Módulos Operacionais

Este é o bloco mais extenso. Está dividido em 7 sub-blocos.

### F6A — Reunião C+C (entre associados)

**Componentes a criar:**
- reuniao-agendar (agendamento com busca de associado)
- reuniao-list (listagem de reuniões pendentes/validadas)
- reuniao-validar (validação unilateral com prospects + tangibilidade)
- reuniao-detalhe (detalhes da reunião)

**Funcionalidades:**
- Busca de associados com filtros (equipe, cluster, estado, cidade)
- Agendamento com data/hora e tipo (presencial/online)
- Adiamento/cancelamento com justificativa (antecedência mínima 4h)
- Validação unilateral com registro de prospects (0-3)
- Checkbox "nenhuma possibilidade"
- Campo tangibilidade (mínimo 1 opção de 11)
- Prazo de 21 dias para validação
- Geração de 5 pontos ao validar

### F6B — Conexões (Geradas e Recebidas)

**Componentes a criar:**
- conexao-nova (registro de conexão)
- conexao-geradas (painel negócios gerados)
- conexao-recebidas (painel negócios recebidos)

**Funcionalidades:**
- Registro com tipo (Quente/Morna/Fria)
- Dados do contato (manual ou importação)
- Status: Nova → Em Andamento → Fechada/Não Fechada
- Valor do negócio ao fechar
- Motivo obrigatório ao não fechar
- Badge "Prazo Estourado" após 90 dias
- Exclusão permitida apenas enquanto Nova
- Reflexo automático entre painéis

### F6C — Parcerias

**Componentes a criar:**
- parceria-nova (registro)
- parceria-list (histórico)

**Funcionalidades:**
- Select de associado (autocomplete)
- Registro simples (sem valor, sem justificativa)
- 5 pontos automáticos para cada
- Evitar duplicidade no mesmo dia

### F6D — Visitantes

**Componentes a criar:**
- visitante-externo-form (cadastro de convidado)
- visita-interna-form (associado visitando outra equipe)
- substituto-form (associado ou externo)
- visitante-validacao (validação pelo diretor)

**Funcionalidades:**
- Tela de escolha de modalidade (externo/interno/substituto)
- Filtros por estado → equipe
- Data da visita baseada na reunião corrente
- Cadastro completo para visitante externo
- Sem dados adicionais para visita interna
- Validação pelo diretor após término da reunião

### F6E — Educacional (PEEN / TEEN)

**Componentes a criar:**
- peen-modulos (listagem de módulos online)
- teen-eventos (listagem de eventos presenciais)
- teen-inscricao (inscrição em evento)

**Funcionalidades:**
- PEEN: botão de acesso à plataforma, validação via API, 5 pts/módulo
- TEEN: listagem de eventos, inscrição, validação por presença/QR Code
- Pontuação variável por tipo e carga horária

### F6F — Painéis e Indicadores

**Componentes a criar:**
- painel-semanal (indicadores da semana)
- painel-evolucao (evolução individual: 1 mês / 6 meses / total)
- painel-equipe (performance da equipe: mês / 3 meses / total)

**Funcionalidades:**
- 7 indicadores: PEEN, Reunião C+C, Conexões, NG, Parcerias, NR, Visitantes
- Coluna Indicador + Ação + Acumulado da Semana
- Abas com períodos (janela móvel, não mês fixo)
- Dados passivos (sem botões de ação)
- Gráficos opcionais para evolução

### F6G — Relatórios

**Componentes a criar:**
- relatorio-presenca (lista de associados + presença)
- relatorio-conquistas (conquistas da semana)

**Funcionalidades:**
- Relatório de Presença: cabeçalho da equipe + tabela ordenada por GR + nome
- Relatório de Conquistas: conexões (blocos), NG, parcerias (blocos), NR (blocos com valor), visitantes
- Frases automáticas do sistema
- Totalização automática
- Formato para visualização e impressão (PDF/A4)
- Biblioteca de geração de PDF (avaliar: jsPDF, html2canvas, ou gerar no backend)

---

## Pendências Técnicas Gerais

### Autenticação JWT
- Integrar AuthService com endpoint real de login do backend
- Implementar refresh token
- Tratar token expirado no interceptor (redirect para login)
- Proteger rotas por role (ADM_CC, DIRETOR, ASSOCIADO)

### Upload de Arquivos
- Definir estratégia (S3, filesystem, etc.)
- Criar componente reutilizável de upload com preview
- Integrar com endpoints de foto e logomarca do Perfil

### Paginação
- Avaliar necessidade nas listagens de associados e equipes
- Implementar paginação server-side se necessário

### Dashboard Completo
- Substituir cards de atalho por indicadores reais
- Contadores dinâmicos (total associados, equipes, etc.)
- Gráficos de performance (opcional)

### Notificações
- Avaliar integração com WebSocket para notificações em tempo real
- Notificações de solicitação de alteração de beneficiário
- Notificações de reunião C+C pendente

### Responsividade
- Testar e ajustar todos os componentes em mobile e tablet
- Menu hamburger funcional no mobile
- Tabelas com scroll horizontal em telas pequenas

---

## Ordem Sugerida de Implementação

```
F2 — Associados (componentes + services)
 │
 ├── associado-list
 ├── associado-form
 ├── associado-detail
 │     ├── associado-enderecos
 │     ├── associado-empresa
 │     ├── associado-cargos
 │     ├── associado-grupamentos
 │     ├── associado-anuidades
 │     └── associado-status
 │
 ▼
F3 — Equipes (componentes + services)
 │
 ├── equipe-list
 ├── equipe-form
 ├── equipe-detail
 │     ├── equipe-diretores
 │     ├── equipe-cargos
 │     ├── equipe-designacoes
 │     └── equipe-ciclos
 │
 ▼
F4 — Seguro
 │
 ▼
F5 — Perfil
 │
 ▼
F6A → F6B → F6C → F6D → F6E → F6F → F6G
```