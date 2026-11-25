import { db } from './db.js';

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string | null;
  clienteId: number | null;
}

export function buscarVeiculo(id: number): Veiculo | undefined {
  return db.prepare('SELECT * FROM veiculos WHERE id = ?').get(id) as Veiculo | undefined;
}

export function listarVeiculos(): Veiculo[] {
  return db.prepare('SELECT * FROM veiculos').all() as Veiculo[];
}
