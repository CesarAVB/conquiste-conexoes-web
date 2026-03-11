Manual de Regras de Negócio: Ecossistema Conquiste + Conexões (C+C)

Este documento estabelece as diretrizes de governança corporativa, arquitetura de processos e regras sistêmicas do Ecossistema Conquiste + Conexões (C+C). Sua aplicação é mandatória para o desenvolvimento de software, administração de rede e conduta dos associados.


--------------------------------------------------------------------------------


1. Definição Estrutural do Ecossistema C+C

A arquitetura do ecossistema baseia-se em critérios de alocação técnica e hierarquia de mercado para garantir a integridade da rede e evitar conflitos de interesse.

1.1 Classificação de Equipes (Ingresso do Associado)

O associado é classificado no ato da ativação quanto à sua linha de ingresso:

* Original: Ocorre quando o associado ingressa na linha matriz/equipe para a qual se candidatou inicialmente.
* Colaborativa: Ocorre quando o associado é direcionado para uma equipe diferente da original, devido à ocupação prévia de sua especialidade técnica na equipe pretendida.

Regra de Governança: Qualquer alteração no campo "Equipe de Origem" exige obrigatoriamente um registro de Log de Auditoria, contendo data, hora e o responsável pela modificação.

1.2 Hierarquia de Mercado (Cluster e Atuação)

O sistema opera em uma relação hierárquica de 1:N entre o setor macro e a especialidade técnica:

* Cluster (Setor de Mercado): Grande segmento econômico (ex: Saúde, Construção).
* Atuação Específica: Profissão ou área técnica dependente do Cluster (ex: Nutrição Clínica vinculado ao Cluster Saúde).
* Restrição Sistêmica: A interface do usuário (UI) deve forçar a seleção encadeada. Ao selecionar um Cluster, o sistema deve ocultar atuações não vinculadas, impedindo inconsistências no banco de dados.

1.3 Grupamentos Estratégicos (GR)

Os grupamentos (ex: CIVL, SAIN, IMOB) são esferas de conexão transversais. A vinculação a um GR é independente do Cluster e da Atuação Específica e deve ser identificada por uma sigla de 4 caracteres no sistema.


--------------------------------------------------------------------------------


2. Governança, Identidade e Performance de Equipes

2.1 Critérios de Nomenclatura e Formação

A criação de novas unidades no banco de dados deve seguir regras impeditivas:

* Prefixo Mandatório: Todo nome de equipe deve obrigatoriamente iniciar com "C+C".
* Limite de Caracteres: Máximo de 20 caracteres, incluindo o prefixo.
* Unicidade: O sistema deve bloquear a criação de nomes duplicados no banco de dados.
* Cálculo de Lançamento: A "Data de Previsão de Lançamento" é calculada somando-se 63 dias (9 semanas) à "Data de Início da Formação". Caso a data de início seja alterada, o sistema deve recalcular automaticamente a previsão e gerar Log.

2.2 Pontuação por Performance de Grupo

A pontuação mensal da equipe é calculada com base na quantidade de associados ativos:

Quantidade de Associados	Pontuação Mensal Correspondente
15 a 24 associados	20 pontos
25 a 34 associados	22 pontos
35 a 44 associados	24 pontos
45 a 54 associados	26 pontos
55 a 64 associados	28 pontos
65 ou mais associados	30 pontos

Regra de Parametrização: A ADM C+C deve possuir uma "Tabela de Parametrização" dedicada para editar estas faixas e pontuações. Alterações nesta tabela não devem retroagir sobre o histórico de pontuações já consolidadas.


--------------------------------------------------------------------------------


3. Diretrizes de Reuniões e Ciclo Operacional

3.1 Logística e Modelo Híbrido Automático

As reuniões ocorrem de terça a sexta-feira, em horários fixos determinados pela ADM C+C. O formato alterna-se automaticamente conforme o calendário:

