# Piloto CodeRabbit — proposta para a equipe

> Rascunho que alimenta o documento compartilhável de pitch. Ajuste os números de
> "baseline" com os dados reais do time antes de apresentar.

## O problema hoje
- Review humano é **gargalo**: PR espera horas/dias pelo revisor sênior.
- Bugs escapam para o merge (segurança, cálculo, null, performance) e viram incidente.
- Review inconsistente: depende de quem revisou e de quanto tempo tinha.
- Revisor sênior gasta boa parte da semana em review repetitivo em vez de problema difícil.

## O que é o CodeRabbit
Revisor de PR por IA. Instala no GitHub e, a cada PR, **automaticamente**:
- gera resumo e walkthrough das mudanças;
- comenta **linha a linha** (bug, segurança, performance, estilo) com sugestão de correção;
- conversa no PR (`@coderabbitai`), aplica correções sugeridas e refaz a revisão a cada push.

Não substitui o review humano — **tira o trabalho repetitivo** e dá o primeiro parecer em minutos.

## O que a demo mostra
9 PRs no projeto-isca "Mecânica Simas Turbo", cada um com um defeito real:
SQL injection, cálculo de dinheiro errado, null, N+1, falta de validação, segredo hardcoded,
race condition de estoque, função sem teste — e um **PR limpo** que ele aprova.
→ Prova: ele acha coisa de verdade, em português, em minutos.

## Como medir (piloto de 2-4 semanas em PRs reais)

| Métrica | Baseline (hoje) | Com CodeRabbit | Como medir |
|---|---|---|---|
| Tempo até o 1º feedback no PR | preencher | minutos (automático) | timestamp PR → 1º comentário |
| Issues apontados antes do review humano | ~0 | nº por PR | contar comentários do bot |
| Tempo de review humano por PR | preencher | preencher | autorrelato / dados do PR |
| PRs que mergeiam sem retrabalho | preencher | preencher | % |
| Bugs/incidentes pós-merge | preencher | preencher | tracker de incidentes |
| Horas/semana do sênior em review | preencher | preencher | estimativa |

## Critérios de decisão (go / no-go)
Definir com o time antes de começar. Exemplos:
- Reduzir o tempo de review humano por PR em **≥ 30%**.
- Pegar **≥ 4** classes de problema (das 6 acima) antes do review humano, de forma consistente.
- Ruído aceitável: taxa de falso-positivo que o time tolera sem desligar o bot.
- Aprovação qualitativa de ≥ 70% dos devs que participaram.

## Custo e rollout
- Cobrança **por desenvolvedor que abre PR** (confirmar o valor atual na página oficial —
  ordem de grandeza citada por terceiros em 2026: ~US$ 12-24/dev/mês; **validar**).
- Repo público (como o da demo) é grátis; repos **privados** reais exigem plano pago.
- Rollout sugerido: 1 repo/time piloto → medir 2-4 semanas → decidir → expandir.

## Riscos e limitações
- **Falso-positivo/ruído**: ajustar `profile` e `path_instructions` no `.coderabbit.yaml`.
- **Não substitui** o review humano — complementa.
- **Privacidade/dados**: validar com Segurança a política de dados do CodeRabbit **antes**
  de apontar em repositórios reais da empresa.
