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
  "errors": [
    {
      "type": "tipo do erro",
      "parameter_name": "nome do parâmetro inválido",
      "message": "mensagem do erro"
    }
  ],
  "url": "/transactions",
  "method": "post"
}</code></pre>

Um array de erros que ocorreram é retornado dentro de `errors`. Cada elemento apresenta um `type`, indicando o tipo do erro ocorrido; um `parameter_name`, indicando o nome do parâmetro que causou o erro (se houver algum); e uma `message`, sendo uma mensagem em português sobre o erro.

### Tipos de erro

- `invalid_parameter`: parâmetro inválido ou vazio. Verificar o `parameter_name` e `message` para saber o motivo do erro e qual parâmetro o causou.
- `action_forbidden`: ação não permitida. Ocorre quando se tenta realizar algo inválido (como estornar uma transação já estornada).
- `not_found`: objeto não encontrado. Ocorre quando se tenta realizar alguma operação em um objeto que não existe (como, por exemplo, ao tentar obter dados de uma transação com um `id` inválido).
- `internal_error`: erro interno. Ocorre quando ocorre um erro interno no Pagar.me, nãa havendo relação com os dados enviados.

Além dos tipos de erro, os códigos de resposta HTTP representam:

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
