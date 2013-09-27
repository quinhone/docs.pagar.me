---
title: Métodos da API
---

# Métodos da API

Todas os métodos devem ser chamados utilizando HTTPS e devem apresentar o parâmetro `api_key`, contendo a chave de acesso da API disponível no seu [dashboard](https://dashboard.pagar.me).

O endpoint da API é:

	https://api.pagar.me/1


A API é [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) e a resposta do servidor é no formato [JSON](http://www.json.org).

## [POST /transactions](/docs/restful-api/transactions/index.html#post-transaction)

## [POST /transactions/:id/refund](/docs/restful-api/transactions/index.html#post-transaction-refund)

## [GET /transactions/:id](/docs/restful-api/transactions/index.html#get-transaction)

## [GET /transactions](/docs/restful-api/transactions/index.html#get-transactions)

## [GET /transactions/card_hash_key](/docs/restful-api/transactions/index.html#get-card-hash-key)

## [GET /customers](/docs/restful-api/customers/index.html#get-customers)

## [GET /customers/:id](/docs/restful-api/customers/index.html#get-customer)
