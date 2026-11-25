import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularFatura, arredondarCentavos } from '../src/faturamento.js';

test('ISS de 5% sobre R$ 100,00', () => {
  const f = calcularFatura(10000, 5); // 10000 centavos = R$ 100,00
  assert.equal(f.iss, 500);
  assert.equal(f.total, 10500);
});

test('arredonda o ISS ao centavo', () => {
  const f = calcularFatura(333, 5); // 333 * 0,05 = 16,65 -> 17
  assert.equal(f.iss, 17);
  assert.equal(f.total, 350);
});

test('ISS zero mantém o subtotal', () => {
  const f = calcularFatura(25000, 0);
  assert.equal(f.total, 25000);
});

test('arredondarCentavos converte reais em centavos', () => {
  assert.equal(arredondarCentavos(1), 100);
  assert.equal(arredondarCentavos(2.5), 250);
  assert.equal(arredondarCentavos(0.1), 10);
});
