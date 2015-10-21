# Recebíveis

## Objeto `payable`

> Objeto payable

```json
{
    "object": "payable",
    "id": 1465,
    "status": "paid",
    "amount": 700,
    "fee": 80,
    "installment": null,
    "transaction_id": 191517,
    "split_rule_id": "sr_ci7xsejbp000awq16wr5rkweh",
    "payment_date": "2015-03-31T03:00:00.000Z",
    "type": null,
    "date_created": "2015-03-31T22:16:21.000Z"
}
```

Objeto contendo os dados de um recebível. O recebível (`payable`) é gerado automaticamente após uma transação ser paga, para cada parcela de uma transação é gerado um recebível, que também podem ser divididos por recebedor (no caso de um split ter sido feito).

**Ex**: Uma transação paga com 5 parcelas e 3 recebedores nas regras de split irá gerar 15 (5 x 3) recebíveis. Com isso você tem controle sobre a menor divisão possível de um pagamento. 

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `payable` |
| **id**<br> Number | Identificador do recebível |
| **status**<br> String | Estado atual do recebível. <br> **Valores possíveis**: `waiting_funds`, `paid` |
| **amount**<br> Number | Valor em centavos que foi pago |
| **fee**<br> Number | Valor em centavos que foi cobrado (taxa) |
| **installment**<br> Number | Número da parcela |
| **transaction_id**<br> Number | Identificador da transação que gerou o recebível |
| **split_rule_id**<br> String | Identificador da regra de split do recebível |
| **payment_date**<br> String | Dia e hora do pagamento (ISODate) |
| **type**<br> String | Tipo do recebível. <br> **Valores possíveis**: `credit`, `refund` e `chargeback` |
| **date_created**<br> String | Data da criação do objeto (ISODate) |

## Retornando recebíveis

> GET https://api.pagar.me/1/payables

```shell
curl -X GET https://api.pagar.me/1/payables \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'count=3' \
-d 'page=1'
```

```ruby
```

```php
```

```cs
```

Retorna todos os recebíveis da sua empresa.

> JSON Retornado (Exemplo)

```json
[{
    "object": "payable",
    "id": 1465,
    "status": "paid",
    "amount": 700,
    "fee": 80,
    "installment": null,
    "transaction_id": 191517,
    "split_rule_id": "sr_ci7xsejbp000awq16wr5rkweh",
    "payment_date": "2015-03-31T03:00:00.000Z",
    "type": null,
    "date_created": "2015-03-31T22:16:21.000Z"
}, {
    "object": "payable",
    "id": 1464,
    "status": "paid",
    "amount": 300,
    "fee": 35,
    "installment": null,
    "transaction_id": 191517,
    "split_rule_id": "sr_ci7xsejbn0009wq16h3ybjgif",
    "payment_date": "2015-03-31T03:00:00.000Z",
    "type": null,
    "date_created": "2015-03-31T22:16:21.000Z"
}, {
    "object": "payable",
    "id": 1462,
    "status": "paid",
    "amount": 91000,
    "fee": 0,
    "installment": null,
    "transaction_id": 191508,
    "split_rule_id": "sr_ci7xru0nx005ckx16zjnvft7x",
    "payment_date": "2015-03-31T03:00:00.000Z",
    "type": null,
    "date_created": "2015-03-31T20:43:05.000Z"
}]
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |

<aside class="notice">OBS: Você pode passar qualquer propriedade e valor presentes nos objetos `payable` como parâmetro de busca/filtro nesta rota. Ex: `status="waiting_funds"` ou `recipient_id="re_ci7nhf1ay0007n016wd5t22nl"`</aside>

## Retornando um recebível

> GET https://api.pagar.me/1/payables/:id

```shell
curl -X GET https://api.pagar.me/1/payables/1465 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna um recebível de sua conta.

> JSON Retornado (Exemplo)

```json
{
    "object": "payable",
    "id": 1465,
    "status": "paid",
    "amount": 700,
    "fee": 80,
    "installment": null,
    "transaction_id": 191517,
    "split_rule_id": "sr_ci7xsejbp000awq16wr5rkweh",
    "payment_date": "2015-03-31T03:00:00.000Z",
    "type": null,
    "date_created": "2015-03-31T22:16:21.000Z"
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **:id**<br> <span class="required">obrigatório</span> | Id do recebível |


