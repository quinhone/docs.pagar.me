---
title: Guia de integração em Javascript - Pagarme.js
---

# Guia de integração em Javascript - Pagarme.js

Para manter sua página de pagamento segura é necessário integrar com nossa biblioteca Javascript, o `Pagarme.js`, que irá cuidar de toda segurança na sua página.

O objetivo do `Pagarme.js` é [gerar o `card_hash`](/docs/restful-api/card-hash), que permitirá transmitir de forma segura os dados do cartão de crédito do browser do seu cliente para o seu servidor e, posteriormente, para o servidor do Pagar.me, onde a transação será efetuada.

Se o seu site não utiliza `HTTPS`, o uso do `Pagarme.js` é obrigatório.

## Importando a biblioteca

Para importar a biblioteca em Javascript, adicione ao `head` de sua página HTML:

<pre><code data-language="html"><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="https://pagar.me/assets/pagarme.js"></script>
</code></pre>

Dessa forma, tem-se uma página HTML similar a:

<pre><code data-language="html">&lt;html&gt;
    &lt;head&gt;
        &lt;!-- conte&uacute;do do seu head --&gt;
        &lt;script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;https://pagar.me/assets/pagarme.js&quot;&gt;&lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        <!-- conte&uacute;do da sua p&aacute;gina -->
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

## Formulário

Na página de pagamento, deverá haver um form para digitar os dados do cartão de crédito:

<pre><code data-language="html">&lt;html&gt;
    &lt;head&gt;
        &lt;!-- conte&uacute;do do seu head --&gt;
        &lt;script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;https://pagar.me/assets/pagarme.js&quot;&gt;&lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;form id=&quot;payment_form&quot; action=&quot;https://seusite.com.br/transactions/new&quot; method=&quot;POST&quot;&gt;
            Número do cartão: &lt;input type=&quot;text&quot; id=&quot;card_number&quot;/&gt;
            &lt;br/&gt;
            Nome (como escrito no cartão): &lt;input type=&quot;text&quot; id=&quot;card_holder_name&quot;/&gt;
            &lt;br/&gt;
            Mês de expiração: &lt;input type=&quot;text&quot; id=&quot;card_expiration_month&quot;/&gt;
            &lt;br/&gt;
            Ano de expiração: &lt;input type=&quot;text&quot; id=&quot;card_expiration_year&quot;/&gt;
            &lt;br/&gt;
            Código de segurança: &lt;input type=&quot;text&quot; id=&quot;card_cvv&quot;/&gt;
            &lt;br/&gt;
            &lt;div id=&quot;field_errors&quot;&gt;
            &lt;/div&gt;
            &lt;br/&gt;
            &lt;input type=&quot;submit&quot;&gt;&lt;/input&gt;
        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

## Utilizando a biblioteca

Um exemplo de utilização da biblioteca do Pagar.me sua página, que deve ser inserido dentro de uma tag `script` dentro do `head`:

<pre><code data-language="javascript">$(document).ready(function() { // o jQuery precisa estar carregado para obter os dados do form...
    // insira sua encryption_key, disponível no dashboard
    PagarMe.encryption_key = "< sua encryption_key >";

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
			alert(fieldErrors);
		} else {
       			// se não há erros, gera o card_hash...
    		    	creditCard.generateHash(function(cardHash) {
			// ...coloca-o no form...
       		     	form.append($('<input type="hidden" name="card_hash"/>').val(cardHash));
			// ...remove os campos com os dados de cartão do form...
			PagarMe.removeCardFieldsFromForm(form);
			// e envia o form
      			form.get(0).submit();
        	});
		}

        return false;
    });
});
</code></pre>

Quando o `form` é enviado, é criado um objeto com os dados de cartão de crédito presentes nele. Se forem encontrados erros de validação nos dados do `form`, eles são alertados.

Caso não hajam erros de validação dos campos, o `card_hash` é gerado e inserido no `form`. Todos os outros campos com os dados de cartão são removidos, já que o `card_hash` contém as informações de todos eles. A partir daí, o `form` é enviado para o seu servidor.
