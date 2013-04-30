---
title: Métodos da API
---

# Métodos da API

Todas os métodos devem ser chamados utilizando HTTPS e devem apresentar o parâmetro `api_key`, contendo a chave de acesso da API disponível no seu [dashboard](https://dashboard.pagar.me).

O endpoint da API é:

	https://api.pagar.me/1


A API é [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) e a resposta do servidor é no formato [JSON](http://www.json.org).

## POST /transactions

**Descrição**: realiza uma transação.

**Parâmetros**: 

- `api_key` (obrigatório): a chave de acesso a API do PagarMe.
- `amount` (obrigatório) - o valor da transação, com centavos, sem vírgulas ou pontos. Ex: se o valor da transação é de R$49,90, o valor de `amount` será `4990`
- `installments` (opcional) - o número de parcelas da transação. Ex: `3`. Caso esse parâmetro não seja passado, a transação não será parcelada (`1` parcela)


- `card_number` (obrigatório) - o número do cartão de crédito, sem espaços ou separadores. Ex: `4532519433391701`
- `card_expiracy_date` (obrigatório) - mês (2 dígitos) seguidos do ano (2 dígitos) de expiração do cartão de crédito. Ex: se a data de expiração do cartão é 05/2016, o valor de `amount` será `0516`
- `card_holder_name` (obrigatório) - o nome do portador do cartão, como escrito neste. Ex: `Jose da Silva`
- `card_cvv` (obrigatório) - o código de segurança do cartão, como escrito nele. Exemplo: `314`

Os quatro parâmetros com os dados do cartão podem ser substituídos pelo `card_hash`, o que aumenta consideravelmente a segurança da transação. Para mais informações sobre o `card_hash`, [consulte a referência do *card_hash*](/restful-api/card-hash).

- `card_hash` (obrigatório) - o conteúdo encriptado dos dados do cartão de crédito.

**Resposta**:

<pre><code data-language="javascript">{
    "status": "approved",
    "date_created": "2013-04-08T01:01:56.672Z",
    "amount": "4990",
    "installments": "4",
    "id": "516217040ef16fc9fc00000f",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
}</code></pre>

## DELETE /transactions/:id

**Descrição**: cancela uma transação.

**Parâmetros**: 

- `api_key` (obrigatório): a chave de acesso a API do PagarMe.
- `id` (obrigatório) - o ID da transação a ser cancelada, retornado ao realizá-la

**Resposta**:

<pre><code data-language="javascript">{
    "status": "chargebacked",
    "date_created": "2013-04-08T01:01:56.672Z",
    "amount": "4990",
    "installments": "4",
    "id": "516217040ef16fc9fc00000f",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
}</code></pre>

## GET /transactions/:id

**Descrição**: retorna os dados de uma transação a partir do ID desta.

**Parâmetros**: 

- `api_key` (obrigatório): a chave de acesso a API do PagarMe.

**Resposta**:

<pre><code data-language="javascript">{
    "status": "approved",
    "date_created": "2013-04-08T01:01:56.672Z",
    "amount": "4990",
    "installments": "4",
    "id": "516217040ef16fc9fc00000f",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
}</code></pre>

## GET /transactions

**Descrição**: retorna as últimas transações realizadas.

**Parâmetros**: 

- `api_key` (obrigatório): a chave de acesso a API do PagarMe.
- `page` (opcional) - página a ser consultada. Valor padrão: `1`
- `count` (opcional) - número de transações a ser retornado por página. Valor padrão: `10`

**Resposta**:

<pre><code data-language="javascript">{
    "status": "approved",
    "date_created": "2013-04-16T02:03:54.828Z",
    "amount": "10000",
    "installments": "5",
    "id": "516cb18a8f3c6f9fd7000013",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "chargebacked",
    "date_created": "2013-04-16T02:03:54.459Z",
    "amount": "1000",
    "installments": "1",
    "id": "516cb18a8f3c6f9fd7000011",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "approved",
    "date_created": "2013-04-16T02:03:43.653Z",
    "amount": "10000",
    "installments": "5",
    "id": "516cb17f8f3c6f9fd700000f",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "chargebacked",
    "date_created": "2013-04-16T02:03:43.421Z",
    "amount": "1000",
    "installments": "1",
    "id": "516cb17f8f3c6f9fd700000d",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "approved",
    "date_created": "2013-04-16T02:03:38.315Z",
    "amount": "10000",
    "installments": "5",
    "id": "516cb17a8f3c6f9fd700000b",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "chargebacked",
    "date_created": "2013-04-16T02:03:38.136Z",
    "amount": "1000",
    "installments": "1",
    "id": "516cb17a8f3c6f9fd7000009",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "approved",
    "date_created": "2013-04-16T02:02:55.878Z",
    "amount": "10000",
    "installments": "5",
    "id": "516cb14f8f3c6f9fd7000007",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "chargebacked",
    "date_created": "2013-04-16T02:02:55.657Z",
    "amount": "1000",
    "installments": "1",
    "id": "516cb14f8f3c6f9fd7000005",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "chargebacked",
    "date_created": "2013-04-16T02:01:37.672Z",
    "amount": "1000",
    "installments": "1",
    "id": "516cb1018f3c6f9fd7000002",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  },
  {
    "status": "approved",
    "date_created": "2013-04-16T01:55:50.954Z",
    "amount": "1000",
    "installments": "4",
    "id": "516cafa6ab745d5fd7000004",
    "live": true,
    "costumer_name": "Jose da Silva",
    "card_last_digits": "4448"
  }
]</code></pre>

## GET /transactions/card_hash_key

**Descrição**: retorna os dados para realizar a encriptação dos dados do cartão de crédito, gerando um `card_hash`. Para mais informações, [consulte a referência sobre o *card_hash*](/restful-api/card-hash).

**Parâmetros**:

- `encryption_key` (obrigatório): a chave de encriptação disponível no seu dashboard. Essa chave deve ser usada sempre que o `card_hash` é gerado do lado do cliente. Dessa forma, a `api_key` não é exposta e permanece em segredo.

Caso o `card_hash` esteja sendo gerado do lado do servidor, a `api_key` pode ser usada para autenticação, como em outros requests.

- `api_key` (obrigatório): a chave de acesso a API do PagarMe.

**Resposta**:

<pre><code data-language="javascript">{
    "date_created": "2013-04-13T21:42:03.886Z",
    "id": "5169d12b3da665f36e00000a",
    "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv71aNn1njtjcSrPXW7LF\nZlxajpBht/jq/+pl77eiZEVyNnP1nHlmkM4ufZmZQF7Q8seTUEBjR2PjoocCrFsP\nsu9+ITFnqAqlYmAVXKFf/gCCQfPDfhsavQXVauDAHXyl/69ooWIMUrYmCmxpZfSU\ne9E/4dl7sUg1ywllU8EpMKIn8Zd7blk49pNZ8I2FlkLRLk3yS9JXDIe8dAZLHoZP\nyT1c/5p1czLoB7Q9k5ic2A4ZM3cwCVkbIKC4wEmFuQCQx4tu1J96kvXhVLYoZlvV\n6+u8apFpFQVpTAK71IVYJbTQjHHty1qtZMImw42YM0kFz0GqhfQk3LKziBDX/FHq\nRQIDAQAB\n-----END PUBLIC KEY-----\n"
}</code></pre>

