---
title: Pagamento dentro do seu site

language_tabs:
  - shell
  - ruby
  - php

search: true
---

# Pagamento dentro do seu site

Com o Pagar.me, você pode realizar a captura dos dados de cartão sem que o seu
cliente precise sair da sua página. Para que o processo aconteça de forma
segura, você precisará incluir nosso JavaScript (`Pagarme.js`) na sua página
para realizar a captura desses dados.

Após receber o `card_hash`, o seu servidor deve realizar a transação junto ao
Pagar.me, que efetuará a transação no cartão do cliente.

Para boletos bancários, não é necessário utilizar o `Pagarme.js`, já que não há
a transmissão de dados sensíveis entre o browser do cliente, o seu servidor e o
Pagar.me.

## Inserindo o Pagarme.js na sua página {#inserting-pagarme-js}

Primeiro, insira o seguinte código antes do final da seção `head` da sua página HTML:

```html
<script src="https://pagar.me/assets/pagarme.js"></script>
```

Depois, insira o seu formulário para digitar os dados de cartão.

```html
<form id="payment_form" action="https://seusite.com.br/transactions/new" method="POST">
	Número do cartão: <input type="text" id="card_number"/>
	<br/>
	Nome (como escrito no cartão): <input type="text" id="card_holder_name"/>
	<br/>
	Mês de expiração: <input type="text" id="card_expiration_month"/>
	<br/>
	Ano de expiração: <input type="text" id="card_expiration_year"/>
	<br/>
	Código de segurança: <input type="text" id="card_cvv"/>
	<br/>
	<div id="field_errors">
	</div>
	<br/>
	<input type="submit"></input>
</form>
```

Nesse exemplo, usaremos o jQuery para gerar e inserir o `card_hash` no seu formulário, 
então incluiremos esse script antes do final da seção `head` da sua página HTML:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
```

Agora, no seu JavaScript, você precisará detectar quando o botão do formulário
for pressionado e, a partir daí, chamar o `Pagarme.js` para gerar o `card_hash`
e substituir os outros campos dos dados de cartão por ele:

```javascript
$(document).ready(function() { // quando o jQuery estiver carregado...
	PagarMe.encryption_key = "ek_test_Ec8KhxISQ1tug1b8bCGxC2nXfxqRmk";

	var form = $("#payment_form");

	form.submit(function(event) { // quando o form for enviado...
		// inicializa um objeto de cartão de crédito e completa
		// com os dados do form
		var creditCard = new PagarMe.creditCard();
		creditCard.cardHolderName = $("#payment_form #card_holder_name").val();
		creditCard.cardExpirationMonth = $("#payment_form #card_expiration_month").val();
		creditCard.cardExpirationYear = $("#payment_form #card_expiration_year").val();
		creditCard.cardNumber = $("#payment_form #card_number").val();
		creditCard.cardCVV = $("#payment_form #card_cvv").val();

		// pega os erros de validação nos campos do form
		var fieldErrors = creditCard.fieldErrors();

		//Verifica se há erros
		var hasErrors = false;
		for(var field in fieldErrors) { hasErrors = true; break; }

		if(hasErrors) {
			// realiza o tratamento de errors
			alert(fieldErrors);
		} else {
			// se não há erros, gera o card_hash...
			creditCard.generateHash(function(cardHash) {
				// ...coloca-o no form...
				form.append($('<input type="hidden" name="card_hash">').val(cardHash));
				// ...remove os campos com os dados de cartão do form...
				PagarMe.removeCardFieldsFromForm(form);
				// e envia o form
				form.get(0).submit();
			});
		}

		return false;
	});
});
```

> Não se esqueça de substituir `ek_test_Ec8KhxISQ1tug1b8bCcxC2nXfxqRnk` pela
> sua chave de encriptação disponível no seu
> [Dashboard](https://dashboard.pagar.me/).

## Realizando uma transação de cartão de crédito

Com o `card_hash` em mãos no seu servidor, agora basta realizar a transação:

```shell
curl -X POST 'https://api.pagar.me/1/transactions' \
    -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
    -d 'amount=1000' \
    -d 'card_hash={CARD_HASH}'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.new({
	:amount => 1000,
    :card_hash => "{CARD_HASH}"
})

transaction.charge

status = transaction.status # status da transação
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$transaction = new PagarMe_Transaction(array(
		'amount' => 1000,
		'card_hash' => "{CARD_HASH}"
	));

	$transaction->charge();

	$status = $transaction->status; // status da transação
?>
```

> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu [Dashboard](https://dashboard.pagar.me/).

Após realizar uma transação de cartão de crédito, a mesma terá status
`paid`, indicando que o cartão do usuário foi debitado com sucesso.

Se a transação for recusada pelas operadoras de cartão, a mesma terá status
`refused`.

## Realizando uma transação de boleto bancário

Uma transação de boleto bancária deve ser realizada diretamente do seu
servidor, sem a necessidade de utilizar o `card_hash`, já que não há
transmissão de dados sensíveis para o seu servidor e para o Pagar.me.

```shell
curl -X POST 'https://api.pagar.me/1/transactions' \
    -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
    -d 'amount=1000' \
    -d 'payment_method=boleto'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.new({
	:amount => 1000,
    :payment_method => "boleto"
})

transaction.charge

