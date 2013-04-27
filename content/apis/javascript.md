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

Na página de pagamento, deverá haver um form para digitar os dados do cartão de crédito:

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

<pre><code data-language="javascript">$(document).ready(function() { // o jQuery precisa estar carregado para obter os dados do form...
    // insira sua encryption_key, disponível no seu dashboard
    PagarMe.encryption_key = "< sua encryption_key >";

    var form = $("#payment_form");

    form.submit(function(event) { // quando o form for enviado...
        // inicializa um objeto de cartão de crédito e completa
        // com os dados do form
        var creditCard = new PagarMe.creditCard();
        creditCard.fillFromFrom(form);

        // pega os erros de validação nos campos do form
        var fieldErrors = creditCard.fieldErrors();

        var hasErrors = false;
        for(var field in fieldErrors) { hasErrors = true; break; }

        // insere uma borda verde em todos os campos
        $("#payment_form #card_number").css('border', '3px solid green');
        $("#payment_form #card_holder_name").css('border', '3px solid green');
        $("#payment_form #card_expiracy_month").css('border', '3px solid green');
        $("#payment_form #card_expiracy_year").css('border', '3px solid green');
        $("#payment_form #card_cvv").css('border', '3px solid green');

        if(hasErrors) {
            for(var fieldName in fieldErrors) {
                var field = $(form.find("#" + fieldName)[0]);
                field.css('border', '3px solid red');
                // insere uma borda vermelha indicando um erro nesse campo
            }

            // não continua se há algum erro
            return false;
        }

        // se não há erros, gera o card_hash...
        creditCard.generateHash(function(cardHash) {
            // ...coloca-o no form...
            form.append($('<input type="hidden" name="card_hash"/>').val(cardHash));
            // ...remove os campos com os dados de cartão do form...
            PagarMe.removeCardFieldsFromForm(form);
            // e envia o form
            form.get(0).submit();
        });

        return false;
    });
});
</code></pre>

Quando o `form` é enviado, é criado um objeto com os dados de cartão de crédito presentes nele. Se foram encontrados erros de validação nos dados do `form`, é inserida uma borda vermelha no campo para indicar o erro.

Caso não hajam erros de validação dos campos, o `card_hash` é gerado e inserido no `form`. Todos os outros campos com os dados de cartão são substituídos pelo `card_hash`, e então o `form` é enviado.

## Página de exemplo

Uma página com o código de exemplo usado acima pode ser encontrada [aqui](https://github.com/pagarme/).
