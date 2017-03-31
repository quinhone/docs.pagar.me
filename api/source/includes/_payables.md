# Recebíveis

## Objeto `payable`

> Objeto payable

```json
{
  "object": "payable",
  "id": 1167628,
  "status": "waiting_funds",
  "amount": 41667,
  "fee": 4167,
  "anticipation_fee": 0,
  "installment": 12,
  "transaction_id": 1373781,
  "split_rule_id": null,
  "bulk_anticipation_id": null,
  "recipient_id": "re_cimcpc2qc002za46d9dt4vfok",
  "payment_date": "2018-03-13T03:00:00.000Z",
  "original_payment_date": null,
  "type": "credit",
  "payment_method": "credit_card",
  "date_created": "2017-03-16T19:51:02.533Z"
}
```

Objeto contendo os dados de um recebível. O recebível (`payable`) é gerado automaticamente após uma transação ser paga, para cada parcela de uma transação é gerado um recebível, que também podem ser divididos por recebedor (no caso de um split ter sido feito).

**Ex**: Uma transação paga com 5 parcelas e 3 recebedores nas regras de split irá gerar 15 (5 x 3) recebíveis. Com isso você tem controle sobre a menor divisão possível de um pagamento. 

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `payable` |
| **id**<br> Number | Identificador do recebível |
| **status**<br> String | Estado atual do recebível. <br> **Valores possíveis**: `waiting_funds`, `paid`, `suspended` |
| **amount**<br> Number | Valor em centavos que foi pago |
| **fee**<br> Number | Valor em centavos que foi cobrado (taxa) |
| **anticipation_fee**<br> Number | Valor em centavos que foi cobrado (taxa) em case de antecipação |
| **installment**<br> Number | Número da parcela |
| **transaction_id**<br> Number | Identificador da transação que gerou o recebível |
| **split_rule_id**<br> String | Identificador da regra de split do recebível |
| **bulk_anticipation_id**<br> String | Identificador da antecipação do recebível, se criada |
| **recipient_id**<br> String | Identificador do recebedor a quem pertence este recebível |
| **payment_date**<br> String | Dia e hora do pagamento (ISODate) |
| **original_payment_date**<br> String | Dia e hora do pagamento original (ISODate) |
| **type**<br> String | Tipo do recebível. <br> **Valores possíveis**: `credit`, `refund` e `chargeback` |
| **payment_method**<br> String | Tipo de pagamento da transação |
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
  "id": 1167628,
  "status": "waiting_funds",
  "amount": 41667,
  "fee": 4167,
  "anticipation_fee": 0,
  "installment": 12,
  "transaction_id": 1373781,
  "split_rule_id": null,
  "bulk_anticipation_id": null,
  "recipient_id": "re_cimcpc2qc002za46d9dt4vfok",
  "payment_date": "2018-03-13T03:00:00.000Z",
  "original_payment_date": null,
  "type": "credit",
  "payment_method": "credit_card",
  "date_created": "2017-03-16T19:51:02.533Z"
},
{
  "object": "payable",
  "id": 1167627,
  "status": "waiting_funds",
  "amount": 41667,
  "fee": 4167,
  "anticipation_fee": 0,
  "installment": 11,
  "transaction_id": 1373781,
  "split_rule_id": null,
  "bulk_anticipation_id": null,
  "recipient_id": "re_cimcpc2qc002za46d9dt4vfok",
  "payment_date": "2018-02-14T02:00:00.000Z",
  "original_payment_date": null,
  "type": "credit",
  "payment_method": "credit_card",
  "date_created": "2017-03-16T19:51:02.533Z"
},
{
  "object": "payable",
  "id": 1167626,
  "status": "waiting_funds",
  "amount": 41667,
  "fee": 4167,
  "anticipation_fee": 0,
  "installment": 10,
  "transaction_id": 1373781,
  "split_rule_id": null,
  "bulk_anticipation_id": null,
  "recipient_id": "re_cimcpc2qc002za46d9dt4vfok",
  "payment_date": "2018-01-11T02:00:00.000Z",
  "original_payment_date": null,
  "type": "credit",
  "payment_method": "credit_card",
  "date_created": "2017-03-16T19:51:02.533Z"
}]
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |

<aside class="notice">OBS: Você pode passar qualquer propriedade e valor presentes nos objetos `payable` como parâmetro de busca/filtro nesta rota. Ex: `status="waiting_funds"` ou `recipient_id="re_ci7nhf1ay0007n016wd5t22nl"` <br> <br>Também é possível filtrar por intervalo de tempo, definindo um intervalo para o parâmetro `payment_date`. </aside>

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
  "id": 1167628,
  "status": "waiting_funds",
  "amount": 41667,
  "fee": 4167,
  "anticipation_fee": 0,
  "installment": 12,
  "transaction_id": 1373781,
  "split_rule_id": null,
  "bulk_anticipation_id": null,
  "recipient_id": "re_cimcpc2qc002za46d9dt4vfok",
  "payment_date": "2018-03-13T03:00:00.000Z",
  "original_payment_date": null,
  "type": "credit",
  "payment_method": "credit_card",
  "date_created": "2017-03-16T19:51:02.533Z"
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **:id**<br> <span class="required">obrigatório</span> | Id do recebível |

## Status de um recebível 

Seus recebíveis podem ter os seguintes status: 

* `waiting_funds` : Valor do recebível ainda não foi passado à pagar.me. 

* `paid` : Valor do recebível já foi passado à pagar.me, e está disponível para saque. 

* `suspended` : Recebível pertence à uma transação que está com status **chargedback**. Sendo que o status só vai mudar caso o chargeback seja revertido.