boleto_url = transaction.boleto_url # URL do boleto bancário
boleto_barcode = transaction.boleto_barcode # código de barras do boleto bancário
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$transaction = new PagarMe_Transaction(array(
		'amount' => 1000,
		'payment_method' => "boleto"
	));

	$transaction->charge();

	$boleto_url = transaction->boleto_url; // URL do boleto bancário
	$boleto_barcode = transaction->boleto_barcode; // código de barras do boleto bancário
?>
```

> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu [Dashboard](https://dashboard.pagar.me/).

A transação terá status `waiting_payment` até o pagamento do boleto
bancário. A URL do boleto bancário para pagamento estará disponível na variável
`boleto_url`.

Quando o boleto bancário for detectado como pago, a transação passará a ter o
status `paid`.

## Recebendo notificações de mudança de status da transação (POSTback)

Ao realizar uma transação, diversos serviços externos (como empresas de
antifraude, operadoras de cartão e bancos) são consultados. Por isso, esse
processo pode demorar um pouco mais do que uma requisição HTTP normal, que
costuma durar menos de um segundo.

Para evitar que o tempo de resposta da requisição prejudique sua aplicação, ao
criar uma transação, você pode fornecer uma `postback_url`. Dessa forma, quando
a transação mudar de status, o Pagar.me notificará sua aplicação e o fluxo de
compra pode ser finalizado.

As URLs de POSTback também são úteis ao criar transações de boleto bancário.
Dessa forma, quando o pagamento do boleto for detectado junto ao banco, sua
aplicação será notificada e o fluxo de compra pode ser finalizado.

Caso a transação seja estornada, a URL de POSTback também será notificada sobre
a mudança de status.

```shell
curl -X POST 'https://api.pagar.me/1/transactions' \
    -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
    -d 'amount=1000' \
    -d 'card_hash={CARD_HASH}' \
	-d 'postback_url=http://seusite.com/payments/2718'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.new({
	:amount => 1000,
    :card_hash => "{CARD_HASH}",
	:postback_url => "http://seusite.com/payments/2718"
})

transaction.charge
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$transaction = new PagarMe_Transaction(array(
		'amount' => 1000,
		'card_hash' => "{CARD_HASH}",
		'postback_url' => "http://seusite.com/payments/2718"
	));

	$transaction->charge();
?>
```

> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu [Dashboard](https://dashboard.pagar.me/).

<aside class="notice">Você pode utilizar o serviço
[RequestBin](http://requestb.in) para gerar URLs de POSTback de teste e
visualizar as requisições enviadas pelo Pagar.me.</aside>

Quando a `postback_url` é passada, a transação será retornada com status
`processing`, e as mudanças de status serão enviadas para o seu servidor na URL
de POSTback, através de um request `HTTP POST` com os seguintes parâmetros:

Parâmetro | Descrição | Valor padrão 
--- | --- | ---------
object | Objeto que originou a notificação de POSTback | `transaction`
id | ID do objeto (transação) que originou a notificação de POSTback | ---
event | Evento que originou a notificação de POSTback | `transaction_status_changed`
current_status | Status da transação após o evento | ---
old_status | Status da transação antes do evento | ---
desired_status | Status desejado após o evento | Ao criar a transação: `paid`. Ao estornar a transação: `refunded` |
fingerprint | Parâmetro usado para validar a notificação de POSTback ([saiba mais](/advanced#validando-a-origem-de-um-postback)) | ---

## Enviando dados do cliente para o Pagar.me (antifraude)

Para ter um maior controle dos seus clientes, principalmente através do
Dashboard do Pagar.me, recomendamos que você também envie os dados do cliente
ao realizar a transação.

<aside class="notice">Para utilizar o recurso antifraude, é obrigatório o envio
dos dados do cliente para o Pagar.me.</aside>

```shell
curl -X POST 'https://api.pagar.me/1/transactions' \
    -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
    -d 'amount=1000' \
    -d 'card_hash={CARD_HASH}' \
	-d 'customer[name]=John Appleseed' \
	-d 'customer[document_number]=92545278157' \
	-d 'customer[email]=jappleseed@apple.com' \
	-d 'customer[address][street]=Av. Brigadeiro Faria Lima' \
	-d 'customer[address][zipcode]=01452000' \
	-d 'customer[address][street_number]=2941' \
	-d 'customer[address][complementary]=8º andar' \
	-d 'customer[phone][ddd]=11' \
	-d 'customer[phone][number]=30713261' \
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.new({
	:amount => 1000,
    :card_hash => "{CARD_HASH}",
	:customer => {
		:name => "John Appleseed",
		:document_number => "92545278157",
		:email => "jappleseed@apple.com",
		:address => {
			:street => "Av. Brigadeiro Faria Lima",
			:zipcode => "01452000",
			:street_number => "2941",
			:complementary => "8º andar"
		},
		:phone => {
			:ddd => "11"
			:number => "30713261"
		}
	}
})

transaction.charge
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$transaction = new PagarMe_Transaction(array(
		"amount" => 1000,
		"card_hash" => "{CARD_HASH}",
		"customer" => array(
			"name" => "John Appleseed",
			"document_number" => "92545278157",
			"email" => "jappleseed@apple.com",
			"address" => array(
				"street" => "Av. Brigadeiro Faria Lima",
				"zipcode" => "01452000",
				"street_number" => "2941",
				"complementary" => "8º andar"
			),
			"phone" => array(
				"ddd" => "11",
				"number" => "30713261"
			)
		}
	));

	$transaction->charge();
?>
```
> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu [Dashboard](https://dashboard.pagar.me/).
