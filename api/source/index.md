---
title: Referência da API - Pagar.me

language_tabs:
  - shell
  - ruby
  - php
  - csharp

search: true
---

# Introdução

Bem-vindo ao guia de referências da API do [Pagar.me](https://pagar.me/)! É através desta API que você irá integrar seu sistema ao nosso, e, além disso, você também pode recriar as funcionalidades existentes na nossa dashboard, que são feitas consumindo a API que será aqui descrita.

A primeira coisa que você deve saber é o endpoint que usamos:

`
https://api.pagar.me/1/
`

# Transações 

Através da rota `/transactions` e suas derivadas, você pode criar transações, estornar, capturar, dentre outras atividades relacionadas a estas.

## Criando uma transação

```shell
curl -X POST https://api.pagar.me/1/transactions \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'amount=3100' \
-d 'card_id=card_ci6l9fx8f0042rt16rtb477gj' \
-d 'postback_url=http://requestb.in/pkt7pgpk' \
-d 'payment_method=boleto' \
-d 'boleto_expiration_date=1426215600000'
-d 'metadata[idProduto]=13933139'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.new({
    :amount => 3100,
    :payment_method => "boleto",
    :card_id => "card_ci6l9fx8f0042rt16rtb477gj",
    :postback_url => "http://requestb.in/pkt7pgpk",
    :payment_method => boleto,
    :boleto_expiration_date => 1426215600000,
    :metadata[idProduto] => 13933139
})

transaction.charge

boleto_url = transaction.boleto_url # URL do boleto bancário
boleto_barcode = transaction.boleto_barcode # código de barras do boleto bancário
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

    $transaction = new PagarMe_Transaction(array(
        "amount" => 3100,
        "payment_method' => "boleto",
        "card_id" => "card_ci6l9fx8f0042rt16rtb477gj",
        "postback_url" => "http://requestb.in/pkt7pgpk",
        "payment_method" => "boleto",
        "boleto_expiration_date" => 1426215600000,
        "metadata" => array(
            "idProduto" => 13933139
        )
    ));

    $transaction->charge();

    $boleto_url = $transaction->boleto_url; // URL do boleto bancário
    $boleto_barcode = $transaction->boleto_barcode; // código de barras do boleto bancário
?>
```

```cs
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

Transaction transaction = new Transaction();

transaction.Amount = 3100;
transaction.CardHash = "{CARD HASH}";
transaction.PostbackUrl = "http://requestb.in/pkt7pgpk";
transaction.BoletoExpirationDate = "1426215600000";
transaction.Metadata = new Metadata() {
    IdProduto = 13933139
};

transaction.Save();

TransactionStatus status = transaction.Status;
```

**Rota**: `https://api.pagar.me/1/transactions`

**Método**: `POST`

**Finalidade**: Cria uma transação.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `amount` | Sim | - | Valor a ser cobrado. Deve ser passado em centavos. Ex: R$ 10.00 = `1000` |
| `card_hash` | Sim\* | - | Informações do cartão do cliente criptografadas no navegador. <br>**ps**: Para os dados do cartão você deve passar **ou** o  `card_hash` **ou** o  `card_id` |
| `card_id` | Sim\* | - | Ao realizar uma transação, retornamos o `card_id` do cartão para que nas próximas transações desse cartão possa ser utilizado esse identificador ao invés do `card_hash` |
| `payment_method` | Não | `credit_card` | Aceita dois tipos de pagamentos/valores: `credit_card` e `boleto` |
| `postback_url` | Não | - | Endpoint do seu sistema que receberá informações a cada atualização da transação |
| `installments` | Não | Mínimo: 1 Máximo: 12 | Se o pagamento for boleto, o padrão é 1 |
| `boleto_expiration_date` | Não | Data atual + 7 dias | Prazo limite para pagamento do boleto |
| `soft_descriptor` | Não | - | Descrição que aparecerá na fatura depois do nome da loja. Máximo de 13 caracteres |
| `capture` | Não | `true` | Após a autorização de uma transação, você pode escolher se irá capturar ou adiar a captura do valor. Caso opte por postergar a captura, atribuir o valor `false` |
| `metadata` | Não | - | Você pode passar dados adicionais na criação da transação para posteriormente filtrar estas na nossa dashboard. Ex: `metadata[ idProduto ]=13933139` |

### JSON retornado (exemplo):

```json
{
  "object": "transaction",
  "status": "processing",
  "refuse_reason": null,
  "status_reason": "acquirer",
  "acquirer_response_code": null,
  "authorization_code": null,
  "soft_descriptor": "testeDeAPI",
  "tid": null,
  "nsu": null,
  "date_created": "2015-02-25T21:54:56.000Z",
  "date_updated": "2015-02-25T21:54:56.000Z",
  "amount": 310000,
  "installments": 5,
  "id": 184220,
  "cost": 0,
  "card_holder_name": "Api Customer",
  "card_last_digits": "3123",
  "card_first_digits": "548045",
  "card_brand": "mastercard",
  "postback_url": "http://requestb.in/pkt7pgpk",
  "payment_method": "credit_card",
  "antifraud_score": null,
  "boleto_url": null,
  "boleto_barcode": null,
  "boleto_expiration_date": null,
  "referer": "api_key",
  "ip": "189.8.94.42",
  "subscription_id": null,
  "phone": null,
  "address": null,
  "customer": null,
  "card": {
    "object": "card",
    "id": "card_ci6l9fx8f0042rt16rtb477gj",
    "date_created": "2015-02-25T21:54:56.000Z",
    "date_updated": "2015-02-25T21:54:56.000Z",
    "brand": "mastercard",
    "holder_name": "Api Customer",
    "first_digits": "548045",
    "last_digits": "3123",
    "fingerprint": "HSiLJan2nqwn",
    "valid": null
  },
  "metadata": {
    "nomeData": "API Doc Test",
    "idData": 13
  }
}
```

**ps**: Caso você vá usar o recurso antifraude, é **obrigatório** passar os dados do cliente na hora da criação da transação, como explicado [aqui](https://pagar.me/docs/transactions/#customer-data).

## Retornando uma Transação

**Rota**:  `https://api.pagar.me/1/transactions/:id`

**Método**: `GET`

**Funcionalidade**: Retorna os dados de uma transação realizada

```shell
curl -X GET https://api.pagar.me/1/transactions/194351 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

### JSON Retornado (exemplo):

```json
{
    "object": "transaction",
    "status": "paid",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": null,
    "acquirer_name": "development",
    "authorization_code": null,
    "soft_descriptor": null,
    "tid": null,
    "nsu": null,
    "date_created": "2015-02-26T15:35:32.000Z",
    "date_updated": "2015-02-26T15:35:47.000Z",
    "amount": 25000,
    "installments": 1,
    "id": 184270,
    "cost": 115,
    "card_holder_name": null,
    "card_last_digits": null,
    "card_first_digits": null,
    "card_brand": null,
    "postback_url": null,
    "payment_method": "boleto",
    "antifraud_score": null,
    "boleto_url": "https://pagar.me",
    "boleto_barcode": "1234 5678",
    "boleto_expiration_date": "2015-03-02T03:00:00.000Z",
    "referer": "session_id",
    "ip": "189.8.94.42",
    "subscription_id": null,
    "phone": null,
    "address": null,
    "customer": null,
    "card": null,
    "metadata": {}
}
```

## Calculando Pagamentos Parcelados

```shell
curl -X GET https://api.pagar.me/1/transactions/calculate_installments_amount \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0 \
-d 'max_installments=3' \
-d 'free_installments=1' \
-d 'interest_rate=13' \
-d 'amount=1300'
```

**Rota**: `https://api.pagar.me/1/transactions/calculate_installments_amount`

**Método**: `GET`

**Finalidade**: Usada para calcular o valor de cada uma das parcelas de uma compra.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `max_installments` | Sim | 12 | Valor máximo de parcelas |
| `free_installments` | Não | 1 | Número de parcelas isentas de juros |
| `interest_rate` | Sim | - | Valor da taxa de juros |
| `amount` | Sim | - | Valor do produto/serviço vendido |

### JSON retornado (exemplo):

```json
{
    "installments": {
        "1": {
            "installment": 1,
            "amount": 1300,
            "installment_amount": 1300
        },
        "2": {
            "installment": 2,
            "amount": 1615,
            "installment_amount": 807
        },
        "3": {
            "installment": 3,
            "amount": 1757,
            "installment_amount": 586
        }
    }
}
```

## Gerando uma nova chave para encriptação do `card_hash`

```shell
curl -X GET https://api.pagar.me/1/transactions/card_hash_key \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

**Rota**: `https://api.pagar.me/1/transactions/card_hash_key`

**Método**: `GET`

**Finalidade**: -

### JSON Retornado (Exemplo)

```json
{
    "date_created": "2015-02-27T15:44:26.000Z",
    "id": 111111,
    "ip": "000.0.00.00",
    "public_key": "-----BEGIN PUBLIC KEY-----\ -----END PUBLIC KEY-----\ "
}
```

## Estorno de transação

```shell
```

```ruby
```

```php
```

```cs
```

**Rota**: `/transactions/:id/refund`

**Método**: ``

**Finalidade**: Faz o cancelamento de uma transação, realizada por uma cobrança via cartão de crédito ou boleto bancário.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

### JSON Retornado (Exemplo)

```json

```
