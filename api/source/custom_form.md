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
[Checkout](#), você precisará incluir nosso JavaScript (`Pagarme.js`) na sua página para
realizar a captura dos dados de cartão de forma segura.

O `Pagarme.js` irá realizar a geração do `card_hash`, que é uma representação
criptografada dos dados de cartão de crédito. O `card_hash` é o único dado de
cartão que deverá sair do browser do cliente.

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


### Configurações do Checkout

Tag | Padrão | Descrição
--- | ------ | ---------
data-encryption-key | --- | Chave de encriptação disponível no seu dashboard.
data-amount | --- | Valor da transação (em centavos) a ser capturada pelo Checkout. Ex: R$14,79 = `1479`
data-button-text | `Pagar` | Texto do botão de pagamento.
data-button-class | --- | Classe CSS a ser adicionada no botão de pagamento.
data-customer-data | `true` | Caso não deseje capturar dados do cliente pelo Checkout, setar como `false`.
data-payment-methods | `credit_card,boleto` | Meios de pagamento disponíveis no Checkout.
data-card-brands | `visa,mastercard,amex,aura,jcb,diners,elo` | Bandeiras aceitas pelo Checkout.
data-max-installments | `1` | Número máximo de parcelas aceitas.
data-ui-color | `#1a6ee1` | Cor primária da interface de Checkout.

## Capturando a transação

```shell
curl -X POST "https://api.pagar.me/1/transactions/{TOKEN}/capture"
  -d 'amount=1000'
  -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.find_by_id("{TOKEN}")
transaction.capture(1000)
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$transaction = PagarMe_Transaction::findById("{TOKEN}");
	$transaction->capture(1000);
?>
```

> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu
> [Dashboard](https://dashboard.pagar.me/).

Com o `token` em mãos, agora basta realizar a captura da transação no seu
servidor. Por motivos de segurança, você precisará fornecer novamente o valor a
ser capturado.

Após realizar a captura de uma transação de cartão de crédito, a transação
terá status `paid`, indicando que o cartão do usuário foi debitado com sucesso.

Caso a transação seja um boleto bancário, a transação terá status
`waiting_payment` e a URL do boleto bancário para pagamento estará disponível na
variável `boleto_url`.

<aside class="notice">Após a finalização da transação em sua página, você terá
05 minutos para capturá-la no seu servidor. Após esse período, a transação será
recusada pelo motivo `capture_timeout`.</aside>
