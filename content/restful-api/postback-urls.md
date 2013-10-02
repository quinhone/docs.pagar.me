---
title: URL de POSTback
---

# URL de POSTback

O POSTback permite que o seu servidor seja notificado sempre que o `status` de uma transação mudar. Isso é possível definindo uma URL de POSTback para a transação ao criá-la. Dessa forma, quando ocorrerem modificações no `status` da transação, você receberá uma requisição HTTP na URL definida, notificando-o da mudança ocorrida.

A principal vantagem desse método é que ao realizar a transação com o Pagar.me, não será necessário esperar a resposta do servidor para saber se a transação foi aprovada ou não. Ao criar a transação, será inicialmente retornado na requisição o status `processing`, indicando que ela ainda está sendo processada. Quando ela for aprovada/recusada, o Pagar.me fará uma requisição a URL de POSTback para notificar seu servidor da mudança de `status`.

**Nota**: o uso de URLs de POSTback é opcional. Caso você não forneça uma ao realizar a transação, a requisição só será retornada quando a transação tiver um `status` definitivo.

## Definindo uma URL de POSTback

Conforme descrito nas [referências dos métodos da API](/docs/restful-api/methods), para definir uma URL de POSTback para a transação, basta enviar o parâmetro `postback_url` na requisição para criar uma nova transação:

	POST /transactions

Nota: a URL deve seguir o formato padrão. Exemplo: 

	http://www.meusite.com.br/transactions_postback

## Recebendo o POSTback

Quando o status da transação mudar, o Pagar.me fará uma requisição HTTP POST a URL de POSTback com os seguintes parâmetros:

- `id` - id da transação (retornado ao realizá-la)
- `old_status` - status da transação antes de ter mudado
- `desired_status` - status desejado. Caso se deseja aprovar a transação, o status desejado seria `paid`. Caso se deseja cancelá-la, o status desejado seria `chargebacked`.
- `current_status` - status atual (modificado) da transação.
- `fingerprint` - validador da origem do POSTback. Veja mais na seção de [validação de origem](#validate-origin).

O seu servidor deverá interpretar esses parâmetros e realizar as ações/modificações necessárias de acordo com a mudança de status.

## Validando a origem do POSTback {#validate-origin}

É possível verificar se a origem do POSTback é válida através do parâmetro `fingerprint` que é enviado em todo POSTback.

O parâmetro `fingerprint` é o hash `SHA1` calculado a partir da string:

`id_da_transacao#sua_chave_de_api_key`

**Exemplo**: se o `id` da transação é `1579` e a sua `api_key` é `ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo`, o `fingerprint` será o `SHA1` da string:

`1579#ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo`.

Sendo, portanto, 

`1b0b4ce85634f19d8af0c226194ebdbdcb1fadcd`

## Exemplo de uso da URL de POSTback

### Realizando uma transação

Para realizar uma transação com uma URL de POSTback, basta passá-la no parâmetro `postback_url`. Nesse exemplo, será usada a seguinte URL:

	http://www.meusite.com.br/transactions_postback

Realizando a transação com o cURL:

<pre><code data-language="javascript">curl -X POST 'https://api.pagar.me/1/transactions' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo' \
-d 'amount=1590' \
-d 'card_number=4901720080344448' \
-d 'card_holder_name=Jose da Silva' \
-d 'card_expiracy_date=1215' \
-d 'card_cvv=314' \
-d 'postback_url=http://www.meusite.com.br/transactions_postback'
</code></pre>

Retorno:

<pre><code data-language="javascript">{
    "status": "processing",
    "refuse_reason": null,
    "date_created": "2013-10-02T19:04:56.000Z",
    "amount": 1590,
    "installments": 1,
    "id": 1557,
    "card_holder_name": "Jose da Silva",
    "card_last_digits": "4448",
    "card_brand": "visa",
    "postback_url": "http://www.meusite.com.br/transactions_postback",
    "payment_method": "credit_card",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "subscription_id": null,
    "customer": null,
    "address": null,
    "phone": null
}</code></pre>

A resposta da requisição será retornada imediatamente com o status `processing`, indicando que ela ainda está sendo processada. Quando ela for aprovada, o Pagar.me fará uma requisição para a URL de POSTback (`http://www.meusite.com.br/transactions_postback`) com os seguintes parâmetros:

- `id`: `1557`
- `old_status`: `processing`
- `desired_status`: `paid`
- `current_status`: `paid`

A partir desses parâmetros, seu servidor pode realizar as ações/modificações necessárias, como por exemplo ativar a conta de um cliente que teve a transação aprovada.

### Cancelando uma transação

Para cancelar a transação realizada anteriormente, com o cURL:

<pre><code data-language="shell">curl -X POST 'https://api.pagar.me/1/transactions/1557/refund' \
    -d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo'
</code></pre>

Retorno:

<pre><code data-language="javascript">{
    "status": "paid",
    "refuse_reason": null,
    "date_created": "2013-10-02T19:04:56.000Z",
    "amount": 1590,
    "installments": 1,
    "id": 1557,
    "card_holder_name": "Jose da Silva",
    "card_last_digits": "4448",
    "card_brand": "visa",
    "postback_url": "http://www.meusite.com.br/transactions_postback",
    "payment_method": "credit_card",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "subscription_id": null,
    "customer": null,
    "address": null,
    "phone": null
}</code></pre>

A transação será retornada com o status `paid`, porque o cancelamento ainda está sendo processado. Quando a transação tiver sido cancelada, o Pagar.me fará uma requisição para a URL de POSTback com os seguintes parâmetros

- `id`: `1557`
- `old_status`: `paid`
- `desired_status`: `chargebacked`
- `current_status`: `chargebacked`

A partir desses parâmetros, seu servidor pode realizar as ações/modificações necessárias, como por exemplo cancelar a conta de um cliente que teve a transação cancelada.

