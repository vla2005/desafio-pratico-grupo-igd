class ErroValidacao extends Error {
  constructor(camposInvalidos) {
    const campos = camposInvalidos.join(', ');
    super(`Preencha corretamente os seguintes campos: ${campos}.`);
    this.name = 'ErroValidacao';
    this.camposInvalidos = camposInvalidos;
  }
}

function textoValido(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

function gerarRoteiro(dados = {}) {
  const entrada = dados && typeof dados === 'object' ? dados : {};
  const camposInvalidos = [];

  if (!textoValido(entrada.nomeOferta)) {
    camposInvalidos.push('nome da oferta');
  }

  if (!textoValido(entrada.resultado)) {
    camposInvalidos.push('resultado prometido');
  }

  if (!textoValido(entrada.publico)) {
    camposInvalidos.push('público');
  }

  if (camposInvalidos.length > 0) {
    throw new ErroValidacao(camposInvalidos);
  }

  const nomeOferta = entrada.nomeOferta.trim();
  const resultado = entrada.resultado.trim();
  const publico = entrada.publico.trim();

  return [
    `Conheça ${nomeOferta}.`,
    `Criado especialmente para ${publico}.`,
    `${resultado.charAt(0).toUpperCase()}${resultado.slice(1)}.`,
    'Comece agora e dê o próximo passo.'
  ].join('\n');
}

module.exports = { ErroValidacao, gerarRoteiro, textoValido };
