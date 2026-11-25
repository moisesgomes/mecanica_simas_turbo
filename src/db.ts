import Database from 'better-sqlite3';

// Banco em memória, recriado a cada boot. É só uma isca de demonstração.
export const db = new Database(':memory:');

db.exec(`
  CREATE TABLE clientes (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    telefone TEXT
  );
  CREATE TABLE veiculos (
    id INTEGER PRIMARY KEY,
    placa TEXT NOT NULL,
    modelo TEXT,
    clienteId INTEGER
  );
  CREATE TABLE pecas (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    quantidade INTEGER NOT NULL
  );
  CREATE TABLE ordens (
    id INTEGER PRIMARY KEY,
    veiculoId INTEGER NOT NULL,
    status TEXT NOT NULL,
    subtotal INTEGER NOT NULL
  );
`);

// Dados de exemplo
const cliente = db.prepare('INSERT INTO clientes (id, nome, telefone) VALUES (?, ?, ?)');
cliente.run(1, 'João Simas', '11999990000');
cliente.run(2, 'Maria Oliveira', '11988887777');

const veiculo = db.prepare('INSERT INTO veiculos (id, placa, modelo, clienteId) VALUES (?, ?, ?, ?)');
veiculo.run(1, 'ABC1D23', 'Fiat Uno', 1);
veiculo.run(2, 'XYZ9K88', 'VW Gol', 2);
veiculo.run(3, 'GUINCHO0', 'Guincho da oficina', null); // veículo sem dono cadastrado

const peca = db.prepare('INSERT INTO pecas (id, nome, quantidade) VALUES (?, ?, ?)');
peca.run(1, 'Filtro de óleo', 10);
peca.run(2, 'Pastilha de freio', 4);

const ordem = db.prepare('INSERT INTO ordens (id, veiculoId, status, subtotal) VALUES (?, ?, ?, ?)');
ordem.run(1, 1, 'aberta', 25000); // subtotal em centavos
ordem.run(2, 3, 'aberta', 48000);
