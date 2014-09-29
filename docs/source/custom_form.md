---
title: Integração via formulário próprio

language_tabs:
  - shell
  - ruby
  - php

search: true
---

# Integração via formulário próprio

Com o Pagar.me, você pode realizar a captura dos dados de cartão sem que o seu
cliente precise sair da sua página. Para que o processo aconteça de forma
segura, você precisará incluir nosso JavaScript (`Pagarme.js`) na sua página
para realizar a captura desses dados.

O `Pagarme.js` irá realizar a geração do `card_hash`, um valor que representa
de forma segura os dados de cartão do cliente. O `card_hash` é o único dado de
cartão que deverá ser enviado do browser do cliente para o seu servidor.

Após receber o `card_hash`, o seu servidor deve realizar a transação junto ao
Pagar.me, que efetuará a transação no cartão do cliente.

Para boletos bancários, não é necessário utilizar o `Pagarme.js`, já que não há
a transmissão de dados sensíveis entre o browser do cliente, o seu servidor e o
Pagar.me.

<aside class="notice">Caso você prefira uma integração mais simples, você
também pode usar o nosso <a href="/checkout.html">Checkout</a> para se conectar
com o Pagar.me</aside>

## Inserindo o Pagarme.js na sua página

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
?>
```

> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu [Dashboard](https://dashboard.pagar.me/).

A transação terá status `waiting_payment` até o pagamento do boleto
bancário. A URL do boleto bancário para pagamento estará disponível na variável
`boleto_url`.

Quando o boleto bancário for detectado como pago, a transação passará a ter o
status `paid`.

## Enviando dados adicionais para o Pagar.me (metadata)

Você pode também enviar dados adicionais para o Pagar.me (ID do pedido em seu
sistema, carrinho de compras, características do produto, etc.) através do
campo `metadata`.

Dessa forma, você poderá visualizar, exportar e efetuar buscas pelos dados do
seu negócio através do seu [Dashboard](https://dashboard.pagar.me).

Para enviar esses dados para o Pagar.me, basta configurar as chaves/valores das
variáveis que você deseja enviar dentro do campo `metadata`.

```shell
curl -X POST 'https://api.pagar.me/1/transactions' \
    -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
    -d 'amount=1000' \
    -d 'card_hash={CARD_HASH}' \
	-d 'metadata[id_pedido]=12345' \
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.new({
	:amount => 1000,
    :card_hash => "{CARD_HASH}",
	:metadata => {
		:id_pedido => 12345
	}
})

transaction.charge
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$transaction = new PagarMe_Transaction(array(
		'amount' => 1000,
		'card_hash' => "{CARD_HASH}"
		'metadata' => array(
			'id_pedido' => 12345
		)
	));

	$transaction->charge();
?>
```
