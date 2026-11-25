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

// Lista as ordens já com placa do veículo e nome do cliente.
export function listarComCliente() {
  const ordens = listarOrdens();
  return ordens.map((ordem) => {
    const veiculo = buscarVeiculo(ordem.veiculoId);
    const cliente = veiculo?.clienteId != null ? buscarCliente(veiculo.clienteId) : undefined;
    return {
      id: ordem.id,
      status: ordem.status,
      placa: veiculo?.placa ?? null,
      cliente: cliente?.nome ?? null,
    };
  });
}
