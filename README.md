# Mecânica Simas Turbo — Piloto do CodeRabbit

Projeto-isca para demonstrar, na prática, como o **CodeRabbit** (revisor de PR por IA)
melhora a eficiência do code review. É um sistema fictício de **Ordem de Serviço (OS)**
de oficina. Cada branch de cenário contém **um defeito plantado** que o CodeRabbit deve
pegar ao abrir o Pull Request.

> **Não use este código em produção.** Os defeitos são intencionais.

---

## 1. Rodar local

Requisitos: Node.js 20+ (recomendado 22 LTS).

```bash
npm install
npm test          # testes de faturamento (lógica de dinheiro)
npm run dev       # sobe a API em http://localhost:3000
```

Endpoints: `GET /clientes`, `/veiculos`, `/veiculos/:id`, `/ordens`, `/estoque`.

> Obs.: `npm test` roda só os testes puros de faturamento e **não precisa** compilar o
> banco. O `better-sqlite3` só é necessário para `npm run dev`; se o `npm install` falhar
> por falta de build tools nativos, confira a versão do Node (prebuilds existem para o LTS).

---

## 2. Setup do CodeRabbit (uma vez)

1. Suba este repositório **público** no GitHub (`main` + todas as branches de cenário).
   Repo público é **grátis** no CodeRabbit — sem trial, sem cartão.
2. Instale o app **CodeRabbit** pelo GitHub Marketplace: https://github.com/marketplace/coderabbitai
   e autorize **este repositório**.
3. Pronto. A partir daí, todo PR aberto é revisado automaticamente. A config em
   [`.coderabbit.yaml`](.coderabbit.yaml) já deixa os comentários **em português**.

---

## 3. Subir o repo e abrir os PRs

Com o [GitHub CLI](https://cli.github.com/) (`gh`):

```bash
git remote add origin git@github.com:SUA_CONTA/mecanica-simas-turbo.git
git push -u origin main
git push origin --all          # envia todas as branches de cenário

# Abra os 9 PRs (um por cenário). Rode o helper:
bash scripts/abrir-prs.sh
```

Ou abra manualmente pela interface do GitHub (New pull request → base `main` ← compare `feat/...`).

Dê ~2-5 min para o CodeRabbit comentar cada PR.

---

## 4. Roteiro da demo (~30 min)

Ordem sugerida — do impacto óbvio (segurança) ao sutil (concorrência), fechando no PR limpo:

| Ordem | PR | O que mostrar / falar |
|------|----|-----------------------|
| 1 | `feat/busca-placa` 🔒 | CodeRabbit aponta **SQL injection** e já sugere query parametrizada (`?`). "Isso é o tipo de coisa que passa batido num review corrido." |
| 2 | `feat/desconto-os` 💰 | Ele pega o **cálculo de dinheiro errado** (desconto depois do imposto + float). Dá pra pedir `@coderabbitai` a correção. |
| 3 | `fix/exibir-dono` 🐛 | Acesso a `cliente` que pode ser **null** (veículo sem dono). Mostra que ele entende o fluxo de dados. |
| 4 | `feat/listar-os` ⚡ | Aponta o **N+1** e sugere buscar em lote. |
| 5 | `feat/criar-os-api` 🛡️ | **Falta de validação** no `POST /ordens` (aceita quantidade negativa, campos faltando). |
| 6 | `chore/config-pagamento` 🔑 | **Segredo hardcoded** no código. "Esse é caro de vazar." |
| 7 | `feat/baixa-estoque` 🔀 | Baixa de estoque **não atômica** / deixa estoque negativo (race condition). |
| 8 | `refactor/os-grande` 🧹 | **Função gigante, nomes ruins, sem teste** — ele sugere dividir e cobrir com testes. |
| 9 | `refactor/fatura-testada` ✅ | PR **correto e testado** → CodeRabbit **aprova/elogia**. Prova que não é só um reclamão. |

Detalhe de cada defeito e as falas em [`docs/cenarios.md`](docs/cenarios.md).

### Interagindo com o bot (mostrar ao vivo)
- `@coderabbitai` + pergunta em qualquer comentário do PR.
- `@coderabbitai generate a summary` — resumo do PR.
- Numa sugestão: **"Commit suggestion"** aplica a correção direto no PR.
- `@coderabbitai resolve` / pedir re-review após um push.

---

## 5. Resetar a demo para reapresentar

Os PRs podem ficar abertos (não dê merge). Para uma nova rodada limpa:

```bash
gh pr close <num> ...     # fecha os PRs antigos
git push origin --all     # reenvia as branches
bash scripts/abrir-prs.sh # reabre os PRs
```

---

## 6. Do piloto à decisão

A demo prova "ele acha coisa real em minutos". O **piloto de 2-4 semanas** em PRs reais
é o que mede o ganho. Métricas, critérios go/no-go e custo estão no documento de pitch
(`docs/pitch.md`).
