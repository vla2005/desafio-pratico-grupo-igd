const test = require('node:test');
const assert = require('node:assert/strict');
const { ErroValidacao, gerarRoteiro } = require('../src/services/roteiro.service');

test('gera um roteiro válido com quatro linhas', () => {
  const roteiro = gerarRoteiro({
    nomeOferta: 'Curso de Java',
    resultado: 'aprender a criar APIs profissionais',
    publico: 'desenvolvedores iniciantes'
  });

  assert.equal(
    roteiro,
    'Conheça Curso de Java.\nCriado especialmente para desenvolvedores iniciantes.\nAprender a criar APIs profissionais.\nComece agora e dê o próximo passo.'
  );
  assert.equal(roteiro.split('\n').length, 4);
});

const casosInvalidos = [
  ['público ausente', { nomeOferta: 'Oferta', resultado: 'Vender mais' }, 'público'],
  ['nome da oferta vazio', { nomeOferta: '', resultado: 'Vender mais', publico: 'Lojistas' }, 'nome da oferta'],
  ['resultado contendo apenas espaços', { nomeOferta: 'Oferta', resultado: '   ', publico: 'Lojistas' }, 'resultado prometido'],
  ['objeto vazio', {}, 'nome da oferta'],
  ['argumento undefined', undefined, 'nome da oferta']
];

for (const [cenario, entrada, campoEsperado] of casosInvalidos) {
  test(`rejeita ${cenario}`, () => {
    assert.throws(
      () => gerarRoteiro(entrada),
      (erro) => erro instanceof ErroValidacao && erro.camposInvalidos.includes(campoEsperado)
    );
  });
}
