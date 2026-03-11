# Conquiste + Conexões — Web

Aplicação web do ecossistema **Conquiste + Conexões (C+C)** — plataforma de gestão de networking estruturado para associados, equipes e conexões de negócios.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Angular 20 (standalone components) |
| Linguagem | TypeScript 5.9 (strict mode) |
| Estilo | SCSS + Bootstrap 5.3 |
| Notificações | @ngxpert/hot-toast |
| Loading | ngx-spinner |
| Ícones | Font Awesome 7 |
| Tipografia | Inter (Google Fonts) |
| Build | Angular CLI / esbuild |

---

## Pré-requisitos

- Node.js ≥ 20
- npm ≥ 10
- Angular CLI ≥ 20

```bash
npm install -g @angular/cli
```

---

## Instalação e execução

```bash
# Clonar o repositório
git clone <url-do-repo>
cd conquiste-conexoes-web

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
# http://localhost:4200
```

### Build

```bash
# Build de produção
npm run build

# Build de desenvolvimento com watch
npm run watch
```

### Testes

```bash
npm test
```

---

## Estrutura do projeto

```
src/
├── app/
│   ├── components/
│   │   ├── layout/               # Header, Sidebar, Footer, MainLayout
│   │   └── shared/               # AlertMessage, ConfirmDialog, LoadingSpinner, PageHeader
│   ├── guards/
│   │   └── auth-guard.ts
│   ├── interceptors/
│   │   ├── auth-interceptor.ts   # Injeta Bearer token automaticamente
│   │   └── loading-interceptor.ts
│   ├── models/                   # Interfaces TypeScript de todos os domínios
│   ├── pages/
│   │   ├── admin/                # Clusters, Atuações, Grupamentos, Cargos, Horários, Parametrização
│   │   ├── associados/           # Listagem, detalhe, cadastro, anuidades, cargos, grupamentos, etc.
│   │   ├── auth/                 # Login
│   │   ├── dashboard/            # Home Screen com painéis integrados
│   │   ├── equipes/              # Listagem, detalhe, formulário
│   │   ├── operacional/
│   │   │   ├── conexoes/         # NG / NR
│   │   │   ├── educacional/      # PEEN e TEEN
│   │   │   ├── paineis/          # Painel semanal, evolução individual, performance de equipe
│   │   │   ├── parcerias/        # NR (Parcerias)
│   │   │   ├── reunioes/         # Reuniões 1×1
│   │   │   └── visitantes/       # Externos, internos e substitutos
│   │   ├── perfil/               # Perfil do associado
│   │   └── seguro/               # Cadastro de seguro e beneficiários
│   ├── services/                 # Serviços HTTP por domínio
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── dev-mocks.ts              # ⚠️ Providers de mock para desenvolvimento
├── environments/
│   ├── environment.ts            # Produção
│   └── environment.development.ts
└── styles.scss                   # Design system global (variáveis CSS, Bootstrap, Hot-Toast)
```

---

## Módulos / Rotas principais

| Rota | Descrição |
|---|---|
| `/login` | Autenticação |
| `/dashboard` | Home Screen — painéis de performance |
| `/associados` | Gestão de associados |
| `/equipes` | Gestão de equipes C+C |
| `/admin/clusters` | Gerenciar clusters de mercado |
| `/admin/atuacoes` | Atuações específicas por cluster |
| `/admin/grupamentos` | Grupamentos Estratégicos (sigla 4 chars) |
| `/admin/cargos` | Cargos de liderança |
| `/admin/horarios` | Horários de reunião |
| `/admin/parametrizacao` | Tabela de pontuação por performance |
| `/operacional/reunioes` | Reuniões 1×1 |
| `/operacional/conexoes` | Negócios Gerados (NG) |
| `/operacional/parcerias` | Parcerias (NR) |
| `/operacional/visitantes` | Registro de visitantes |
| `/educacional/peen` | Módulos educacionais online (5 pts/módulo) |
| `/educacional/teen` | Eventos de treinamento presencial |
| `/paineis/semanal` | Painel de indicadores semanais |
| `/paineis/evolucao` | Evolução individual (1M / 6M / Total) |
| `/paineis/equipe` | Performance da equipe (Mês / 3M / Total) |

---

## Design System

Variáveis CSS globais definidas em `src/styles.scss`:

```scss
--cc-primary:     #1a3a5c   // Azul marinho (cor principal)
--cc-secondary:   #10b981   // Verde (ações de sucesso)
--cc-header-height: 64px
--cc-sidebar-width: 260px
--cc-sidebar-collapsed-width: 68px
```

---

## Regras de negócio relevantes

As regras completas estão documentadas em [`docs/regras_validacao_preenchimento.md`](docs/regras_validacao_preenchimento.md). Destaques:

- **Nome de equipe:** prefixo obrigatório `C+C` + máx. 20 caracteres totais
- **Previsão de lançamento:** data de início + 63 dias (9 semanas)
- **Sigla de grupamento:** exatamente 4 caracteres
- **Vencimento de anuidade:** sempre dia 1º do mês seguinte ao ingresso, no ano subsequente
- **PEEN:** 1 módulo concluído = 5 pontos
- **Seleção encadeada:** Atuação Específica filtra automaticamente pelo Cluster selecionado
- **Status do associado:** `PRE_ATIVO` | `ATIVO` | `INATIVO_PAUSA` | `INATIVO_DESISTENCIA` | `INATIVO_DESLIGADO` | `INATIVO_FALECIMENTO`

---

## Mocks de desenvolvimento

O arquivo `src/app/dev-mocks.ts` substitui todos os serviços HTTP por dados fictícios com delay simulado, permitindo desenvolvimento sem back-end.

Para **desativar** os mocks e conectar ao back-end real:

1. Remova o spread `...DEV_MOCK_PROVIDERS` de `src/app/app.config.ts`
2. Configure a URL da API em `src/environments/environment.development.ts`

```typescript
// environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `environment.apiUrl` | URL base da API REST |
| `environment.production` | Flag de produção |

---

## Convenções de código

- Componentes standalone (sem NgModules)
- `ChangeDetectionStrategy.OnPush` em componentes de página
- `input()` / `output()` functions em vez de decorators
- Controle de fluxo nativo: `@if`, `@for`, `@switch`
- Injeção via `inject()` em vez de constructor
- Sinais (`signal`, `computed`) para estado local

---

## Licença

Uso interno — Ecossistema Conquiste + Conexões.
