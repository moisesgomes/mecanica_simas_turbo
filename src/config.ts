// Configuração da integração com o gateway de pagamento da oficina.
// (valores fictícios para a demo)

export const pagamentoConfig = {
  gatewayUrl: 'https://api.simaspay.exemplo/v1',
  // chave secreta da conta de produção
  apiKey: 'simaspay_live_3f9c1a7e8b24d05f6a1b2c3d4e5f6071',
  // string de conexão do banco de cobrança (usuário:senha no texto)
  databaseUrl: 'postgres://cobranca:S3nhaDaCobranca@db.interno.simas.local:5432/cobranca',
  webhookSecret: 'whsec_simas_7c1f0a9e3b6d48f2a0c5e1d9b4f8a2c6',
};
