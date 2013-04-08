---
title: Conheçendo a API
---

# Conheçendo a API

Aqui será mostrado o funcionamento básico da API RESTful do PagarMe. As requisições serão feitas utilizando o [cURL](http://curl.haxx.se).

A API é [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) e a resposta do servidor é no formato [JSON](http://www.json.org).

### Endpoint

O endpoint da API do PagarMe é:

	https://api.pagar.me/1/

Todas as requisições devem ser feitas utilizando HTTPS.

### Autenticação

Todas as requisições devem apresentar o parâmetro `api_key`, contendo a chave de acesso a API disponível no seu [dashboard](https://dashboard.pagar.me).

### Realizando uma transação

A URL para realizar uma transação é:

	https://api.pagar.me/1/transactions/

O método HTTP a ser utilizado é `POST`.

Uma transação exige os seguintes parâmetros

- `card_number` - O número do cartão de crédito para a cobrança.
- `card_holder_name` - O nome do portador do cartão, como escrito nele.
- `card_expiracy_date` - O mês e os dois últimos digitos do ano de expiração do cartão, seguidos, sem separação.
- `card_cvv` - O código de segurança do cartão.
- `amount` - O valor a ser transacionado, com centavos, sem vírgulas ou pontos.

Realizando uma transação com o cURL:

	curl -X POST 'https://api.pagar.me/1/transactions' \
		-d 'api_key=Jy1V5bJcGf8q4gHepttt' \
		-d 'card_number=4901720080344448' \
		-d 'card_holder_name=Pedro Franceschi' \
		-d 'card_expiracy_date=1213' \
		-d 'card_cvv=314' \
		-d 'amount=1000'

Caso os dados sejam válidos, o servidor retornará:

	{
	  "status": "approved",
	  "date_created": "2013-04-08T01:01:56.672Z",
	  "amount": "1000",
	  "id": "516217040ef16fc9fc00000f",
	  "live": true,
	  "costumer_name": "Pedro Franceschi"
	}

O `id` de transação retornado deverá ser usado para realizar um possível estorno ou verificar futuramente o status dessa transação.

### Verificando o status de uma transação

### Estornando uma cobrança
