---
title: Métodos da API
---

# Métodos da API

Todas os métodos devem ser chamados utilizando HTTPS e devem apresentar o parâmetro `api_key`, contendo a chave de acesso da API disponível no seu [dashboard](https://dashboard.pagar.me).

## POST /transactions

**Descrição**: realiza uma transação.

**Parâmetros**: 

- `amount` (obrigatório) - o valor da transação, com centavos, sem vírgulas ou pontos. Ex: se o valor da transação é de R$49,90, o valor de `amount` será `4990`

- `card_number` (obrigatório) - o número do cartão de crédito, sem espaços ou separadores. Ex: `4532519433391701`
- `card_expiracy_date` (obrigatório) - mês (2 dígitos) seguidos do ano (2 dígitos) de expiração do cartão de crédito. Ex: se a data de expiração do cartão é 05/2016, o valor de `amount` será `0516`
- `card_holder_name` (obrigatório) - o nome do portador do cartão, como escrito neste. Ex: `Jose da Silva`
- `card_cvv` (obrigatório) - o código de segurança do cartão, como escrito nele. Exemplo: `314`

Os quatro parâmetros com os dados do cartão podem ser substituídos pelo `card_hash`. Para mais informações sobre o `card_hash`, consulte o guia de segurança.

- `card_hash` (obrigatório) - o conteúdo encriptado dos dados do cartão de crédito.

**Resposta**:

<pre><code data-language="javascript">{
    "status": "approved",
    "date_created": "2013-04-08T01:01:56.672Z",
    "amount": "4990",
    "id": "516217040ef16fc9fc00000f",
    "live": true,
    "costumer_name": "Jose da Silva"
}</code></pre>

## POST /transactions/:id/chargeback

**Descrição**: cancela uma transação.

**Parâmetros**: 

- `id` (obrigatório) - o ID da transação, retornado ao realizá-la

**Resposta**:

<pre><code data-language="javascript">{
    "status": "chargebacked",
    "date_created": "2013-04-08T01:01:56.672Z",
    "amount": "4990",
    "id": "516217040ef16fc9fc00000f",
    "live": true,
    "costumer_name": "Jose da Silva"
}</code></pre>

## GET /transactions/:id

**Descrição**: retorna os dados de uma transação a partir do ID desta.

**Resposta**:

<pre><code data-language="javascript">{
    "status": "approved",
    "date_created": "2013-04-08T01:01:56.672Z",
    "amount": "4990",
    "id": "516217040ef16fc9fc00000f",
    "live": true,
    "costumer_name": "Jose da Silva"
}</code></pre>

## GET /transactions

**Descrição**: retorna as últimas transações realizadas.

**Parâmetros**: 

- `page` (opcional) - página a ser consultada. Valor padrão: `1`
- `count` (opcional) - número de transações a ser retornado por página. Valor padrão: `10`

**Resposta**:

<pre><code data-language="javascript">[
  {
    "status": "approved",
    "date_created": "2013-04-10T23:34:12.000Z",
    "amount": "1000",
    "id": "5165f6f40ef16fc9fc000028",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "approved",
    "date_created": "2013-04-08T22:29:52.154Z",
    "amount": "1000",
    "id": "516344e00ef16fc9fc000027",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "approved",
    "date_created": "2013-04-08T22:29:52.139Z",
    "amount": "1000",
    "id": "516344e00ef16fc9fc000026",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "chargebacked",
    "date_created": "2013-04-08T22:29:52.103Z",
    "amount": "1000",
    "id": "516344e00ef16fc9fc000025",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "approved",
    "date_created": "2013-04-08T22:29:46.042Z",
    "amount": "1000",
    "id": "516344da0ef16fc9fc000024",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "chargebacked",
    "date_created": "2013-04-08T22:29:46.003Z",
    "amount": "1000",
    "id": "516344da0ef16fc9fc000023",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "approved",
    "date_created": "2013-04-08T22:29:37.909Z",
    "amount": "1000",
    "id": "516344d10ef16fc9fc000022",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "approved",
    "date_created": "2013-04-08T22:29:37.894Z",
    "amount": "1000",
    "id": "516344d10ef16fc9fc000021",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "chargebacked",
    "date_created": "2013-04-08T22:29:37.854Z",
    "amount": "1000",
    "id": "516344d10ef16fc9fc000020",
    "live": true,
    "costumer_name": "Jose da Silva"
  },
  {
    "status": "approved",
    "date_created": "2013-04-08T22:29:24.375Z",
    "amount": "1000",
    "id": "516344c40ef16fc9fc00001f",
    "live": true,
    "costumer_name": "Jose da Silva"
  }
]</code></pre>

