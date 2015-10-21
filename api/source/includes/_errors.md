# Erros

## Erros da API

> Exemplo:

```json
{
    "errors": [{
        "type": "invalid_parameter",
        "parameter_name": "api_key",
        "message": "api_key está faltando"
    }],
    "url": "/transactions",
    "method": "get"
}
```

Os possíveis erros retornados da API são:

- `invalid_parameter`: quando algum parâmetro passado está incorreto/faltando.


- `action_forbidden`: quando o usuário não tem permissão para fazer determinada ação.


- `internal_error`: quando algum erro interno em nosso servidor ocorreu.


- `not_found`: quando o recurso procurado não foi encontrado/não existe.


## Erros na geração do card_hash

> Exemplo:

```json
{
   "card_number": "Número do cartão inválido.",
   "card_holder_name": "Nome do portador inválido.",
   "card_expiration_month": "Mês de expiração inválido.",
   "card_expiration_year": "Ano de expiração inválido.",
   "card_cvv": "Código de segurança inválido."
}
```

Antes do `card_hash` ser criado, é verificado se os dados do cartão estão corretos, caso algum item esteja errado, será retornado um objeto com todos os valores incorretos.
