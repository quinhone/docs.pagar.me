---
title: Conheçendo a API
---

# Conheçendo a API

Aqui será mostrado o funcionamento básico da API RESTful do PagarMe. As requisições serão feitas utilizando o [cURL](http://curl.haxx.se).

A API é [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) e a resposta do servidor é no formato [JSON](http://www.json.org).

### Requisições

O endpoint da API do PagarMe é:

	https://api.pagar.me/1/

Todas as requisições devem ser feitas utilizando HTTPS e devem apresentar o parâmetro `api_key`, contendo a chave de acesso da API disponível no seu [dashboard](https://dashboard.pagar.me).

Nesse guia, a `api_key` usada de exemplo será `Jy1V5bJcGf8q4gHepttt`.

### Realizando uma transação

A requisição que deve ser feita no endpoint para realizar uma transação é:

	POST /transactions

Uma transação exige os seguintes parâmetros

- `card_number` - O número do cartão de crédito para a cobrança.
- `card_holder_name` - O nome do portador do cartão, como escrito nele.
- `card_expiracy_date` - O mês e os dois últimos digitos do ano de expiração do cartão, seguidos, sem separação.
- `card_cvv` - O código de segurança do cartão.
- `amount` - O valor a ser transacionado, com centavos, sem vírgulas ou pontos.

Realizando uma transação com o cURL:

	curl 'https://api.pagar.me/1/transactions' \
		-d 'api_key=Jy1V5bJcGf8q4gHepttt' \
		-d 'card_number=4901720080344448' \
		-d 'card_holder_name=Usuario de Teste' \
		-d 'card_expiracy_date=1213' \
		-d 'card_cvv=314' \
		-d 'amount=1000' \
		-X POST 

Caso os parâmetros sejam válidos, o servidor retornará:

	{
	  "status": "approved",
	  "date_created": "2013-04-08T01:01:56.672Z",
	  "amount": "1000",
	  "id": "516217040ef16fc9fc00000f",
	  "live": true,
	  "costumer_name": "Usuario de Teste"
	}

O status `approved` indica que a transação foi realizada com sucesso.

O `id` de transação retornado deverá ser usado para verificar futuramente o status dessa transação ou realizar um possível estorno.

### Verificando o status de uma transação

A requisição que deve ser feita no endpoint para verificar o status de uma transação é:

	GET /transactions/:id

Onde `:id` é o ID da transação que se deseja verificar o status.

Para verificar o status da transação realizada anteriormente, iremos usar como `id` de exemplo `516217040ef16fc9fc00000f`.

Verificando o status da transação com o cURL:

	curl 'https://api.pagar.me/1/transactions/516217040ef16fc9fc00000f' \
		-d 'api_key=Jy1V5bJcGf8q4gHepttt' \
		-X GET 

O servidor retornará:

	{
	  "status": "approved",
	  "date_created": "2013-04-08T01:01:56.672Z",
	  "amount": "1000",
	  "id": "516217040ef16fc9fc00000f",
	  "live": true,
	  "costumer_name": "Usuario de Teste"
	}

### Estornando uma transação

A requisição que deve ser feita no endpoint para estornar uma transação é:

	POST /transactions/:id/chargeback

Onde `:id` é o ID da transação que se deseja estornar.

Para estornar a transação realizada anteriormente, iremos usar como `id` de exemplo `516217040ef16fc9fc00000f`.

Estornando a transação com o cURL:

	curl 'https://api.pagar.me/1/transactions/516217040ef16fc9fc00000f/chargeback' \
		-d 'api_key=Jy1V5bJcGf8q4gHepttt' \
		-X POST

O servidor retornará:

	{
	  "status": "chargebacked",
	  "date_created": "2013-04-08T01:01:56.672Z",
	  "amount": "1000",
	  "id": "516217040ef16fc9fc00000f",
	  "live": true,
	  "costumer_name": "Usuario de Teste"
	}

O status `chargebacked` indica que a transação foi estornada com sucesso.
