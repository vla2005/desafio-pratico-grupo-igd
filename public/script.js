const formulario = document.querySelector('#formulario-roteiro');
const botaoEnviar = document.querySelector('#botao-enviar');
const mensagem = document.querySelector('#mensagem');
const resultadoRoteiro = document.querySelector('#resultado-roteiro');
const textoRoteiro = document.querySelector('#texto-roteiro');

function limparMensagens() {
  mensagem.hidden = true;
  mensagem.textContent = '';
  mensagem.classList.remove('erro');
  resultadoRoteiro.hidden = true;
  textoRoteiro.textContent = '';
}

function exibirMensagem(texto, tipo = 'informacao') {
  mensagem.textContent = texto;
  mensagem.classList.toggle('erro', tipo === 'erro');
  mensagem.hidden = false;
}

function alternarCarregamento(carregando) {
  botaoEnviar.disabled = carregando;
  botaoEnviar.querySelector('span').textContent = carregando ? 'Gerando roteiro...' : 'Gerar roteiro';
}

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  limparMensagens();

  const dados = {
    nomeOferta: formulario.nomeOferta.value,
    resultado: formulario.resultado.value,
    publico: formulario.publico.value
  };

  alternarCarregamento(true);
  exibirMensagem('Organizando as informações e criando seu roteiro...');

  try {
    const resposta = await fetch('/api/roteiros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const conteudo = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
      throw new Error(conteudo.erro || 'Não foi possível gerar o roteiro. Tente novamente.');
    }

    mensagem.hidden = true;
    textoRoteiro.textContent = conteudo.roteiro;
    resultadoRoteiro.hidden = false;
  } catch (erro) {
    exibirMensagem(erro.message || 'Falha de comunicação com o servidor.', 'erro');
  } finally {
    alternarCarregamento(false);
  }
});
