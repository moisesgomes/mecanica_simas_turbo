import { db } from './db.js';

export interface Cliente {
  id: number;
  nome: string;
  telefone: string | null;
}

export function buscarCliente(id: number): Cliente | undefined {
  return db.prepare('SELECT * FROM clientes WHERE id = ?').get(id) as Cliente | undefined;
}

export function listarClientes(): Cliente[] {
  return db.prepare('SELECT * FROM clientes').all() as Cliente[];
}
