#!/usr/bin/env bash
# Abre os 9 PRs de cenário com o GitHub CLI (gh). Rode depois de 'git push origin --all'.
# Requer: gh auth login já feito e 'origin' apontando para o repo no GitHub.
set -euo pipefail

abrir() {
  local branch="$1" titulo="$2" corpo="$3"
  echo "Abrindo PR: $titulo ($branch)"
  gh pr create --base main --head "$branch" --title "$titulo" --body "$corpo"
}

abrir "feat/busca-placa"        "Buscar veículo por placa"              "Adiciona endpoint/consulta de veículo pela placa."
abrir "feat/desconto-os"        "Aplicar desconto na fatura da OS"      "Passa a aceitar desconto percentual no cálculo da fatura."
abrir "fix/exibir-dono"         "Exibir dono do veículo no resumo da OS" "Mostra o nome do cliente dono do veículo no resumo."
abrir "feat/listar-os"          "Listar OS com nome do cliente"         "Lista as ordens de serviço já com o cliente."
abrir "feat/criar-os-api"       "Criar OS via API"                      "Novo endpoint POST /ordens."
abrir "chore/config-pagamento"  "Config de integração de pagamento"     "Adiciona configuração do gateway de pagamento."
abrir "feat/baixa-estoque"      "Baixa de estoque de peças"             "Dá baixa nas peças usadas na OS."
abrir "refactor/os-grande"      "Montar relatório completo da OS"       "Função que monta o relatório consolidado da OS."
abrir "refactor/fatura-testada" "Refatorar cálculo de fatura + testes"  "Extrai arredondamento para helper e cobre com testes."

echo "Pronto. Aguarde o CodeRabbit comentar cada PR (~2-5 min)."
