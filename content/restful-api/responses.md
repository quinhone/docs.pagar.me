---
title: Respostas de sucesso/erro
---

# Respostas de sucesso/erro

## Código HTTP = 200 (sucesso)

Respostas da API com o código HTTP 200 significam que a requisição foi tratada e executada normalmente.

## Código HTTP != 200 (erro)

Respostas da API com o código HTTP diferente de 200 significam que a requisição não conseguiu ser processada devido a um erro.

Todas as respostas de erro do servidor apresentam, além do código de resposta HTTP diferente de 200, o seguinte formato:

<pre><code data-language="javascript">{
    "error": "Mensagem de erro",
    "url": "/url/da/requisicao",
    "method": "método da requisição ('get' ou 'post')"
}</code></pre>

Além da mensagem de erro retornada, os códigos de resposta HTTP representam:

### HTTP 400

Esse erro é retornado quando os parâmetros da requisição são inválidos ou a requisição foi mal formulada.

### HTTP 401

Esse erro é retornado quando os parâmetros de autenticação - `api_key` ou `encryption_key` - são inválidos e, portanto, ocorre um erro de autenticação.

### HTTP 404

Esse erro é retornado quando algum objeto requisitado pelo request não é encontrado. Exemplo:

	GET /transactions/:id

Quando o `id` da transação solicitada não existe, o código de erro 404 é retornado.

### HTTP 500

Esse erro é retornado quando ocorre um erro interno no servidor, não havendo relação com os parâmetros fornecidos na requisição.

Caso a API responda alguma requisição com esse código de erro, por favor [entre em contato conosco](mailto:pedro@pagar.me).
