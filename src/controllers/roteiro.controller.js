const { ErroValidacao, gerarRoteiro } = require('../services/roteiro.service');

function criarRoteiro(req, res, next) {
  try {
    const roteiro = gerarRoteiro(req.body);
    return res.status(200).json({ roteiro });
  } catch (erro) {
    if (erro instanceof ErroValidacao) {
      return res.status(400).json({
        erro: erro.message,
        camposInvalidos: erro.camposInvalidos
      });
    }

    return next(erro);
  }
}

module.exports = { criarRoteiro };
