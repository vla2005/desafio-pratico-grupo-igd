# Mini Gerador de Roteiros de Vendas

Aplicação web criada para a Parte A de um teste técnico de Desenvolvedor Júnior. O usuário informa uma oferta, o resultado prometido e o público; a aplicação valida esses dados no backend e devolve um roteiro de vendas curto, com quatro linhas.

## Tecnologias

- Node.js 20 ou superior
- Express 5
- HTML5 semântico
- CSS3 responsivo
- JavaScript puro no frontend
- Test runner nativo do Node.js
- Docker

## Estrutura de pastas

```text
mini-gerador/
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── src/
│   ├── controllers/
│   │   └── roteiro.controller.js
│   ├── routes/
│   │   └── roteiro.routes.js
│   ├── services/
│   │   └── roteiro.service.js
│   └── app.js
├── tests/
│   └── roteiro.service.test.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

## Como Executar o Projeto

Você pode rodar esta aplicação de duas formas: **localmente** (instalando o Node.js) ou **via Docker** (sem precisar instalar o Node.js na sua máquina). Escolha o método de sua preferência abaixo:

### 🚀 Opção 1: Executar Localmente (Requer Node.js instalado)

**Pré-requisitos:** Node.js 20+ e npm.

Clone esse repositório e instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Acesse no seu navegador: [http://localhost:3000](http://localhost:3000)

*(A porta pode ser alterada configurando a variável de ambiente `PORT`).*

**Para rodar os testes** (opcional):

```bash
npm test
```

*Os testes cobrem a geração válida e entradas inválidas, incluindo campos ausentes, vazios, com somente espaços, objeto vazio e argumento `undefined`.*

### 🐳 Opção 2: Executar com Docker (Sem instalar Node.js)

**Pré-requisitos:** Docker instalado e rodando.

Crie a imagem Docker:

```bash
docker build -t mini-gerador .
```

Inicie o container:

```bash
docker run --rm --name mini-gerador -p 3000:3000 mini-gerador
```

Acesse no seu navegador: [http://localhost:3000](http://localhost:3000).

## API

### `POST /api/roteiros`

Envie um corpo JSON:

```json
{
  "nomeOferta": "Curso de Java",
  "resultado": "aprender a criar APIs profissionais",
  "publico": "desenvolvedores iniciantes"
}
```

Resposta de sucesso (`200 OK`):

```json
{
  "roteiro": "Conheça Curso de Java.\nCriado especialmente para desenvolvedores iniciantes.\nAprender a criar APIs profissionais.\nComece agora e dê o próximo passo."
}
```

Resposta de validação (`400 Bad Request`):

```json
{
  "erro": "Preencha corretamente os seguintes campos: resultado prometido, público.",
  "camposInvalidos": [
    "resultado prometido",
    "público"
  ]
}
```

## Tratamento de erros

- O service valida tipo e conteúdo dos três campos antes de manipular strings. Assim, valores ausentes, `null`, vazios ou compostos apenas por espaços não quebram o servidor.
- Entradas inválidas recebem status `400` e indicam quais campos precisam ser corrigidos.
- JSON malformado recebe status `400` com uma mensagem específica.
- Erros inesperados são encaminhados ao middleware final e recebem status `500`, sem expor detalhes internos.
- No frontend, mensagens anteriores são limpas a cada envio, o botão fica desabilitado durante a requisição e falhas de API ou rede são exibidas ao usuário.

## Decisões principais

A aplicação usa uma separação direta entre rota, controller e service. A regra de validação e geração fica isolada e exportada no service, o que permite testá-la sem iniciar o servidor. Não há banco de dados, autenticação ou integração com IA: o roteiro é gerado de forma determinística em memória. O Express também serve os arquivos estáticos da pasta `public` e escuta em `0.0.0.0`, garantindo compatibilidade com Docker.


## Parte B — Correção do bug

O erro ocorria porque toLowerCase() era executado diretamente em dados.publico, que poderia ser undefined. A correção valida o tipo do campo antes de manipular a string e usa um valor padrão quando ele não é enviado.

Correção:
```javascript
function gerarRoteiro(dados = {}) {
  const publico = typeof dados.publico === "string"
    ? dados.publico.trim().toLowerCase()
    : "";

  const linhas = [
    "Oferta: " + (dados.nomeOferta || ""),
    "Para quem é: " + publico,
    "O que você promete: " + (dados.resultado || ""),
  ];

  return linhas.join("\n");
}
```