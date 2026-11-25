import { db } from './db.js';

export interface Ordem {
  id: number;
  veiculoId: number;
  status: string;
  subtotal: number; // em centavos
}

export function buscarOrdem(id: number): Ordem | undefined {
  return db.prepare('SELECT * FROM ordens WHERE id = ?').get(id) as Ordem | undefined;
}

export function listarOrdens(): Ordem[] {
  return db.prepare('SELECT * FROM ordens').all() as Ordem[];
}
