# Saldo

## Objeto `balance`

> Objeto balance

```json
{
    "object": "balance",
    "waiting_funds": {
        "amount": 0
    },
    "available": {
        "amount": 3169323
    },
    "transferred": {
        "amount": 3163500
    }
}
```

Com este objeto, você pode obter informações gerais sobre o saldo da sua conta.

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `balance` |
| **waiting_funds**<br> Object | Possui a propriedade `amount`, que representa quanto, em centavos, você tem a receber do Pagar.me |
| **available**<br> Object | Possui a propriedade `amount`, que representa quanto, em centavos, você tem disponível em sua conta Pagar.me |
| **transferred**<br> Object | Possui a propriedade `amount`, que representa quanto, em centavos, você já transferiu para sua conta bancária (quanto já recebeu efetivamente) |

## Saldo geral das operações de sua empresa (company)

> GET https://api.pagar.me/1/balance

```shell
curl -X  GET https://api.pagar.me/1/balance \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
```

```php
```

```cs
```

Com essa rota `/balance` você poderá consultar o saldo gerado pelas suas transações.

**OBS**: os valores retornados estão em **centavos**.

> JSON Retornado (Exemplo)

```json
{
    "object": "balance",
    "waiting_funds": {
        "amount": 0
    },
    "available": {
        "amount": 3019898
    },
    "transferred": {
        "amount": 3163500
    }
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |

## Saldo geral de um recebedor específico

> GET https://api.pagar.me/1/recipients/:id/balance

```shell
curl -X GET https://api.pagar.me/1/recipients/re_ci7nhf1ay0007n016wd5t22nl/balance \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna o balanço de saldo de um determinado recebedor.

> JSON Retornado (Exemplo)

```json
{
    "object": "balance",
    "waiting_funds": {
        "amount": 0
    },
    "available": {
        "amount": 0
    },
    "transferred": {
        "amount": 0
    }
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível em sua Dashboard) |
| **:id**<br> <span class="required">obrigatório</span> | Id do recebedor desejado |
