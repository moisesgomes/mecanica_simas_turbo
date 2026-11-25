// Todos os valores monetários em CENTAVOS (inteiro), para evitar erro de ponto flutuante.

export interface Fatura {
  subtotal: number;
  iss: number;
  total: number;
}

/** Converte um valor em reais para centavos inteiros, arredondando ao centavo. */
export function arredondarCentavos(valorEmReais: number): number {
  return Math.round(valorEmReais * 100);
}

/**
 * Calcula a fatura de uma OS.
 * @param subtotalCentavos subtotal em centavos (ex.: 10000 = R$ 100,00)
 * @param issPct alíquota do ISS em porcentagem (ex.: 5 = 5%)
 */
export function calcularFatura(subtotalCentavos: number, issPct: number): Fatura {
  const iss = arredondarCentavos((subtotalCentavos / 100) * (issPct / 100));
  return {
    subtotal: subtotalCentavos,
    iss,
    total: subtotalCentavos + iss,
  };
}
