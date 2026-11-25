import { db } from './db.js';
import { buscarVeiculo } from './veiculos.js';
import { buscarCliente } from './clientes.js';

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

// Monta um resumo legível da OS com o dono do veículo.
export function resumoOrdem(ordemId: number): string {
  const ordem = buscarOrdem(ordemId)!;
  const veiculo = buscarVeiculo(ordem.veiculoId)!;
  const dono = buscarCliente(veiculo.clienteId!)!;
  return `OS #${ordem.id} — ${veiculo.modelo} (${veiculo.placa}), dono: ${dono.nome}`;
}
