# Transferências

## Objeto `transfer`

> Objeto transfer

```json
{
    "object": "transfer",
    "id": 480,
    "amount": 13000,
    "type": "doc",
    "status": "pending_transfer",
    "fee": 367,
    "funding_estimated_date": "2015-03-21T15:44:14.417Z",
    "bank_account": {
        "object": "bank_account",
        "id": 4840,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT",
        "charge_transfer_fees": false,
        "date_created": "2015-03-19T15:35:40.000Z"
    },
    "date_created": "2015-03-20T15:44:14.000Z"
}
```

Objeto retornado ao se criar uma transferência bancária.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `transfer` |
| `id` | `Number` | Número identificador da transação |
| `amount` | `Number` | Valor, em centavos, do valor transferido |
| `type` | `String` | Tipo da transação. <br> **Valores possíveis**: `ted`, `doc` ou `credito_em_conta` |
| `status` | `String` | Estado no qual a transação se encontra. <br> **Valores possíveis**: `pending_transfer`, `transferred`, `failed`, `processing` ou `canceled` |
| `fee` | `Number` | Taxa cobrada pela transferência, em centavos. |
| `funding_date` | `String` | Data da ocorrência da transferência |
| `funding_estimated_date` | `String` | Data estimada para efetivação da transferência (ISODate) |
| `transaction_id` | `Number` | Identificador da transação estornada |
| `bank_account` | `Object` | Objeto contendo os dados da [conta bancária](/?shell#objeto-bank_account) que irá receber a transferência |
| `date_created` | `String` | Data da criação da transferência (ISODate) |

## Criando uma transferência

> POST https://api.pagar.me/1/transfers

```shell
curl -X POST https://api.pagar.me/1/transfers \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'amount=13000' \
-d 'bank_account_id=4840'
```

```ruby
```

```php
```

```cs
```

Realiza uma transferência para uma conta bancária previamente criada.

> JSON Retornado (Exemplo)

```json
{
    "object": "transfer",
    "id": 480,
    "amount": 13000,
    "type": "doc",
    "status": "pending_transfer",
    "fee": 367,
    "funding_estimated_date": "2015-03-21T15:44:14.417Z",
    "bank_account": {
        "object": "bank_account",
        "id": 4840,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT",
        "charge_transfer_fees": false,
        "date_created": "2015-03-19T15:35:40.000Z"
    },
    "date_created": "2015-03-20T15:44:14.000Z"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `amount` | Sim | - | Valor, em centavos, a ser transferido para uma determinada conta bancária |
| `bank_account_id` | Não* | - | Número identificador da conta bancária que irá receber a transferência. <br> **OBS**: Caso tenha sido passado um `recipient_id`, se o parâmetro `bank_account_id` for omitido, o valor será depositado na conta bancária definida no recebedor informado |
| `recipient_id` | Não* | - | Indica que o valor da transferência sairá da conta do recebedor identificado por este parâmetro |

## Vendo dados de uma transferência

> GET https://api.pagar.me/1/transfers/:id

```shell
curl -X GET https://api.pagar.me/1/transfers/484 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna os dados de uma transferência previamente realizada.

> JSON Retornado (Exemplo)

```json
{
    "object": "transfer",
    "id": 480,
    "amount": 13000,
    "type": "doc",
    "status": "pending_transfer",
    "fee": 367,
    "funding_estimated_date": "2015-03-21T15:44:14.417Z",
    "bank_account": {
        "object": "bank_account",
        "id": 4840,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT",
        "charge_transfer_fees": false,
        "date_created": "2015-03-19T15:35:40.000Z"
    },
    "date_created": "2015-03-20T15:44:14.000Z"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Vendo dados de várias transferências

> GET https://api.pagar.me/1/transfers

```shell
curl -X GET https://api.pagar.me/1/transfers \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna os dados de todas as transferências previamente realizadas.

> JSON Retornado (Exemplo)

```json
{
    "object": "transfer",
    "id": 480,
    "amount": 13000,
    "type": "doc",
    "status": "pending_transfer",
    "fee": 367,
    "funding_estimated_date": "2015-03-21T15:44:14.417Z",
    "bank_account": {
        "object": "bank_account",
        "id": 4840,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT",
        "charge_transfer_fees": false,
        "date_created": "2015-03-19T15:35:40.000Z"
    },
    "date_created": "2015-03-20T15:44:14.000Z"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `count` | Não | `10` | Retorna `n` objetos de transferência |
| `page` | Não | `1` | Útil para implementação de uma paginação de resultados |

## Cancelando uma transferência

> POST https://api.pagar.me/1/transfers/:id/cancel

```shell
curl -X POST https://api.pagar.me/1/transfers/480/cancel \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Cancela uma transferência previamente realizada.

> JSON Retornado (Exemplo)

```json
{
    "object": "transfer",
    "id": 480,
    "amount": 13000,
    "type": "doc",
    "status": "canceled",
    "fee": 367,
    "funding_date": null,
    "funding_estimated_date": "2015-03-21T15:44:14.000Z",
    "transaction_id": null,
    "bank_account": {
        "object": "bank_account",
        "id": 4840,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT",
        "charge_transfer_fees": false,
        "date_created": "2015-03-19T15:35:40.000Z"
    },
    "date_created": "2015-03-20T15:44:14.000Z"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

# Recebedores

## Objeto `recipient`

> Objeto recipient

```json
{
    "object": "recipient",
    "id": "re_ci9bucss300h1zt6dvywufeqc",
    "bank_account": {
        "object": "bank_account",
        "id": 4841,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT",
        "charge_transfer_fees": false,
        "date_created": "2015-03-19T15:40:51.000Z"
    },
    "transfer_enabled": true,
    "last_transfer": null,
    "transfer_interval": "weekly",
    "transfer_day": 5,
    "automatic_anticipation_enabled": true,
    "anticipatable_volume_percentage": 85,
    "date_created": "2015-05-05T21:41:48.000Z",
    "date_updated": "2015-05-05T21:41:48.000Z"
}
```

Objeto contendo os dados de um recebedor.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `recipient` |
| `id` | `String` | Identificador do recebedor |
| `bank_account` | `Object` | Objeto contendo os dados bancários do recebedor |
| `transfer_enabled` | `Boolean` | Identifica se o recebedor está habilitado para receber automaticamente ou não |
| `last_transfer` | `String` | Data da última transferência (ISODate) |
| `transfer_interval` | `String` | Frequência na qual o recebedor irá ser pago. <br> **Valores possíveis**: `daily`, `weekly`, `montlhy` |
| `transfer_day` | `Number` | Dia no qual o recebedor vai ser pago. Para cada `transfer_day`, existe uma faixa de pagamento possível. <br> `weekly`: 1 a 5, onde 1 é segunda-feira e 5 é sexta-feira <br> `monthly`: 1 a 31 |
| `automatic_anticipation_enabled` | `Boolean` | Identifica se o recebedor está habilitado para receber automaticamente ou não o valor disponível para antecipação |
| `anticipatable_volume_percentage` | `Number` | Porcentagem do valor passível de antecipação que será antecipado automaticamente |
| `date_created` | `String` | Data de criação do recebedor (ISODate) |
| `date_updated` | `String` | Data de atualização do recebedor |

## Criando um recebedor

> POST https://api.pagar.me/1/recipients

```shell
curl -X POST https://api.pagar.me/1/recipients \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'transfer_interval=weekly' \
-d 'transfer_day=5' \
-d 'transfer_enabled=true' \
-d 'automatic_anticipation_enabled=true' \
-d 'anticipatable_volume_percentage=85'
-d 'bank_account_id=4841'
```

```ruby
```

```php
```

```cs
```

Com essa rota você consegue criar um recebedor, definindo o período que ele irá receber os pagamentos e qual a conta bancária que será utilizada para envio dos pagamentos.

> JSON Retornado (Exemplo)

```json
{
    "object": "recipient",
    "id": "re_ci9bucss300h1zt6dvywufeqc",
    "bank_account": {
        "object": "bank_account",
        "id": 4841,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT",
        "charge_transfer_fees": false,
        "date_created": "2015-03-19T15:40:51.000Z"
    },
    "transfer_enabled": true,
    "last_transfer": null,
    "transfer_interval": "weekly",
    "transfer_day": 5,
    "automatic_anticipation_enabled": true,
    "anticipatable_volume_percentage": 85,
    "date_created": "2015-05-05T21:41:48.000Z",
    "date_updated": "2015-05-05T21:41:48.000Z"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `transfer_interval` | Sim | - | Frequência na qual o recebedor irá ser pago. <br> **Valores possíveis**: `daily`, `weekly`, `montlhy` |
| `transfer_day` | Sim | - | Dia no qual o recebedor vai ser pago. |
| `transfer_enabled` | Sim | - | Variável que indica se o recebedor pode receber os pagamentos automaticamente |
| `bank_account_id` | Sim* | - | Identificador de uma conta bancária previamente criada. Caso você não tenha essa informação, você pode passar os parâmetros necessários para [criação de uma conta bancária](/#criando-uma-conta-bancria) | 
| `bank_account` | Não* | - | Objeto contendo os dados bancários do recebedor. Este objeto, e as suas respectivas propriedades, serão obrigatórios caso não seja informado um `bank_account_id` |
| `bank_account[bank_code]` | Não | - | Código do banco do recebedor |
| `bank_account[agencia]` | Não | - | Agência da conta do recebedor |
| `bank_account[conta]` | Não | - | Número da conta bancária do recebedor |
| `bank_account[conta_dv]` | Não | - | Dígito verificador da conta do recebedor |
| `bank_account[document_number]` | Não | - | CPF ou CNPJ do recebedor |
| `bank_account[legal_name]` | Não | - | Nome completo ou razão social do recebedor |

## Retornando todos os recebedores

> GET https://api.pagar.me/1/recipients

```shell
curl -X GET https://api.pagar.me/1/recipients \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna um `Array` de objetos com todos os recebedores criados pela sua companhia.

> JSON Retornado (Exemplo)

```json
[{
    "object": "recipient",
    "id": "re_ci7nhf1ay0007n016wd5t22nl",
    "bank_account": {
        "object": "bank_account",
        "id": 4901,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": null,
        "conta": "58999",
        "conta_dv": "3",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "RECIPIENT TEST",
        "charge_transfer_fees": true,
        "date_created": "2015-03-24T15:53:17.000Z"
    },
    "transfer_enabled": true,
    "last_transfer": null,
    "transfer_interval": "weekly",
    "transfer_day": 5,
    "date_created": "2015-03-24T15:53:27.000Z",
    "date_updated": "2015-03-24T15:53:27.000Z"
}, {
    "object": "recipient",
    "id": "re_ci7nheu0m0006n016o5sglg9t",
    "bank_account": {
        "object": "bank_account",
        "id": 4901,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": null,
        "conta": "58999",
        "conta_dv": "3",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "RECIPIENT TEST",
        "charge_transfer_fees": true,
        "date_created": "2015-03-24T15:53:17.000Z"
    },
    "transfer_enabled": true,
    "last_transfer": null,
    "transfer_interval": "weekly",
    "transfer_day": 5,
    "date_created": "2015-03-24T15:53:17.000Z",
    "date_updated": "2015-03-24T15:53:17.000Z"
}, {
    "object": "recipient",
    "id": "re_ci7ng63iv00bdp8164c05ggi9",
    "bank_account": {
        "object": "bank_account",
        "id": 4841,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "conta_dv": "1",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT",
        "charge_transfer_fees": false,
        "date_created": "2015-03-19T15:40:51.000Z"
    },
    "transfer_enabled": true,
    "last_transfer": null,
    "transfer_interval": "weekly",
    "transfer_day": 5,
    "date_created": "2015-03-24T15:18:30.000Z",
    "date_updated": "2015-03-24T15:18:30.000Z"
}, {
    "object": "recipient",
    "id": "re_ci76hxnym00b8dw16y3hdxb21",
    "bank_account": {
        "object": "bank_account",
        "id": 1774,
        "bank_code": "000",
        "agencia": "0000",
        "agencia_dv": null,
        "conta": "00000",
        "conta_dv": "0",
        "document_type": "cnpj",
        "document_number": "00000000000000",
        "legal_name": "CONTA BANCARIA DE TESTES",
        "charge_transfer_fees": true,
        "date_created": "2015-03-12T18:35:51.000Z"
    },
    "transfer_enabled": false,
    "last_transfer": null,
    "transfer_interval": null,
    "transfer_day": null,
    "date_created": "2015-03-12T18:35:51.000Z",
    "date_updated": "2015-03-12T18:35:51.000Z"
}]
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `count` | Não | `10` | Retorna `n` objetos recebedores |
| `page` | Não | `1` | Útil para implementação de uma paginação de resultados |

## Retornando um recebedor

> GET https://api.pagar.me/1/recipients/:id

```shell
curl -X GET https://api.pagar.me/1/recipients/re_ci7nhf1ay0007n016wd5t22nl \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna um objeto com os dados de um recebedor criado pela sua companhia.

> JSON Retornado (Exemplo)

```json
{
    "object": "recipient",
    "id": "re_ci7nhf1ay0007n016wd5t22nl",
    "bank_account": {
        "object": "bank_account",
        "id": 4901,
        "bank_code": "341",
        "agencia": "0932",
        "agencia_dv": null,
        "conta": "58999",
        "conta_dv": "3",
        "document_type": "cpf",
        "document_number": "26268738888",
        "legal_name": "RECIPIENT TEST",
        "charge_transfer_fees": true,
        "date_created": "2015-03-24T15:53:17.000Z"
    },
    "transfer_enabled": true,
    "last_transfer": null,
    "transfer_interval": "weekly",
    "transfer_day": 5,
    "date_created": "2015-03-24T15:53:27.000Z",
    "date_updated": "2015-03-24T15:53:27.000Z"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Balanço de saldo de um recebedor

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Operações de saldo de um recebedor

> GET https://api.pagar.me/1/recipients/:recipient_id/balance/operations

```shell
curl -X GET https://api.pagar.me/1/recipients/re_ci7nhf1ay0007n016wd5t22nl/balance/operations \
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

Retorna as movimentações que aconteceram na conta do recebedor.

> JSON Retornado (Exemplo)

```json
[{
    "object": "balance_operation",
    "id": 4861,
    "status": "available",
    "balance_amount": 3019898,
    "balance_old_amount": 2920013,
    "movement_type": "payable",
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
    "movement_type": "payable",
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
    "movement_type": "payable",
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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `count` | Não | `10` | Retorna `n` objetos de operações de saldo |
| `page` | Não | `1` | Útil para implementação de uma paginação de resultados |

## Operação de saldo específica de um recebedor

> GET https://api.pagar.me/1/recipients/:recipient_id/balance/operations/:id

```shell
curl -X GET https://api.pagar.me/1/recipients/re_ci7nhf1ay0007n016wd5t22nl/balance/operations \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna uma movimentação de saldo que aconteceu na conta do recebedor.

> JSON Retornado (Exemplo)

```json
{
    "object": "balance_operation",
    "id": 4861,
    "status": "available",
    "balance_amount": 3019898,
    "balance_old_amount": 2920013,
    "movement_type": "payable",
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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
