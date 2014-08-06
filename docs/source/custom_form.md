---
title: Integração via formulário próprio

language_tabs:
  - shell
  - ruby
  - php

search: true
---

# Integração via formulário próprio

Caso você prefira utilizar seu próprio formulário ao invés do nosso
[Checkout](/checkout), você precisará incluir nosso JavaScript (`Pagarme.js`) na sua
página para realizar a captura dos dados de cartão de forma segura.

O `Pagarme.js` irá realizar a geração do `card_hash`, que é uma representação
criptografada dos dados de cartão de crédito do cliente. O `card_hash` é o
único dado de cartão que deverá ser enviado para o seu servidor.

O `card_hash` é usado apenas para transações de cartão de crédito.

## Inserindo o Pagarme.js

Primeiro, insira o seguinte código antes do final da seção `head` da sua página HTML:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
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

Agora, no seu JavaScript, você precisará detectar quando o botão do formulário
for pressionado e, a partir daí, chamar o `Pagarme.js` para gerar o `card_hash`:

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

Com o `card_hash` em mãos, agora basta realizar a transação no seu servidor:

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
servidor, sem o uso do `card_hash` já que não há transmissão de dados sensíveis
para o Pagar.me

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
