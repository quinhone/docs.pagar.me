---
title: Guia de integração em Javascript
---

# Guia de integração em Javascript

O objetivo da biblioteca em Javascript é exclusivamente gerar o `card_hash`, que permitirá transmitir de forma segura os dados do cartão de crédito do browser do seu cliente para o seu servidor e, posteriormente, para o servidor do PagarMe, onde a transação será efetuada.

## Importando a biblioteca

Para importar a biblioteca em Javascript, adicione ao `head` de sua página HTML:

<pre><code data-language="html"><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="https://api.pagar.me/libraries/pagarme.js"></script>
</code></pre>

Dessa forma, tem-se uma página HTML similar a:

<pre><code data-language="html">&lt;html&gt;
    &lt;head&gt;
        &lt;!-- conte&uacute;do do seu head --&gt;
        &lt;script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;https://api.pagar.me/libraries/pagarme.js&quot;&gt;&lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        <!-- conte&uacute;do da sua p&aacute;gina -->
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>

## Formulário

Na página de pagamento, deverá haver um formulário para digitar os dados do cartão de crédito:

<pre><code data-language="html">&lt;html&gt;
    &lt;head&gt;
    	&lt;!-- conte&uacute;do do seu head --&gt;
    	&lt;script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js&quot;&gt;&lt;/script&gt;
    	&lt;script src=&quot;https://api.pagar.me/libraries/pagarme.js&quot;&gt;&lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
    	&lt;form id=&quot;payment_form&quot; action=&quot;https://seusite.com.br/transactions/new&quot; method=&quot;POST&quot;&gt;
    		Número do cartão: &lt;input type=&quot;text&quot; id=&quot;card_number&quot;/&gt;
    		&lt;br/&gt;
    		Nome (como escrito no cartão): &lt;input type=&quot;text&quot; id=&quot;card_holder_name&quot;/&gt;
    		&lt;br/&gt;
    		Mês de expiração: &lt;input type=&quot;text&quot; id=&quot;card_expiracy_month&quot;/&gt;
    		&lt;br/&gt;
    		Ano de expiração: &lt;input type=&quot;text&quot; id=&quot;card_expiracy_year&quot;/&gt;
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

Um exemplo de utilização da biblioteca do PagarMe sua página, que deve ser inserido dentro de uma tag `script` dentro do `head`:

<pre><code data-language="javascript"><script>
$(document).ready(function() {
    PagarMe.encryption_key = "9741a03ea3a4f15f6fa8d9fe9d2c47c8";

    var form = $("#payment_form");

    form.submit(function(event) {
    	var creditCard = new PagarMe.creditCard();
    	creditCard.fillFromFrom(form);

    	var fieldErrors = creditCard.fieldErrors();

    	var hasErrors = false;
    	for(var field in fieldErrors) { hasErrors = true; break; }

    	$("#payment_form #card_number").css('border', '3px solid green');
    	$("#payment_form #card_holder_name").css('border', '3px solid green');
    	$("#payment_form #card_expiracy_month").css('border', '3px solid green');
    	$("#payment_form #card_expiracy_year").css('border', '3px solid green');
    	$("#payment_form #card_cvv").css('border', '3px solid green');

    	if(hasErrors) {
    		for(var fieldName in fieldErrors) {
    			var field = $(form.find("#" + fieldName)[0]);
    			field.css('border', '3px solid red');
    		}

    		return false;
    	}

    	creditCard.generateHash(function(cardHash) {
    		form.append($('<input type="hidden" name="card_hash"/>').val(cardHash));
    		form.get(0).submit();
    	});

    	return false;
    });
});
</script>
</code></pre>

## Página de exemplo

Assim, tem-se a seguinte página de exemplo de uso da biblioteca do PagarMe:

<pre><code data-language="html">&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Example page&lt;/title&gt;
        &lt;script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;pagarme.js&quot;&gt;&lt;/script&gt;

        &lt;script&gt;
            $(document).ready(function() {
                PagarMe.encryption_key = &quot;9741a03ea3a4f15f6fa8d9fe9d2c47c8&quot;;

                var form = $(&quot;#payment_form&quot;);

                form.submit(function(event) {
                	var creditCard = new PagarMe.creditCard();
                	creditCard.fillFromFrom(form);

                	var fieldErrors = creditCard.fieldErrors();

                	var hasErrors = false;
                	for(var field in fieldErrors) { hasErrors = true; break; }

                	$(&quot;#payment_form #card_number&quot;).css('border', '3px solid green');
                	$(&quot;#payment_form #card_holder_name&quot;).css('border', '3px solid green');
                	$(&quot;#payment_form #card_expiracy_month&quot;).css('border', '3px solid green');
                	$(&quot;#payment_form #card_expiracy_year&quot;).css('border', '3px solid green');
                	$(&quot;#payment_form #card_cvv&quot;).css('border', '3px solid green');

                	if(hasErrors) {
                		for(var fieldName in fieldErrors) {
                			var field = $(form.find(&quot;#&quot; + fieldName)[0]);
                			field.css('border', '3px solid red');
                		}

                		return false;
                	}

                	creditCard.generateHash(function(cardHash) {
                		form.append($('&lt;input type=&quot;hidden&quot; name=&quot;card_hash&quot;/&gt;').val(cardHash));
                		form.get(0).submit();
                	});

                	return false;
                });
            });
        &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;form id=&quot;payment_form&quot; action=&quot;https://seusite.com.br/transactions/new&quot; method=&quot;POST&quot;&gt;
            Card number: &lt;input type=&quot;text&quot; id=&quot;card_number&quot;/&gt;
            &lt;br/&gt;
            Card holder name: &lt;input type=&quot;text&quot; id=&quot;card_holder_name&quot;/&gt;
            &lt;br/&gt;
            Card expiracy month: &lt;input type=&quot;text&quot; id=&quot;card_expiracy_month&quot;/&gt;
            &lt;br/&gt;
            Card expiracy year: &lt;input type=&quot;text&quot; id=&quot;card_expiracy_year&quot;/&gt;
            &lt;br/&gt;
            Card security code: &lt;input type=&quot;text&quot; id=&quot;card_cvv&quot;/&gt;
            &lt;br/&gt;
            &lt;div id=&quot;field_errors&quot;&gt;
            &lt;/div&gt;
            &lt;br/&gt;
            &lt;input type=&quot;submit&quot;&gt;&lt;/input&gt;
        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>
