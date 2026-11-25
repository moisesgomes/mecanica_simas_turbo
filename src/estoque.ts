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
