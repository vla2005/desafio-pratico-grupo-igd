const path = require('node:path');
const express = require('express');
const roteiroRoutes = require('./routes/roteiro.routes');

const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api/roteiros', roteiroRoutes);

app.use((erro, req, res, next) => {
  if (erro instanceof SyntaxError && erro.status === 400 && 'body' in erro) {
    return res.status(400).json({ erro: 'O corpo da requisição deve conter um JSON válido.' });
  }

  console.error('Erro inesperado:', erro);
  return res.status(500).json({ erro: 'Ocorreu um erro inesperado. Tente novamente.' });
});

if (require.main === module) {
  app.listen(porta, '0.0.0.0', () => {
    console.log(`Servidor disponível em http://localhost:${porta}`);
  });
}

module.exports = app;
