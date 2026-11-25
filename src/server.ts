import express from 'express';
import { listarClientes } from './clientes.js';
import { listarVeiculos, buscarVeiculo } from './veiculos.js';
import { listarOrdens, criarOrdem } from './ordens.js';
import { listarPecas } from './estoque.js';

export const app = express();
app.use(express.json());

app.get('/clientes', (_req, res) => res.json(listarClientes()));

app.get('/veiculos', (_req, res) => res.json(listarVeiculos()));

app.get('/veiculos/:id', (req, res) => {
  const veiculo = buscarVeiculo(Number(req.params.id));
  if (!veiculo) return res.status(404).json({ erro: 'Veículo não encontrado' });
  res.json(veiculo);
});

app.get('/ordens', (_req, res) => res.json(listarOrdens()));

app.post('/ordens', (req, res) => {
  const { veiculoId, status, subtotal } = req.body;
  const ordem = criarOrdem(veiculoId, status, subtotal);
  res.status(201).json(ordem);
});

app.get('/estoque', (_req, res) => res.json(listarPecas()));

const PORT = Number(process.env.PORT ?? 3000);
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Mecânica Simas Turbo rodando em http://localhost:${PORT}`);
  });
}
