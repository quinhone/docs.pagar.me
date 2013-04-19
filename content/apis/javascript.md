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

## Utilizando a biblioteca
