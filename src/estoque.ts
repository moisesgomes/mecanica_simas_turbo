import { db } from './db.js';

export interface Peca {
  id: number;
  nome: string;
  quantidade: number;
}

export function buscarPeca(id: number): Peca | undefined {
  return db.prepare('SELECT * FROM pecas WHERE id = ?').get(id) as Peca | undefined;
}

export function listarPecas(): Peca[] {
  return db.prepare('SELECT * FROM pecas').all() as Peca[];
}

// Dá baixa na quantidade de uma peça usada na OS.
export function baixarEstoque(pecaId: number, qtd: number): void {
  const peca = buscarPeca(pecaId);
  if (!peca) throw new Error('Peça não encontrada');
  const novaQuantidade = peca.quantidade - qtd;
  db.prepare('UPDATE pecas SET quantidade = ? WHERE id = ?').run(novaQuantidade, pecaId);
}
