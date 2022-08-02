<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
</p>

## Descrição

Implementação do Desafio para Backend Developer NodeJS -
Customer API via NestJS.

## API

Implemeta uma RESTful API com rotas autenticadas via JWT passadas pelo cabeçalho `Authorization: Bearer <token>` e dados armazenados via Redis.

Método | Rota | Função
--:|--:|--
POST | /customers | Cria um novo cliente.
PUT  | /customers/{customer_id} | Atualiza os dados do cliente indicado via id.
GET  | /customers/{customer_id}  | Retorna os dados do cliente indicado via id.
DELETE | /customers/{customer_id} | Deleta cliente indicado via id.

## Como executar

Esse projeto depende da ferramenta Redis para o armazenamento dos dados do ciente. Um ambiente docker de execução simples foi elaborado com docker-compose, para executá-lo basta utilizar o arquivo de composição localizado no projeto. Para isso, clone o repositório e execute os comandos:

### Instalando

```bash
npm install
```

### Imagem Docker

```bash
docker-compose up
```

### Rodando o aplicativo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Testando

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