* 1ª e 3ª ocorrências do dia da semana no mês: Reunião Presencial. O App deve exibir automaticamente o endereço físico.
* 2ª, 4ª e 5ª ocorrências: Reunião Online (Zoom). O App deve exibir automaticamente o link de acesso.
* Automação: A lógica de exibição deve ser nativa do sistema, sem necessidade de intervenção manual da liderança para alternar local/link.

3.2 Gestão de Ciclo e Competência

* Ciclo Semanal: Inicia às 00:00 do dia da reunião anterior e encerra às 23:59 da véspera da reunião atual.
* Mês de Competência: Definido exclusivamente pela Data de Encerramento do Ciclo.
* Processamento de Dados: Nenhuma alteração de status ou indicador de performance é automática; todos dependem do fechamento do ciclo às 23:59 da data correspondente.


--------------------------------------------------------------------------------


4. Estados do Associado, Visibilidade e Privacidade

A condição do associado no sistema dita seu nível de acesso e como a rede o visualiza.

4.1 Tabela de Status e Permissões

Status	Acesso ao App	Visibilidade na Rede	Observação Técnica
Pré-Ativo	Restrito ao perfil	Sim	Aguardando lançamento ou aprovação.
Ativo	Integral	Sim	Pertence a grupo oficialmente lançado.
Inativo (Pausa)	Apenas Visualização	Sim	Afastamento temporário com data de retorno.
Inativo (Desistência)	Bloqueado	Não	Saída voluntária.
Inativo (Desligado)	Bloqueado	Não	Decisão administrativa (motivo obrigatório).
Inativo (Falecimento)	Bloqueado	Não	Gera alerta de protocolo de seguro.

4.2 Governança de Dados e LGPD

Para conformidade com a LGPD e respeito a diversidades religiosas/pessoais, o sistema deve disponibilizar:

* Toggles de Privacidade: Botões de permissão para que o associado decida se sua Data de Nascimento (Dia/Mês) e Endereço Comercial ficarão visíveis para a rede.
* Vínculo do Padrinho: É obrigatório identificar o padrinho de todo novo associado via Nome e CPF, garantindo a integridade do banco de dados e rastreabilidade de indicações.


--------------------------------------------------------------------------------


5. Indicadores Educacionais: TEEN e PEEN

5.1 PEEN (Pontuação Educacional Online)

Operado via API integrada à plataforma de educação.

* Regra: 1 módulo concluído = 5 pontos.
* Validação: A pontuação só é computada se o nível de assertividade no questionário atingir o mínimo parametrizado.

5.2 TEEN (Treinamento de Educação Empresarial)

Refere-se a eventos síncronos ou presenciais.

* Validação: Inscrição prévia e confirmação de presença via leitura de QR Code ou lista física.
* Pontuação: Variável conforme carga horária, editada exclusivamente pela ADM C+C.


--------------------------------------------------------------------------------


6. Protocolos Críticos e Regras de Gestão

Gestão de Anuidades: Independentemente do dia do ingresso, o vencimento é fixado no dia 1º do mês seguinte do ano subsequente. A renovação deve manter sempre o padrão do dia 1º.

Botão de Renovação: Ferramenta exclusiva da ADM C+C. A ativação exige confirmação de auditoria financeira e gera obrigatoriamente um registro de log com data, hora e responsável.

Classificação de Liderança (Isento vs. Normal): Certos cargos (Diretores, ADM) podem ser classificados como Isento. Associados isentos não pagam anuidade e não estão sujeitos à obrigatoriedade da metodologia. Esta classificação deve ser ocultada do App e dos demais associados, sendo visível apenas para a ADM C+C.

Protocolo de Seguro (Alerta Nível 1): A alteração do status para "Inativo – Falecimento" deve disparar um Alerta Prioritário Nível 1 imediato para a ADM C+C, visando o acionamento do protocolo de Seguro de Vida e Funeral.
