---
title: URL de POSTback
---

# URL de POSTback

O POSTback permite que o seu servidor seja notificado sempre que o `status` de uma transação mudar. Isso é possível definindo uma URL de POSTback para a transação ao criá-la. Dessa forma, quando ocorrerem modificações no `status` da transação, você receberá uma requisição HTTP na URL definida, notificando-o da mudança ocorrida.

A principal vantagem desse método é que ao realizar a transação com o PagarMe, não será necessário esperar a resposta do servidor para saber se a transação foi aprovada ou não. Ao criar a transação, será inicialmente retornado na requisição o status `processing`, indicando que ela ainda está sendo processada. Quando ela for aprovada/recusada, o PagarMe fará uma requisição a URL de POSTback para notificar seu servidor da mudança de `status`.

**Nota**: o uso de URLs de POSTback é opcional. Caso você não forneça uma ao realizar a transação, a requisição só será retornada quando a transação tiver um `status` definitivo.

## Definindo uma URL de POSTback

Conforme descrito nas [referências dos métodos da API](/restful-api/methods), para definir uma URL de POSTback para a transação, basta enviar o parâmetro `postback_url` na requisição para criar uma nova transação:

	POST /transactions

Nota: a URL deve seguir o formato padrão. Exemplo: 

	http://www.meusite.com.br/transactions_postback

## Recebendo o POSTback

Quando o status da transação mudar, o PagarMe fará uma requisição HTTP POST a URL de POSTback com os seguintes parâmetros:

- `id` - id da transação (retornado ao realizá-la)
- `old_status` - status da transação antes de ter mudado
- `desired_status` - status desejado. Caso se deseja aprovar a transação, o status desejado seria `approved`. Caso se deseja cancelá-la, o status desejado seria `chargebacked`.
- `current_status` - status atual (modificado) da transação.

O seu servidor deverá interpretar esses parâmetros e realizar as ações/modificações necessárias de acordo com a mudança de status.

## Exemplo de uso da URL de POSTback

### Realizando uma transação

Para realizar uma transação com uma URL de POSTback, basta passá-la no parâmetro `postback_url`. Nesse exemplo, será usada a seguinte URL:

	http://www.meusite.com.br/transactions_postback

Realizando a transação com o cURL:

<pre><code data-language="shell">curl 'https://api.pagar.me/1/transactions' \
    -d 'api_key=Jy1V5bJcGf8q4gHepttt' \
    -d 'card_number=4901720080344448' \
    -d 'card_holder_name=Usuario de Teste' \
    -d 'card_expiracy_date=1213' \
    -d 'card_cvv=314' \
    -d 'amount=1000' \
    -d 'postback_url=http://www.meusite.com.br/transactions_postback' \
    -X POST 
</code></pre>

Retorno:

<pre><code data-language="javascript">{
    "status": "processing",
    "date_created": "2013-06-20T19:26:49.000Z",
    "amount": "1000",
    "installments": 1,
    "id": 448,
    "live": true,
    "costumer_name": "Usuario de Teste",
    "card_last_digits": "4448",
    "postback_url": "http://www.meusite.com.br/transactions_postback"
}</code></pre>

A resposta da requisição será retornada imediatamente com o status `processing`, indicando que ela ainda está sendo processada. Quando ela for aprovada, o PagarMe fará uma requisição para a URL de POSTback (`http://www.meusite.com.br/transactions_postback`) com os seguintes parâmetros:

- `id`: `448`
- `old_status`: `processing`
- `desired_status`: `approved`
- `current_status`: `approved`

A partir desses parâmetros, seu servidor pode realizar as ações/modificações necessárias, como por exemplo ativar a conta de um cliente que teve a transação aprovada.

### Cancelando uma transação

Para cancelar a transação realizada anteriormente, com o cURL:

<pre><code data-language="shell">curl 'https://api.pagar.me/1/transactions/448' \
    -d 'api_key=Jy1V5bJcGf8q4gHepttt' \
    -X DELETE
</code></pre>

Retorno:

<pre><code data-language="javascript">{
    "status": "approved",
    "date_created": "2013-06-20T19:26:49.000Z",
    "amount": 1000,
    "installments": 1,
    "id": 448,
    "live": false,
    "costumer_name": "Usuario de Teste",
    "card_last_digits": "4448",
    "postback_url": "http://www.meusite.com.br/transactions_postback"
}</code></pre>

A transação será retornada com o status `approved`, porque o cancelamento ainda está sendo processado. Quando a transação tiver sido cancelada, o PagarMe fará uma requisição para a URL de POSTback com os seguintes parâmetros

- `id`: `448`
- `old_status`: `approved`
- `desired_status`: `chargebacked`
- `current_status`: `chargebacked`

A partir desses parâmetros, seu servidor pode realizar as ações/modificações necessárias, como por exemplo cancelar a conta de um cliente que teve a transação cancelada.
