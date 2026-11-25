# Catálogo de cenários (gabarito do apresentador)

Cada branch é um PR com **um** defeito plantado. Esta é a "cola": o que mudou, o defeito,
o que o CodeRabbit deve apontar e a fala sugerida. Os títulos dos PRs são propositalmente
"inocentes" (como um dev escreveria), para o defeito não ser óbvio pela descrição.

---

### PR 1 — `feat/busca-placa` 🔒 Segurança (SQL injection)
- **Muda:** adiciona `buscarPorPlaca(placa)` em `src/veiculos.ts` e a rota `GET /veiculos/placa/:placa`.
- **Defeito:** a query concatena a placa na string SQL (`... WHERE placa = '" + placa + "'"`).
- **CodeRabbit deve apontar:** SQL injection; trocar por query parametrizada (`WHERE placa = ?`).
- **Fala:** "Clássico que passa num review com pressa. Ele não só aponta, já dá o patch com `?`."

### PR 2 — `feat/desconto-os` 💰 Correção (cálculo de dinheiro)
- **Muda:** `calcularFatura` passa a aceitar `descontoPct`.
- **Defeito:** aplica o desconto **depois** do imposto (ordem errada) e volta a usar `float` + `Math.round`, perdendo centavos.
- **CodeRabbit deve apontar:** ordem desconto→imposto incorreta; risco de ponto flutuante em dinheiro.
- **Fala:** "Bug de dinheiro é o que mais dói. Repara que o `.coderabbit.yaml` tem instrução específica pra esse arquivo."

### PR 3 — `fix/exibir-dono` 🐛 Null/undefined
- **Muda:** adiciona `resumoOrdem(ordemId)` em `src/ordens.ts` que mostra o nome do dono.
- **Defeito:** acessa `cliente.nome` com `!` sendo que o veículo pode não ter dono (`clienteId = null`, ex.: o guincho).
- **CodeRabbit deve apontar:** acesso a valor possivelmente `undefined`; tratar o caso sem dono.
- **Fala:** "Ele entendeu que existe veículo sem cliente e que o `!` esconde um crash."

### PR 4 — `feat/listar-os` ⚡ Performance (N+1)
- **Muda:** `listarComCliente()` em `src/ordens.ts`.
- **Defeito:** faz um `buscarCliente(...)` dentro do loop de ordens (N+1 queries).
- **CodeRabbit deve apontar:** padrão N+1; buscar clientes em lote ou com JOIN.
- **Fala:** "Com 2 ordens ninguém sente. Com 5 mil, o endpoint derrete. Ele vê isso."

### PR 5 — `feat/criar-os-api` 🛡️ Validação de entrada
- **Muda:** `POST /ordens` em `src/server.ts`.
- **Defeito:** usa `req.body` cru; aceita `subtotal` negativo, `veiculoId` ausente, tipos errados.
- **CodeRabbit deve apontar:** falta de validação/sanitização antes de persistir.
- **Fala:** "Entrada de usuário sem validação é porta aberta. Ele sugere validar os campos."

### PR 6 — `chore/config-pagamento` 🔑 Segredo hardcoded
- **Muda:** novo `src/config.ts` com config do "gateway de pagamento".
- **Defeito:** `API_KEY` e string de conexão com senha **commitadas** no código.
- **CodeRabbit deve apontar:** segredo exposto; mover para variável de ambiente / secret.
- **Fala:** "Segredo no git é o vazamento mais caro e mais comum. Ele marca na hora."

### PR 7 — `feat/baixa-estoque` 🔀 Concorrência / consistência
- **Muda:** `baixarEstoque(pecaId, qtd)` em `src/estoque.ts`.
- **Defeito:** lê a quantidade, decide em JS e grava depois (read-modify-write, não atômico) e **não impede estoque negativo**.
- **CodeRabbit deve apontar:** race condition (TOCTOU); usar `UPDATE ... SET quantidade = quantidade - ? WHERE quantidade >= ?`.
- **Fala:** "Dois pedidos ao mesmo tempo furam o estoque. Ele sugere a operação atômica."

### PR 8 — `refactor/os-grande` 🧹 Manutenção + cobertura
- **Muda:** `montarRelatorioOrdem(...)` em `src/ordens.ts` — função de 80+ linhas.
- **Defeito:** função gigante, nomes ruins (`x`, `tmp`), trecho de código morto, **sem teste** para a lógica nova.
- **CodeRabbit deve apontar:** complexidade/legibilidade; sugerir dividir e cobrir com testes.
- **Fala:** "Não é bug, é dívida. Ele dá o empurrão de qualidade que o review humano às vezes pula."

### PR 9 — `refactor/fatura-testada` ✅ PR limpo (controle)
- **Muda:** extrai `arredondarCentavos` em `src/faturamento.ts` e **adiciona testes**.
- **Defeito:** nenhum — é um bom PR.
- **CodeRabbit deve:** aprovar / elogiar, sem findings relevantes.
- **Fala:** "Importante: ele **não** reclama por reclamar. PR bom, ele aprova. Isso é o que ganha a confiança do time."

---

## Resumo por categoria

| Categoria | PRs |
|-----------|-----|
| Segurança | 1 (SQLi), 6 (segredo) |
| Correção / dados | 2 (dinheiro), 3 (null) |
| Performance | 4 (N+1) |
| Robustez | 5 (validação), 7 (concorrência) |
| Manutenção/testes | 8 |
| Controle (PR bom) | 9 |
