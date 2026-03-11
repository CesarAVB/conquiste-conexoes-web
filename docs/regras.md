# Regras para Geração de Frontend Angular

## Stack e Arquitetura

- O frontend deve ser desenvolvido utilizando **Angular**.
- A interface deve ser **simples, limpa e funcional**.
- Utilizar **componentes standalone**.
- O projeto **não deve conter testes**.
- Os arquivos **não devem possuir o sufixo `.component`**, seguindo o padrão desta versão do Angular.

---

# Estrutura e Criação de Arquivos

Toda a estrutura do projeto deve ser criada **via linha de comando do Angular CLI**.

## Environments

Criar environments utilizando:

```bash
ng g environments
```

---

## Models

Criar modelos utilizando a interface do Angular:

```bash
ng g i models/[nome] --type=model
```

---

## Guards

Criar guards utilizando:

```bash
ng g g guards/[nome] --skip-tests
```

---

## Services

Criar services utilizando:

```bash
ng g s services/[nome] --skip-tests
```

### Regra importante

Os **services não devem possuir o sufixo `.service` no nome do arquivo**.

Exemplo esperado:

```
services/auth.ts
services/user.ts
services/api.ts
```

---

## Interceptors

Criar interceptors utilizando:

```bash
ng g interceptor interceptors/[nome] --skip-tests
```

---

# Estrutura de Componentes

Cada componente deve conter **exatamente 3 arquivos**:

```
nome.ts
nome.html
nome.scss
```

Exemplo:

```
login.ts
login.html
login.scss
```

---

# Estilo e UI

Utilizar obrigatoriamente:

- **Bootstrap 5**
- **Font Awesome 6**

A interface deve conter:

- Spinners de carregamento
- Alertas
- Badges
- Feedback visual claro para ações do usuário

---

# Responsividade

O frontend deve ser **100% responsivo**, funcionando corretamente em:

- Mobile
- Tablet
- Desktop

Utilizar preferencialmente os **breakpoints do Bootstrap 5**.

---

# Footer Padrão

Todas as páginas devem possuir um **footer minimalista** com o seguinte conteúdo:

© 2026 César Augusto Vieira Bezerra  
https://portfolio.cesaraugusto.dev.br/  

Todos os direitos reservados.

---

# Diretrizes Gerais

- Código deve ser **organizado e legível**
- Seguir **boas práticas do Angular**
- Evitar complexidade desnecessária
- Priorizar **componentização**
- Interfaces devem ser **claras e objetivas**