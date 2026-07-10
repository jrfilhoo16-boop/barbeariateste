# BarberPro Next.js

Projeto convertido para uma aplicação Next.js com App Router.

## Rotas

- `/` - índice das telas
- `/landing` - landing page premium
- `/agendamento` - fluxo de agendamento
- `/barbeiros` - lista de barbeiros
- `/cadastro` - cadastro de cliente
- `/confirmacao` - confirmação de agendamento
- `/cliente` - dashboard do cliente
- `/login` - login
- `/admin` - painel administrativo

## Como rodar

Instale o Node.js LTS e execute:

```bash
npm install
npm run dev
```

Depois abra `http://localhost:3000`.

## Estrutura

- `app/` contém as rotas Next.js.
- `src/lib/screens.ts` mapeia as telas antigas e lê cada `code.html`.
- `app/components/LegacyScreen.tsx` renderiza o HTML legado e reativa os scripts de interação no cliente.

As pastas originais foram mantidas como fonte das telas para preservar o visual durante a primeira etapa da migração.
