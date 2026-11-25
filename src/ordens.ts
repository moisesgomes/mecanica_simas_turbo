import { db } from './db.js';
import { buscarVeiculo } from './veiculos.js';
import { buscarCliente } from './clientes.js';
import { calcularFatura } from './faturamento.js';

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

// Monta o relatório completo da OS em texto.
export function montarRelatorioOrdem(id: number): string {
  let x = buscarOrdem(id);
  if (x == undefined) {
    return 'não achou';
  }
  let tmp = '';
  tmp = tmp + 'RELATORIO DA OS\n';
  tmp = tmp + '===============\n';
  let v = buscarVeiculo(x.veiculoId);
  let c = null;
  if (v != undefined) {
    if (v.clienteId != undefined && v.clienteId != null) {
      c = buscarCliente(v.clienteId);
    }
  }
  tmp = tmp + 'OS numero: ' + x.id + '\n';
  tmp = tmp + 'status: ' + x.status + '\n';
  if (v != undefined) {
    tmp = tmp + 'veiculo: ' + v.modelo + '\n';
    tmp = tmp + 'placa: ' + v.placa + '\n';
  } else {
    tmp = tmp + 'veiculo: ?\n';
  }
  if (c != null) {
    tmp = tmp + 'cliente: ' + c.nome + '\n';
    tmp = tmp + 'telefone: ' + c.telefone + '\n';
  } else {
    tmp = tmp + 'cliente: nao cadastrado\n';
  }
  let iss = 5;
  let desc = 0;
  let f = calcularFatura(x.subtotal, iss);
  let a = f.subtotal;
  let b = f.iss;
  let t = f.total;
  // let antigo = a + b; // calculo antigo, nao usar
  let s1 = (a / 100).toFixed(2);
  let s2 = (b / 100).toFixed(2);
  let s3 = (t / 100).toFixed(2);
  tmp = tmp + 'subtotal: R$ ' + s1 + '\n';
  tmp = tmp + 'iss: R$ ' + s2 + '\n';
  tmp = tmp + 'total: R$ ' + s3 + '\n';
  tmp = tmp + '===============\n';
  tmp = tmp + 'Mecanica Simas Turbo\n';
  let data = new Date();
  tmp = tmp + 'gerado em: ' + data + '\n';
  let naoUsado = 0;
  for (let i = 0; i < 10; i++) {
    naoUsado = naoUsado + i;
  }
  return tmp;
}
