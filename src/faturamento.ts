// Todos os valores monetários em CENTAVOS (inteiro), para evitar erro de ponto flutuante.

export interface Fatura {
  subtotal: number;
  iss: number;
  total: number;
}

/**
 * Calcula a fatura de uma OS, aplicando o desconto concedido ao cliente.
 * @param subtotalCentavos subtotal em centavos (ex.: 10000 = R$ 100,00)
 * @param issPct alíquota do ISS em porcentagem (ex.: 5 = 5%)
 * @param descontoPct desconto concedido em porcentagem (ex.: 10 = 10%)
 */
export function calcularFatura(subtotalCentavos: number, issPct: number, descontoPct = 0): Fatura {
  const subtotalReais = subtotalCentavos / 100;
  const iss = subtotalReais * (issPct / 100);
  const comImposto = subtotalReais + iss;
  const totalComDesconto = comImposto * (1 - descontoPct / 100);
  return {
    subtotal: Math.round(subtotalReais * 100),
    iss: Math.round(iss * 100),
    total: Math.round(totalComDesconto * 100),
  };
}
