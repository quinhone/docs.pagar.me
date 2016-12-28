# Operações de saldo

## Objeto `balance_operation`

> Objeto balance_operation

```json
{
    "object": "balance_operation",
    "id": 4861,
    "status": "available",
    "balance_amount": 3019898,
    "balance_old_amount": 2920013,
    "type": "payable",
    "amount": 100000,
    "fee": 115,
    "date_created": "2015-03-06T21:00:31.000Z",
    "movement_object": {
        "object": "payable",
        "id": 1297,
        "status": "paid",
        "amount": 100000,
        "fee": 115,
        "installment": 1,
        "transaction_id": 185537,
        "payment_date": "2015-03-06T03:00:00.000Z",
        "date_created": "2015-03-06T21:00:31.000Z"
    }
}
```

Com este objeto você poderá acompanhar como estava/está seu saldo a cada movimentação bancária.

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `balance_operation` |
| **id**<br> String | Identificador da operação |
| **status**<br> String | Estado do saldo da conta. <br> **Valores possíveis**: `waiting_funds`, `available` e `transferred` |
| **balance_amount**<br> Number | Saldo atual da conta |
| **type**<br> String | O que gerou a movimentação. <br> **Valores possíveis**: `payable`, `transfer` ou `anticipation` |
| **amount**<br> Number | Valor transacionado para a conta |
| **fee**<br> Number | Taxa cobrada pela transação |
| **date_created**<br> String | Data da movimentação |
| **movement_object**<br> Object | Objeto da origem da movimentação |

## Histórico das operações

> GET https://api.pagar.me/1/balance/operations

```shell
curl -X  GET https://api.pagar.me/1/balance/operations \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
```

```php
```

```cs
```

Com a rota `/balance/operations` você poderá ver todos os movimentos ocorridos no saldo da sua conta.

> JSON Retornado (Exemplo)

```json
[{
    "object": "balance_operation",
    "id": 4861,
    "status": "available",
    "balance_amount": 3019898,
    "balance_old_amount": 2920013,
    "type": "payable",
    "amount": 100000,
    "fee": 115,
    "date_created": "2015-03-06T21:00:31.000Z",
    "movement_object": {
        "object": "payable",
        "id": 1297,
        "status": "paid",
        "amount": 100000,
        "fee": 115,
        "installment": 1,
        "transaction_id": 185537,
        "payment_date": "2015-03-06T03:00:00.000Z",
        "date_created": "2015-03-06T21:00:31.000Z"
    }
}, {
    "object": "balance_operation",
    "id": 4852,
    "status": "available",
    "balance_amount": 2920013,
    "balance_old_amount": 2910128,
    "type": "payable",
    "amount": 10000,
    "fee": 115,
    "date_created": "2015-03-06T18:44:42.000Z",
    "movement_object": {
        "object": "payable",
        "id": 1294,
        "status": "paid",
        "amount": 10000,
        "fee": 115,
        "installment": 1,
        "transaction_id": 185507,
        "payment_date": "2015-03-06T03:00:00.000Z",
        "date_created": "2015-03-06T18:44:42.000Z"
    }
}, {
    "object": "balance_operation",
    "id": 4840,
    "status": "available",
    "balance_amount": 2910128,
    "balance_old_amount": 2880243,
    "type": "payable",
    "amount": 30000,
    "fee": 115,
    "date_created": "2015-03-05T19:32:36.000Z",
    "movement_object": {
        "object": "payable",
        "id": 1290,
        "status": "paid",
        "amount": 30000,
        "fee": 115,
        "installment": 1,
        "transaction_id": 185273,
        "payment_date": "2015-03-05T03:00:00.000Z",
        "date_created": "2015-03-05T19:32:35.000Z"
    }
}]
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **count**<br> default: `10` | Retorna `n` objetos de operação de saldo |
| **page**<br> default: `1` | Útil para implementação de uma paginação de resultados |
| **status**<br> default: `available` | Estado do saldo da conta. Valores possíveis: waiting_funds, available e transferred |
## Histórico específico de uma operação 

> GET https://api.pagar.me/1/balance/operations/:id

```shell
curl -X  GET https://api.pagar.me/1/balance/operations/4861 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
```

```php
```

```cs
```

Com a rota `/balance/operations/:id` você poderá ver uma operação específica ocorrida no saldo da sua conta.

> JSON Retornado (Exemplo)

```json
{
    "object": "balance_operation",
    "id": 4861,
    "status": "available",
    "balance_amount": 3019898,
    "balance_old_amount": 2920013,
    "type": "payable",
    "amount": 100000,
    "fee": 115,
    "date_created": "2015-03-06T21:00:31.000Z",
    "movement_object": {
        "object": "payable",
        "id": 1297,
        "status": "paid",
        "amount": 100000,
        "fee": 115,
        "installment": 1,
        "transaction_id": 185537,
        "payment_date": "2015-03-06T03:00:00.000Z",
        "date_created": "2015-03-06T21:00:31.000Z"
    }
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **:id**<br> <span class="required">obrigatório</span> | Id da operação desejada |


