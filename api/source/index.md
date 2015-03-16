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

## Objeto `transaction`

Ao criar ou atualizar uma transação, este será o objeto que você irá receber como resposta em cada etapa do processo de efetivação da transação.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `transaction` |
| `status` | `String` | Para cada atualização no processamento da transação, esta propriedade será alterada, e o objeto `transaction` retornado como resposta através da sua URL de *postback* ou após o término do processamento da ação atual. <br> **Valores possíveis**: `processing`, `authorized`, `paid`, `refunded`, `waiting_payment`, `pending_refund`, `refused` |
| `status_reason` | `String` |  |
| `acquirer_response_code` | `String` |  |
| `authorization_code` | `String` |  |
| `soft_descriptor` | `String` | Texto que irá aparecer na fatura do cliente depois do nome da loja. <br> **ps**: Limite de 13 caracteres. |
| `tid` | `String` |  |
| `nsu` | `String` |  |
| `date_created` | `String` | Data de criação da transação no formato ISODate |
| `date_updated` | `String` | Data de atualização da transação no formato ISODate |
| `amount` | `Number` | Valor, em centavos, da transação |
| `installments` | `Number` | Número de parcelas/prestações a serem cobradas |
| `id` | `Number` | Número identificador da transação |
| `cost` | `Number` | Custo da transação para o lojista |
| `postback_url` | `String` | URL (endpoint) do sistema integrado a Pagar.me que receberá as respostas a cada atualização do processamento da transação |
| `payment_method` | `String` | Método de pagamento possíveis: `credit_card` e `boleto`  |
| `boleto_url` | `String` | URL do boleto para impressão |
| `boleto_barcode` | `String` | Código de barras do boleto gerado na transação |
| `boleto_expiration_date` | `String` | Data de expiração do boleto (em ISODate) |
| `referer` | `String` |  |
| `ip` | `String` |  |
| `subscription_id` | `Number` | Caso essa transação tenha sido originada na cobrança de uma assinatura, o `id` desta será o valor dessa propriedade  |
| `phone` | `Object` | Objeto com dados do telefone do cliente |
| `address` | `Object` | Objeto com dados do endereço do cliente |
| `customer` | `Object` | Objeto com dados do cliente |
| `card` | `Object` | Objeto com dados do cartão do cliente |
| `metadata` | `Object` | Objeto com dados adicionais do cliente/produto/serviço vendido |

> Objeto transaction

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


## Criando uma transação

> Rota

```
POST https://api.pagar.me/1/transactions
```

> Exemplo de Requisição

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

Para fazer uma cobrança, você deve usar a rota `/transactions` para criar sua transação, que pode ser feita por cartão de crédito ou por boleto bancário.

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
| `customer[name]` | Sim\* (com antifraude) | - | Nome completo ou razão social do cliente que está realizando a transação |
| `customer[document_number]` | Sim\* (com antifraude) | - | CPF ou CNPJ do cliente, sem separadores |
| `customer[email]` | Sim\* (com antifraude) | - | email do cliente |
| `customer[address][street]` | Sim\* (com antifraude) | - | logradouro (rua, avenida, etc) do cliente |
| `customer[address][street_number]` | Sim\* (com antifraude) | - | Número da residência/estabelecimento do cliente |
| `customer[address][complementary]` | Sim\* (com antifraude) | - | completo do endereço do cliente |
| `customer[address][neighborhood]` | Sim\* (com antifraude) | - | bairro de localização do cliente |
| `customer[address][zipcode]` | Sim\* (com antifraude) | - | CEP do imóvel do cliente, sem separadores |
| `customer[phone][ddd]` | Sim\* (com antifraude) | - | DDD do telefone do cliente |
| `customer[phone][number]` | Sim\* (com antifraude) | - | número de telefone do cliente |
| `customer[sex]` | Não | `M` ou `F` (letras maiúsculas) | sexo do cliente |
| `customer[born_at]` | Não | Formato: `MM-DD-AAAA` Ex: 11-02-1985 | Data de nascimento do cliente |

> JSON retornado (exemplo):

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

> Rota

```
GET https://api.pagar.me/1/transactions/:id
```

> Exemplo de Requisição

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
| `:id` | Sim | - | id da transação previamente criada |


Retorna os dados de uma transação realizada

> JSON Retornado (exemplo):

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

## Retornando transações

> Rota

```
GET https://api.pagar.me/1/transactions \
```

> Exemplo de Requisição

```shell
curl -X GET https://api.pagar.me/1/transactions \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'count=3' \
-d 'page=3'
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
| `:id` | Sim | - | id da transação previamente criada |
| `count` | Não | `10` | Retorna `n` objetos de transação |
| `page` | Não | `1` | Útil para implementação de uma paginação de resultados |

Retorna um `Array` contendo objetos de transações realizadas.

> JSON Retornado (exemplo):

```json
[{
    "object": "transaction",
    "status": "refused",
    "refuse_reason": "acquirer",
    "status_reason": "acquirer",
    "acquirer_response_code": "51",
    "acquirer_name": "development",
    "authorization_code": null,
    "soft_descriptor": null,
    "tid": 1425933798340,
    "nsu": 1425933798340,
    "date_created": "2015-03-09T20:43:17.000Z",
    "date_updated": "2015-03-09T20:43:18.000Z",
    "amount": 54496,
    "installments": "10",
    "id": 185679,
    "cost": 0,
    "card_holder_name": "murilo junqueira",
    "card_last_digits": "1111",
    "card_first_digits": "411111",
    "card_brand": "visa",
    "postback_url": null,
    "payment_method": "credit_card",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "boleto_expiration_date": null,
    "referer": "encryption_key",
    "ip": "179.185.132.108",
    "subscription_id": null,
    "phone": null,
    "address": null,
    "customer": null,
    "card": {
        "object": "card",
        "id": "card_ci1u3yidd00036t16wkzev8s8",
        "date_created": "2014-10-29T03:12:50.000Z",
        "date_updated": "2015-03-07T19:43:08.000Z",
        "brand": "visa",
        "holder_name": "murilo junqueira",
        "first_digits": "411111",
        "last_digits": "1111",
        "fingerprint": "HEiFgPIQJqXG",
        "valid": true
    },
    "metadata": {}
}, {
    "object": "transaction",
    "status": "authorized",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": null,
    "acquirer_name": "development",
    "authorization_code": null,
    "soft_descriptor": null,
    "tid": null,
    "nsu": null,
    "date_created": "2015-03-09T20:41:20.000Z",
    "date_updated": "2015-03-09T20:41:20.000Z",
    "amount": 50000,
    "installments": 1,
    "id": 185676,
    "cost": 0,
    "card_holder_name": null,
    "card_last_digits": null,
    "card_first_digits": null,
    "card_brand": null,
    "postback_url": null,
    "payment_method": "boleto",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "boleto_expiration_date": "2015-03-16T03:00:00.126Z",
    "referer": "encryption_key",
    "ip": "177.157.206.15",
    "subscription_id": null,
    "phone": null,
    "address": null,
    "customer": null,
    "card": null,
    "metadata": {}
}, {
    "object": "transaction",
    "status": "authorized",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": "00",
    "acquirer_name": "development",
    "authorization_code": "854653",
    "soft_descriptor": null,
    "tid": 1425933651790,
    "nsu": 1425933651790,
    "date_created": "2015-03-09T20:40:51.000Z",
    "date_updated": "2015-03-09T20:40:51.000Z",
    "amount": 50000,
    "installments": 1,
    "id": 185675,
    "cost": 0,
    "card_holder_name": "John Appleseed",
    "card_last_digits": "4446",
    "card_first_digits": "590072",
    "card_brand": "mastercard",
    "postback_url": null,
    "payment_method": "credit_card",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "boleto_expiration_date": null,
    "referer": "encryption_key",
    "ip": "177.157.206.15",
    "subscription_id": null,
    "phone": null,
    "address": null,
    "customer": null,
    "card": {
        "object": "card",
        "id": "card_ci6ttnn2y007n5616jhotcfof",
        "date_created": "2015-03-03T21:42:58.000Z",
        "date_updated": "2015-03-09T20:06:15.000Z",
        "brand": "mastercard",
        "holder_name": "John Appleseed",
        "first_digits": "590072",
        "last_digits": "4446",
        "fingerprint": "XHLU9UYzU3+x",
        "valid": true
    },
    "metadata": {}
}]
```

## Gerando uma nova chave para encriptação do `card_hash`

> Rota

```
GET https://api.pagar.me/1/transactions/card_hash_key
```

> Exemplo de Requisição 

```shell
curl -X GET https://api.pagar.me/1/transactions/card_hash_key \
-d 'encryption_key=ek_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `encryption_key` | Sim | - | Chave de encriptação (disponível no seu dashboard) |

Caso você queira/precise criar o `card_hash` manualmente, essa rota deverá ser utilizada para obtenção de uma chave pública de encriptação dos dados do cartão de seu cliente.

Saiba mais sobre como criar um `card_hash` [aqui]().

> JSON Retornado (Exemplo)

```json
{
    "date_created": "2015-02-27T15:44:26.000Z",
    "id": 111111,
    "ip": "000.0.00.00",
    "public_key": "-----BEGIN PUBLIC KEY-----\ -----END PUBLIC KEY-----\ "
}
```

## Retorna uma análise antifraude

> Rota

```
GET https://api.pagar.me/1/transactions/:transaction_id/antifraud_analyses/:id
```

> Exemplo de Requisição 

```shell
curl -X GET https://api.pagar.me/1/transactions/314578/antifraud_analyses/913456 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna uma análise antifraude específica realizada em uma transação.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:transaction_id` | Sim | - | id da transação |
| `:id` | Sim | - | id da análise previamente feita |

> JSON Retornado (Exemplo)

```json
{
	"object": "antifraud_analysis",
	"name": "name",
	"score": "score",
	"cost": "cost",
	"status": "status",
	"date_created": "date_created",
	"date_updated": "date_updated",
	"id": "id"
}
```

## Retorna todas as análises antifraude

> Rota

```
GET https://api.pagar.me/1/transactions/:transaction_id/antifraud_analyses
```

> Exemplo de Requisição 

```shell
curl -X GET https://api.pagar.me/1/transactions/314578/antifraud_analyses \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna todas as análises antifraude realizadas em uma transação.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:transaction_id` | Sim | - | id da transação |

> JSON Retornado (Exemplo)

```json
[{
	"object": "antifraud_analysis",
	"name": "name",
	"score": "score",
	"cost": "cost",
	"status": "status",
	"date_created": "date_created",
	"date_updated": "date_updated",
	"id": "id"
}]
```

## Notificando cliente sobre boleto à ser pago

> Rota

```
POST https://api.pagar.me/1/transactions/:id/collect_payment
```

> Exemplo de Requisição 

```shell
curl -X POST https://api.pagar.me/1/transactions/314578/collect_payment \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'email=seu@email.com'
```

```ruby
```

```php
```

```cs
```

Envia o link de um boleto pendente para o cliente.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id` | Sim | - | id da transação |
| `email` | Sim | - | email a ser enviado o link do boleto |

> JSON Retornado (Exemplo)

```json

```

## Capturando uma transação posteriormente

> Rota

```
POST https://api.pagar.me/1/transactions/:id/capture
```

> Exemplo de Requisição 

```shell
curl -X POST https://api.pagar.me/1/transactions/314578/capture \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Você pode capturar o valor de uma transação após a autorização desta, no prazo máximo de 5 dias após a autorização.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id` | Sim | - | Id da transação a ser capturada |

> JSON Retornado (Exemplo)

```json
{
    "object": "transaction",
    "status": "authorized",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": "00",
    "acquirer_name": "development",
    "authorization_code": "132534",
    "soft_descriptor": "testeDeApi",
    "tid": "1425302906112",
    "nsu": "1425302906112",
    "date_created": "2015-03-02T13:28:25.000Z",
    "date_updated": "2015-03-02T13:28:26.000Z",
    "amount": 130000,
    "installments": 1,
    "id": 184622,
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
        "date_updated": "2015-02-25T21:54:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": {
        "nomeData": "API Doc test",
        "idData": "13"
    }
}
```

## Estorno de transação

> Rota

```
POST https://api.pagar.me/1/transactions/:id/refund
```

> Exemplo de Requisição 

```shell
curl -X POST https://api.pagar.me/1/transactions/314578/refund \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```shell
# Estorno de transação paga com boleto bancário

curl -X POST https://api.pagar.me/1/transactions/314578/refund \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'bank_account[bank_code]=111' \
-d 'bank_account[agencia]=1234' \
-d 'bank_account[conta]=09876' \
-d 'bank_account[conta_dv]=1' \
-d 'bank_account[document_number]=12312312312' \
-d 'bank_account[legal_name]=joao miranda'
```

```ruby
```

```php
```

```cs
```

Essa rota é utilizada quando se deseja estornar uma transação, realizada por uma cobrança via cartão de crédito ou boleto bancário.

Em caso de estorno de uma transação realizada com cartão de crédito, apenas o `id` da transação é necessário para efetivação do estorno.

Caso a compra tenha sido feita por boleto bancário, você precisará passar os dados da conta bancária que irá receber o valor estornado, ou o id desta conta, que pode ser gerada através da rota `/bank_accounts`.  

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id` | Sim | - | id da transação |
| `bank_account_id` | Sim\* | - | Se você tiver o id de uma conta previamente criada, você pode passar apenas seu id. Caso a conta ainda não exista, você pode [criar uma conta]() ou passar os dados da conta via parâmetros |
| `bank_code` | Sim\* | - | Dígitos que identificam cada banco. Confira a lista dos bancos [aqui](http://www.febraban.org.br/arquivo/bancos/sitebancos2-0.asp) |
| `agencia` | Sim\* | - | Número da agência bancária |
| `agencia_dv` | Não | - | Digito verificador da agência. Obrigatório caso o banco o utilize |
| `conta` | Sim\* | - | Número da conta |
| `conta_dv` | Não | - | Dígito verificador da conta. Obrigatório caso o banco o utilize |
| `document_number` | Sim\* | - | CPF ou CNPJ do favorecido |
| `legal_name` | Sim\* | - | Nome/razão social do favorecido |

> JSON Retornado - Estorno de Cartão de Crédito (Exemplo)

```json
{
    "object": "transaction",
    "status": "paid",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": "00",
    "acquirer_name": "development",
    "authorization_code": "634306",
    "soft_descriptor": "testeDeApi",
    "tid": "1425302928963",
    "nsu": "1425302928963",
    "date_created": "2015-03-02T13:28:48.000Z",
    "date_updated": "2015-03-02T13:37:56.000Z",
    "amount": 130000,
    "installments": 1,
    "id": 184623,
    "cost": 2000,
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
        "date_updated": "2015-02-25T21:54:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": {
        "nomeData": "API Doc test",
        "idData": "13"
    }
}
```

> JSON Retornado - Estorno de Boleto Bancário (Exemplo)

```json
{
    "object": "transaction",
    "status": "pending_refund",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": null,
    "acquirer_name": "development",
    "authorization_code": null,
    "soft_descriptor": null,
    "tid": null,
    "nsu": null,
    "date_created": "2015-02-26T19:50:38.000Z",
    "date_updated": "2015-03-02T17:38:10.000Z",
    "amount": 3100000,
    "installments": 1,
    "id": 184306,
    "cost": 115,
    "card_holder_name": null,
    "card_last_digits": null,
    "card_first_digits": null,
    "card_brand": null,
    "postback_url": "http://requestb.in/pkt7pgpk",
    "payment_method": "boleto",
    "antifraud_score": null,
    "boleto_url": "https://pagar.me",
    "boleto_barcode": "1234 5678",
    "boleto_expiration_date": "2015-03-13T03:00:00.000Z",
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
        "date_updated": "2015-02-25T21:54:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": {}
}
```

## Calculando Pagamentos Parcelados

> Rota

```
GET https://api.pagar.me/1/transactions/calculate_installments_amount
```

> Exemplo de Requisição 

```shell
curl -X GET https://api.pagar.me/1/transactions/calculate_installments_amount \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0 \
-d 'max_installments=3' \
-d 'free_installments=1' \
-d 'interest_rate=13' \
-d 'amount=1300'
```

Usada para calcular o valor de cada uma das parcelas de uma compra.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `max_installments` | Sim | 12 | Valor máximo de parcelas |
| `free_installments` | Não | 1 | Número de parcelas isentas de juros |
| `interest_rate` | Sim | - | Valor da taxa de juros |
| `amount` | Sim | - | Valor do produto/serviço vendido |

> JSON retornado (exemplo):

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

# Planos

Através dessas rotas você pode gerenciar todos os planos do seu negócio, para posteriormente criar cobranças recorrentes, que serão as assinaturas.

## Objeto `plan`

Com o objeto `plan` você consegue definir um plano no qual assinaturas poderão estar atreladas a este plano. Informações como **valor do plano**, **nome**, **dias de teste**, entre outras informações, são armazenadas pelos planos.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `plan` |
| `id` | `Number` | Número identificador do plano |
| `amount` | `Number` | Preço do plano, em centavos |
| `days` | `Number` | Dias para efetuação da próxima cobrança da assinatura atrelada ao plano. |
| `name` | `String` | Nome do plano |
| `trial_days` | `Number` | Dias que o usuário poderá testar o serviço gratuitamente |
| `date_created` | `String` | Data da criação do plano (ISODate) |
| `payment_methods` | `Array` | Array de Strings contendo os possíveis métodos de pagamento deste plano. <br> **Valores possíveis**: `credit_card`, `boleto` |
| `color` | `String` | Propriedade opcional para atribuição de uma cor ao plano. <br> **Valor padrão**: `null` |
| `charges` | `Number` | Número de cobranças que podem ser feitas em uma assinatura. <br> **Ex**: Plano anual com no máximo 3 cobranças, `days = 365` e `charges = 3` |
| `installments` | `Number` | Informa em quantas vezes o pagamento será parcelado entre cada cobrança |

> Objeto plan

```json
{
    "object": "plan",
    "id": 13731,
    "amount": 31000,
    "days": 30,
    "name": "Plano Diamond",
    "trial_days": 7,
    "date_created": "2015-03-03T17:31:47.000Z",
    "payment_methods": [
        "boleto"
    ],
    "color": "gold",
    "charges": null,
    "installments": 1
}
```

## Criando Planos

> Rota

```
POST https://api.pagar.me/1/plans
```

> Exemplo de Requisição 

```shell
curl -X POST https://api.pagar.me/1/plans \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'amount=31000' \
-d 'days=30' \
-d 'name=Plano Ouro' \
-d 'payments_methods[]=boleto'
```

```ruby
```

```php
```

```cs
```

Cria um plano, onde poderão ser definidos o nome deste, preço, tempo de recorrência, métodos de pagamento, dentre outras opções.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `amount` | Sim | - | Valor que será cobrado recorrentemente (em centavos). Ex: R$49,90 = `4990` |
| `days` | Sim | - | Prazo, em dias, para cobrança das parcelas |
| `name` | Sim | - | Nome do plano |
| `trial_days` | Não | `0` | Dias para teste gratuito do produto. Valor começará a ser cobrado no dia `trial_days + 1` |
| `payment_methods` | Não | `[boleto, credit_card]` | Meios de pagamentos aceitos. Pode ser boleto, cartão de crédito ou ambos |
| `color` | Não | `null` | Armazena o valor de uma cor para o plano |
| `charges` | Não | `null` | Número de cobranças que poderão ser feitas nesse plano. <br> **Ex**: Plano cobrado 1x por ano, válido por no máximo 3 anos. Nesse caso, nossos parâmetros serão: `days = 365, charges = 3, installments = 1` <br> **ps**: `null` irá cobrar o usuário indefinidamente, ou até o plano ser cancelado |
| `installments` | Não | `1` | Número de parcelas entre cada *charge*. <br> **Ex**: Plano anual, válido por 2 anos, podendo ser divido em até 12 vezes. Nesse caso, nossos parâmetros serão: `days = 30, charges = 2, installments = 12` <br> **ps**: Boleto sempre terá `installments = 1` |

Veja mais sobre como criar um plano [aqui](https://pagar.me/docs/plans-subscriptions/#criando-um-plano).

> JSON Retornado (Exemplo)

```json
{
    "object": "plan",
    "id": 12779,
    "amount": 31000,
    "days": 30,
    "name": "Plano Ouro",
    "trial_days": 0,
    "date_created": "2015-03-03T16:28:00.000Z",
    "payment_methods": [
        "boleto"
    ],
    "color": null,
    "charges": null,
    "installments": 1
}
```

## Retornando Planos

> Rota

```
GET https://api.pagar.me/1/plans/:id
```

> Exemplo de Requisição 

```shell
curl -X GET https://api.pagar.me/1/plans/13580 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Cria um plano, onde poderão ser definidos o nome deste, preço, tempo de recorrência, métodos de pagamento, dentre outras opções.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id`| Sim | - | id de identificação do plano previamente criado |

> JSON Retornado (Exemplo)

```json
{
    "object": "plan",
    "id": 13580,
    "amount": 31000,
    "days": 30,
    "name": "Plano Ouro",
    "trial_days": 0,
    "date_created": "2015-03-03T16:28:00.000Z",
    "payment_methods": [
        "boleto"
    ],
    "color": null,
    "charges": null,
    "installments": 1
}
```

## Atualizando Planos

> Rota

```
PUT https://api.pagar.me/1/plans/:id
```

> Exemplo de Requisição 

```shell
curl -X  PUT https://api.pagar.me/1/plans/13580 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'name=Plano Diamong' \
-d 'trial_days=7'
```

```ruby
```

```php
```

```cs
```

Atualiza um plano previamente criado. As propriedades que podem ser alteradas são:

* Nome do plano (`name`)
* Dias de testes gratuito (`trial_days`)

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id`| Sim | - | id de identificação do plano previamente criado |
| `name` | Não | - | Nome do plano |
| `trial_days` | Não | - | Dias para testar o produto/serviço gratuitamente |

> JSON Retornado (Exemplo)

```json
{
    "object": "plan",
    "id": 13580,
    "amount": 31000,
    "days": 30,
    "name": "Plano Ouro",
    "trial_days": 7,
    "date_created": "2015-03-03T16:28:00.000Z",
    "payment_methods": [
        "boleto"
    ],
    "color": null,
    "charges": null,
    "installments": 1
}
```

## Deletando Planos

> Rota

```
DELETE https://api.pagar.me/1/plans/:id
```

> Exemplo de Requisição 

```shell
curl -X DELETE https://api.pagar.me/1/plans/12784 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Remove um plano previamente criado. Caso o plano exista, é retornado um objeto vazio, caso não exista, é retornado um objeto com as informações do erro ao tentar excluir o plano.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

> JSON Retornado (Exemplo)

```json
{ }
```

> JSON Retornado caso o plano não exista (exemplo)

```json
{
    "errors": [{
        "type": "not_found",
        "parameter_name": null,
        "message": "Plan not found."
    }],
    "url": "/plans/12784?api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0",
    "method": "delete"
}
```

# Assinaturas

## Objeto `subscription`

Esse objeto contém os dados das assinaturas geradas pelo seu sistema, que são atreladas a um **plano**.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `subscription` |
| `plan` | `Object` | Objeto com os dados do plano que a assinatura está associada |
| `id` | `Number` | Número identificador do plano |
| `current_transaction` | `Object` | Objeto com os dados da última transação realizada nessa assinatura |
| `postback_url` | `String` | Endpoint da aplicação integrada ao Pagar.me que irá receber os jsons de resposta a cada atualização dos processos |
| `payment_method` | `String` | Método de pagamento associado a essa assinatura |
| `card_brand` | `String` | Nome da operadora do cartão |
| `card_last_digits` | `String` | Últimos dígitos do cartão |
| `current_period_start` | `String` |  |
| `current_period_end` | `String` |  |
| `charges` | `Number` | Número de cobranças a serem efetuadas |
| `status` | `String` | Possíveis estados da transação/assinatura <br> **Valores possíveis**: `trialing`, `paid`, `pending_payment`, `unpaid`, `canceled`, `ended` |
| `date_created` | `String` | Data da criação d assinatura |
| `phone` | `Object` | Objeto com dados do telefone do cliente |
| `address` | `Object` | Objeto com dados do endereço do cliente |
| `customer` | `Object` | Objeto com dados do cliente |
| `card` | `Object` | Objeto com dados do cartão do cliente |
| `metadata` | `Object` | Objeto com dados adicionais do cliente/produto/serviço vendido |

> Objeto `subscription`

```json
{
    "object": "subscription",
    "plan": {
        "object": "plan",
        "id": 12830,
        "amount": 1300,
        "days": 15,
        "name": "Plano Prata",
        "trial_days": 0,
        "date_created": "2015-03-06T17:25:25.000Z",
        "payment_methods": [
            "boleto",
            "credit_card"
        ],
        "color": null,
        "charges": null,
        "installments": 1
    },
    "id": 14858,
    "current_transaction": {
        "object": "transaction",
        "status": "waiting_payment",
        "refuse_reason": null,
        "status_reason": "acquirer",
        "acquirer_response_code": null,
        "acquirer_name": "development",
        "authorization_code": null,
        "soft_descriptor": null,
        "tid": null,
        "nsu": null,
        "date_created": "2015-03-06T18:15:12.000Z",
        "date_updated": "2015-03-06T18:15:12.000Z",
        "amount": 1300,
        "installments": 1,
        "id": 185486,
        "cost": 0,
        "card_holder_name": null,
        "card_last_digits": null,
        "card_first_digits": null,
        "card_brand": null,
        "postback_url": null,
        "payment_method": "boleto",
        "antifraud_score": null,
        "boleto_url": "https://pagar.me",
        "boleto_barcode": "1234 5678",
        "boleto_expiration_date": "2015-03-13T18:15:12.000Z",
        "referer": null,
        "ip": null,
        "subscription_id": 14858,
        "metadata": {}
    },
    "postback_url": null,
    "payment_method": "boleto",
    "card_brand": null,
    "card_last_digits": null,
    "current_period_start": null,
    "current_period_end": null,
    "charges": 0,
    "status": "canceled",
    "date_created": "2015-03-04T18:41:57.000Z",
    "phone": null,
    "address": null,
    "customer": {
        "object": "customer",
        "document_number": null,
        "document_type": "cpf",
        "name": null,
        "email": "api@test.com",
        "born_at": null,
        "gender": null,
        "date_created": "2015-03-04T18:40:03.000Z",
        "id": 14437
    },
    "card": {
        "object": "card",
        "id": "card_ci6v2mom200br5616ln4vg10q",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": null
}
```

## Criando assinaturas

> Rota

```
POST https://api.pagar.me/1/subscriptions
```

> Exemplo de Requisição 

```shell
curl -X POST https://api.pagar.me/1/subscriptions \
-d 'customer[email]=api@test.com' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo' \
-d 'plan_id=12783' \
-d 'card_id=card_ci234fx8rr649rt16rtb11132'
```

```ruby
```

```php
```

```cs
```

Para efetivamente cobrar seu cliente de forma recorrente, você deve criar uma **assinatura**, que atrelada a um **plano**, conterá os dados de cobrança.

A criação de uma `subscription` (assinatura) é parecida com a criação de uma transação. Veja mais detalhes sobre como cobrar seu cliente de forma recorrente [aqui](https://pagar.me/docs/plans-subscriptions/#criando-uma-assinatura).

**ps**: Você pode passar os objetos `customer` e `metadata` na criação de uma assinatura, assim como feito na criação de uma transação. A diferença é que a propriedade `customer[email]` é obrigatória na criação da **assinatura**. 

**OBS**: As transações criadas pelas assinaturas não passam pelo antifraude, devido a ocorrência de fraudes nesse tipo de serviço serem praticamente nulas.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `plan_id` | Sim | - | id do plano a ser associado a uma assinatura |
| `card_hash` | Sim\* | - | Dados encriptados do cartão do cliente. Você também pode usar o `card_id` ao invés do `card_hash` |
| `customer[email]` | Sim | - | Email do cliente |
| `customer[name]` |  | - | Nome completo ou razão social do cliente que está realizando a transação |
| `customer[document_number]` | Não | - | CPF ou CNPJ do cliente, sem separadores |
| `customer[address][street]` | Não | - | logradouro (rua, avenida, etc) do cliente |
| `customer[address][street_number]` | Não | - | Número da residência/estabelecimento do cliente |
| `customer[address][complementary]` | Não | - | completo do endereço do cliente |
| `customer[address][neighborhood]` | Não | - | bairro de localização do cliente |
| `customer[address][zipcode]` | Não | - | CEP do imóvel do cliente, sem separadores |
| `customer[phone][ddd]` | Não | - | DDD do telefone do cliente |
| `customer[phone][number]` | Não | - | número de telefone do cliente |
| `customer[sex]` | Não | `M` ou `F` (letras maiúsculas) | sexo do cliente |
| `customer[born_at]` | Não | Formato: `MM-DD-AAAA` Ex: 11-02-1985 | Data de nascimento do cliente |
| `metadata` | Não | - | Você pode passar dados adicionais na criação da transação para posteriormente filtrar estas na nossa dashboard. Ex: `metadata[ idProduto ]=13933139` |

> JSON Retornado (Exemplo)

```json
{
    "object": "subscription",
    "plan": {
        "object": "plan",
        "id": 12783,
        "amount": 31000,
        "days": 30,
        "name": "Plano Ouro",
        "trial_days": 0,
        "date_created": "2015-03-03T16:56:32.000Z",
        "payment_methods": ["boleto", "credit_card"],
        "color": null,
        "charges": null,
        "installments": 1
    },
    "id": 14858,
    "current_transaction": {
        "object": "transaction",
        "status": "paid",
        "refuse_reason": null,
        "status_reason": "acquirer",
        "acquirer_response_code": "00",
        "acquirer_name": "development",
        "authorization_code": "11344",
        "soft_descriptor": null,
        "tid": "1425494517057",
        "nsu": "1425494517057",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "amount": 31000,
        "installments": 1,
        "id": 185122,
        "cost": 515,
        "card_holder_name": "Api Customer",
        "card_last_digits": "3123",
        "card_first_digits": "548045",
        "card_brand": "mastercard",
        "postback_url": null,
        "payment_method": "credit_card",
        "antifraud_score": null,
        "boleto_url": null,
        "boleto_barcode": null,
        "boleto_expiration_date": null,
        "referer": "api_key",
        "ip": "189.8.94.42",
        "subscription_id": 14858,
        "metadata": {}
    },
    "postback_url": null,
    "payment_method": "credit_card",
    "card_brand": "mastercard",
    "card_last_digits": "3123",
    "current_period_start": "2015-03-04T18:41:56.746Z",
    "current_period_end": "2015-04-03T18:41:56.746Z",
    "charges": 0,
    "status": "paid",
    "date_created": "2015-03-04T18:41:57.000Z",
    "phone": null,
    "address": null,
    "customer": {
        "object": "customer",
        "document_number": null,
        "document_type": "cpf",
        "name": null,
        "email": "api@test.com",
        "born_at": null,
        "gender": null,
        "date_created": "2015-03-04T18:40:03.000Z",
        "id": 14437
    },
    "card": {
        "object": "card",
        "id": "card_ci6v2mom200br5616ln4vg10q",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": null
}
```

## Retornando Assinaturas

> Rota

```
GET https://api.pagar.me/1/subscriptions/:id
```

> Exemplo de Requisição 

```shell
curl -X GET https://api.pagar.me/1/subscriptions/14858 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Essa rota é utilizada para retornar os dados de uma determinada assinatura.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

> JSON Retornado (Exemplo)

```json
{
    "object": "subscription",
    "plan": {
        "object": "plan",
        "id": 12783,
        "amount": 31000,
        "days": 30,
        "name": "Plano Ouro",
        "trial_days": 0,
        "date_created": "2015-03-03T16:56:32.000Z",
        "payment_methods": [
            "boleto",
            "credit_card"
        ],
        "color": null,
        "charges": null,
        "installments": 1
    },
    "id": 14858,
    "current_transaction": {
        "object": "transaction",
        "status": "paid",
        "refuse_reason": null,
        "status_reason": "acquirer",
        "acquirer_response_code": "00",
        "acquirer_name": "development",
        "authorization_code": "11344",
        "soft_descriptor": null,
        "tid": "1425494517057",
        "nsu": "1425494517057",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "amount": 31000,
        "installments": 1,
        "id": 185122,
        "cost": 515,
        "card_holder_name": "Api Customer",
        "card_last_digits": "3123",
        "card_first_digits": "548045",
        "card_brand": "mastercard",
        "postback_url": null,
        "payment_method": "credit_card",
        "antifraud_score": null,
        "boleto_url": null,
        "boleto_barcode": null,
        "boleto_expiration_date": null,
        "referer": "api_key",
        "ip": "189.8.94.42",
        "subscription_id": 14858,
        "metadata": {}
    },
    "postback_url": null,
    "payment_method": "credit_card",
    "card_brand": "mastercard",
    "card_last_digits": "3123",
    "current_period_start": "2015-03-04T18:41:56.746Z",
    "current_period_end": "2015-04-03T18:41:56.746Z",
    "charges": 0,
    "status": "paid",
    "date_created": "2015-03-04T18:41:57.000Z",
    "phone": null,
    "address": null,
    "customer": {
        "object": "customer",
        "document_number": null,
        "document_type": "cpf",
        "name": null,
        "email": "api@test.com",
        "born_at": null,
        "gender": null,
        "date_created": "2015-03-04T18:40:03.000Z",
        "id": 14437
    },
    "card": {
        "object": "card",
        "id": "card_ci6v2mom200br5616ln4vg10q",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": null
}
```

## Atualizando uma assinatura

> Rota

```
PUT https://api.pagar.me/1/subscriptions/:id
```

> Exemplo de Requisição 

```shell
curl -X PUT https://api.pagar.me/1/subscriptions/14858 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Após criar uma assinatura, você pode atualizar os dados do **método do pagamento** e o **plano** que essa assinatura está atrelada.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `plan_id` | Não | - | id do novo plano atrelado a assinatura |
| `payment_method` | Não | - | meio de pagamento  |

> JSON Retornado (Exemplo)

```json
{
    "object": "subscription",
    "plan": {
        "object": "plan",
        "id": 12830,
        "amount": 1300,
        "days": 15,
        "name": "Plano Prata",
        "trial_days": 0,
        "date_created": "2015-03-06T17:25:25.000Z",
        "payment_methods": [
            "boleto",
            "credit_card"
        ],
        "color": null,
        "charges": null,
        "installments": 1
    },
    "id": 14858,
    "current_transaction": {
        "object": "transaction",
        "status": "waiting_payment",
        "refuse_reason": null,
        "status_reason": "acquirer",
        "acquirer_response_code": null,
        "acquirer_name": "development",
        "authorization_code": null,
        "soft_descriptor": null,
        "tid": null,
        "nsu": null,
        "date_created": "2015-03-06T18:15:12.000Z",
        "date_updated": "2015-03-06T18:15:12.000Z",
        "amount": 1300,
        "installments": 1,
        "id": 185486,
        "cost": 0,
        "card_holder_name": null,
        "card_last_digits": null,
        "card_first_digits": null,
        "card_brand": null,
        "postback_url": null,
        "payment_method": "boleto",
        "antifraud_score": null,
        "boleto_url": "https://pagar.me",
        "boleto_barcode": "1234 5678",
        "boleto_expiration_date": "2015-03-13T18:15:12.000Z",
        "referer": null,
        "ip": null,
        "subscription_id": 14858,
        "metadata": {}
    },
    "postback_url": null,
    "payment_method": "boleto",
    "card_brand": null,
    "card_last_digits": null,
    "current_period_start": null,
    "current_period_end": null,
    "charges": 0,
    "status": "unpaid",
    "date_created": "2015-03-04T18:41:57.000Z",
    "phone": null,
    "address": null,
    "customer": {
        "object": "customer",
        "document_number": null,
        "document_type": "cpf",
        "name": null,
        "email": "api@test.com",
        "born_at": null,
        "gender": null,
        "date_created": "2015-03-04T18:40:03.000Z",
        "id": 14437
    },
    "card": {
        "object": "card",
        "id": "card_ci6v2mom200br5616ln4vg10q",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": null
}
```

## Cancelando uma inscrição

> Rota

```
POST https://api.pagar.me/1/subscriptions/:id/cancel
```

> Exemplo de Requisição 

```shell
curl -X POST https://api.pagar.me/1/subscriptions/14858/cancel \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Para cancelar uma assinatura você deve utilizar a rota `/subscriptions/:id/cancel`

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

> JSON Retornado (Exemplo)

```json
{
    "object": "subscription",
    "plan": {
        "object": "plan",
        "id": 12830,
        "amount": 1300,
        "days": 15,
        "name": "Plano Prata",
        "trial_days": 0,
        "date_created": "2015-03-06T17:25:25.000Z",
        "payment_methods": [
            "boleto",
            "credit_card"
        ],
        "color": null,
        "charges": null,
        "installments": 1
    },
    "id": 14858,
    "current_transaction": {
        "object": "transaction",
        "status": "waiting_payment",
        "refuse_reason": null,
        "status_reason": "acquirer",
        "acquirer_response_code": null,
        "acquirer_name": "development",
        "authorization_code": null,
        "soft_descriptor": null,
        "tid": null,
        "nsu": null,
        "date_created": "2015-03-06T18:15:12.000Z",
        "date_updated": "2015-03-06T18:15:12.000Z",
        "amount": 1300,
        "installments": 1,
        "id": 185486,
        "cost": 0,
        "card_holder_name": null,
        "card_last_digits": null,
        "card_first_digits": null,
        "card_brand": null,
        "postback_url": null,
        "payment_method": "boleto",
        "antifraud_score": null,
        "boleto_url": "https://pagar.me",
        "boleto_barcode": "1234 5678",
        "boleto_expiration_date": "2015-03-13T18:15:12.000Z",
        "referer": null,
        "ip": null,
        "subscription_id": 14858,
        "metadata": {}
    },
    "postback_url": null,
    "payment_method": "boleto",
    "card_brand": null,
    "card_last_digits": null,
    "current_period_start": null,
    "current_period_end": null,
    "charges": 0,
    "status": "canceled",
    "date_created": "2015-03-04T18:41:57.000Z",
    "phone": null,
    "address": null,
    "customer": {
        "object": "customer",
        "document_number": null,
        "document_type": "cpf",
        "name": null,
        "email": "api@test.com",
        "born_at": null,
        "gender": null,
        "date_created": "2015-03-04T18:40:03.000Z",
        "id": 14437
    },
    "card": {
        "object": "card",
        "id": "card_ci6v2mom200br5616ln4vg10q",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": null
}
```

## Transações em uma assinatura

> Rota

```
GET https://api.pagar.me/1/subscriptions/:id/transactions
```

> Exemplo de Requisição 

```shell
curl -X GET https://api.pagar.me/1/subscriptions/14858/transactions \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Para cancelar uma assinatura você deve utilizar a rota `/subscriptions/:id/cancel`

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

> JSON Retornado (Exemplo)

```json
[{
    "object": "transaction",
    "status": "waiting_payment",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": null,
    "acquirer_name": "development",
    "authorization_code": null,
    "soft_descriptor": null,
    "tid": null,
    "nsu": null,
    "date_created": "2015-03-06T18:15:12.000Z",
    "date_updated": "2015-03-06T18:15:12.000Z",
    "amount": 1300,
    "installments": 1,
    "id": 185486,
    "cost": 0,
    "card_holder_name": null,
    "card_last_digits": null,
    "card_first_digits": null,
    "card_brand": null,
    "postback_url": null,
    "payment_method": "boleto",
    "antifraud_score": null,
    "boleto_url": "https://pagar.me",
    "boleto_barcode": "1234 5678",
    "boleto_expiration_date": "2015-03-13T18:15:12.261Z",
    "referer": null,
    "ip": null,
    "subscription_id": 14858,
    "phone": null,
    "address": null,
    "customer": {
        "object": "customer",
        "document_number": null,
        "document_type": "cpf",
        "name": null,
        "email": "api@test.com",
        "born_at": null,
        "gender": null,
        "date_created": "2015-03-04T18:40:03.000Z",
        "id": 14437
    },
    "card": {
        "object": "card",
        "id": "card_ci6v2mom200br5616ln4vg10q",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": {}
}, {
    "object": "transaction",
    "status": "waiting_payment",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": null,
    "acquirer_name": "development",
    "authorization_code": null,
    "soft_descriptor": null,
    "tid": null,
    "nsu": null,
    "date_created": "2015-03-06T18:02:25.000Z",
    "date_updated": "2015-03-06T18:02:26.000Z",
    "amount": 31000,
    "installments": 1,
    "id": 185481,
    "cost": 0,
    "card_holder_name": null,
    "card_last_digits": null,
    "card_first_digits": null,
    "card_brand": null,
    "postback_url": null,
    "payment_method": "boleto",
    "antifraud_score": null,
    "boleto_url": "https://pagar.me",
    "boleto_barcode": "1234 5678",
    "boleto_expiration_date": "2015-03-13T18:02:25.904Z",
    "referer": null,
    "ip": null,
    "subscription_id": 14858,
    "phone": null,
    "address": null,
    "customer": null,
    "card": null,
    "metadata": {}
}, {
    "object": "transaction",
    "status": "paid",
    "refuse_reason": null,
    "status_reason": "acquirer",
    "acquirer_response_code": "00",
    "acquirer_name": "development",
    "authorization_code": "11344",
    "soft_descriptor": null,
    "tid": 1425494517057,
    "nsu": 1425494517057,
    "date_created": "2015-03-04T18:41:56.000Z",
    "date_updated": "2015-03-04T18:41:57.000Z",
    "amount": 31000,
    "installments": 1,
    "id": 185122,
    "cost": 515,
    "card_holder_name": "Api Customer",
    "card_last_digits": "3123",
    "card_first_digits": "548045",
    "card_brand": "mastercard",
    "postback_url": null,
    "payment_method": "credit_card",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "boleto_expiration_date": null,
    "referer": "api_key",
    "ip": "189.8.94.42",
    "subscription_id": 14858,
    "phone": null,
    "address": null,
    "customer": {
        "object": "customer",
        "document_number": null,
        "document_type": "cpf",
        "name": null,
        "email": "api@test.com",
        "born_at": null,
        "gender": null,
        "date_created": "2015-03-04T18:40:03.000Z",
        "id": 14437
    },
    "card": {
        "object": "card",
        "id": "card_ci6v2mom200br5616ln4vg10q",
        "date_created": "2015-03-04T18:41:56.000Z",
        "date_updated": "2015-03-04T18:41:57.000Z",
        "brand": "mastercard",
        "holder_name": "Api Customer",
        "first_digits": "548045",
        "last_digits": "3123",
        "fingerprint": "HSiLJan2nqwn",
        "valid": true
    },
    "metadata": {}
}]
```
# Cartões

## Objeto `card`

Sempre que você faz uma requisição através da nossa API nós guardamos as informações do portador do cartão, para que, futuramente, você possa utilizar essas informações para novas cobranças, ou implementação de features como *one-click-buy*.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `subscription` |
| `id` | `String` | Identificador do cartão |
| `date_created` | `String` | Data de criação do objeto `card` |
| `date_updated` | `String` | Data de atualização do objeto `card` |
| `brand` | `String` | Marca da operadora do cartão |
| `holder_name` | `String` | Nome do portador do cartão |
| `first_digits` | `String` | Primeiros dígitos do cartão (6 dígitos) |
| `last_digits` | `String` | Últimos dígitos do cartão (4 dígitos) |
| `fingerprint` | `String` | Parâmetro usado para validar a notificação de POSTback ([saiba mais](https://pagar.me/docs/advanced/#validando-a-origem-de-um-postback)) |
| `customer` | `Object` | Objeto com dados do comprador |
| `valid` | `Boolean` | Propriedade para verificar a validade do cartão |

> Objeto card

```json
{
    "object": "card",
    "id": "card_ci6y37hc00030a416wrxsmzyi",
    "date_created": "2015-03-06T21:21:25.000Z",
    "date_updated": "2015-03-06T21:21:26.000Z",
    "brand": "visa",
    "holder_name": "API CUSTOMER",
    "first_digits": "401872",
    "last_digits": "8048",
    "fingerprint": "Jl9oOIiDjAjR",
    "customer": null,
    "valid": true
}
```

## Criando um cartão

> Rota

```
POST https://api.pagar.me/1/cards
```

> Exemplo de Requisição 

```shell
curl -X  POST https://api.pagar.me/1/plans/13580 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'card_number=4018720572598048' \
-d 'holder_name=API Customer' \
-d 'card_expiration_date=0116'
```

```ruby
```

```php
```

```cs
```

Você pode armazenar os dados do cartão do seu cliente através da rota `/cards`, assim você poderá usar o `id` do objeto gerado para realizar futuras transações, no lugar do `card_hash`.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `card_number` | Sim | - | Número do portador do cartão |
| `card_holder_name` ou `holder_name` | Sim | - | Nome do portador do cartão |
| `card_expiration_date` ou `expiration_date` | Sim | - | Data de expiração do  |
| `customer_id` | Não | - | Você pode usar o `id` do objeto `customer` para associar mais informações do cliente ao `card` a ser gerado |

> JSON Retornado (Exemplo)

```json
{
    "object": "card",
    "id": "card_ci6y37h16wrxsmzyi",
    "date_created": "2015-03-06T21:21:25.000Z",
    "date_updated": "2015-03-06T21:21:26.000Z",
    "brand": "visa",
    "holder_name": "API CUSTOMER",
    "first_digits": "401872",
    "last_digits": "8048",
    "fingerprint": "Jl9oOIiDjAjR",
    "customer": null,
    "valid": true
}
```

## Retornando um cartão salvo

> Rota

```
GET https://api.pagar.me/1/cards/:id
```

> Exemplo de Requisição 

```shell
curl -X  GET https://api.pagar.me/1/cards/card_ci6y37h16wrxsmzyi \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
```

```ruby
```

```php
```

```cs
```

Use a rota `/cards/:id` para retornar os dados de um cartão previamente salvo.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

> JSON Retornado (Exemplo)

```json
{
    "object": "card",
    "id": "card_ci6y37h16wrxsmzyi",
    "date_created": "2015-03-06T21:21:25.000Z",
    "date_updated": "2015-03-06T21:21:26.000Z",
    "brand": "visa",
    "holder_name": "API CUSTOMER",
    "first_digits": "401872",
    "last_digits": "8048",
    "fingerprint": "Jl9oOIiDjAjR",
    "customer": null,
    "valid": true
}
```

# Saldo

## Objeto `balance`

Com este objeto, você pode obter informações gerais sobre o saldo da sua conta.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `subscription` |
| `waiting_funds` | `Object` | Possui a propriedade `amount`, que representa quanto, em centavos, você tem... |
| `available` | `Object` | Possui a propriedade `amount`, que representa quanto, em centavos, você tem disponível para receber |
| `transferred` | `Object` | Possui a propriedade `amount`, que representa quanto, em centavos, você já transferiu para sua conta (quanto já recebeu efetivamente) |


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

## Saldo geral das operações

> Rota

```
GET https://api.pagar.me/1/balance
```

> Exemplo de Requisição 

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

Com essa rota `/balance` você poderá consultar o saldo das transações da sua companhia.

**ps**: os valores retornados estão em **centavos**.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

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

# Operações

## Objeto `balance_operation`

Com este objeto você poderá acompanhar como estava/está seu saldo a cada movimentação bancária.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `balance_operation` |
| `id` | `String` | Identificador da operação |
| `status` | `String` | Estado do saldo da conta. <br> **Valores possíveis**: `waiting_funds`, `available` e `transferred` |
| `balance_amount` | `Number` | Saldo atual da conta |
| `balance_old_amount` | `Number` | Saldo antes da última movimentação |
| `movement_type` | `String` |  |
| `amount` | `Number` | Valor transacionado para a conta |
| `fee` | `Number` | Taxa cobrada pela transação |
| `date_created` | `String` | Data da movimentação |
| `movement_object` | `Object` |  |


> Objeto balance_operation

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

## Histórico das operações

> Rota

```
GET https://api.pagar.me/1/balance/operations
```

> Exemplo de Requisição 

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

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

## Histórico específico de uma operação 

> Rota

```
GET https://api.pagar.me/1/balance/operations/:id
```

> Exemplo de Requisição 

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

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

# Clientes

## Retornando dados do cliente

> Rota

```
GET https://api.pagar.me/1/customers/:id
```

> Exemplo de Requisição 

```shell
curl -X  GET https://api.pagar.me/1/customers/11222 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
```

```php
```

```cs
```

Através da rota `/customers/:id` você recebe todos os dados do seu cliente, previamente cadastrado na realização de uma transação, quando os dados deste é passado pelos parâmetros `customer[nomeDaPropriedade]`.

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

> JSON Retornado (Exemplo)

```json
{
    "object": "customer",
    "document_number": "31442053332",
    "document_type": "cpf",
    "name": "api customer fullname",
    "email": "api@customer.com.br",
    "born_at": null,
    "gender": null,
    "date_created": "2014-10-13T10:51:38.000Z",
    "id": 11222,
    "phones": [{
        "object": "phone",
        "ddi": "55",
        "ddd": "22",
        "number": "99887766",
        "id": 12345
    }],
    "addresses": [{
        "object": "address",
        "street": "Rua Veneza",
        "complementary": null,
        "street_number": "31",
        "neighborhood": "São Paulo",
        "city": "Av API",
        "state": "SP",
        "zipcode": "15078731",
        "country": "Brasil",
        "id": 13743
    }]
}
```

# Companhia

## Objeto `company`

Através deste objeto você consegue visualizar vários dados da sua companhia, como:

- Usuários
- chaves de Api e Encriptação
- dados de assinaturas
- dados do antifraude
- etc

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `company` |
| `name` | `String` | Nome da companhia |
| `status` | `String` | Estado da companhia atual. <br> **Valores possíveis**: `temporary`, `pending_confirmation`,  `pending_activation`, `paid` |
| `id` | `String` | Identificador da companhia |
| `date_created` | `String` | Data de criação da companhia |
| `preferences` | `` |  |
| `branding` | `Object` | Objeto com dados da sua marca |
| `branding[primary_color]` | `String` | Valor hexadecimal da cor previamente configurada da sua marca. <br> **Ex**: `#ccff00` |
| `branding[logo]` | `String` | URL do seu logo |
| `users` | `Array` | Array de objetos `user` |
| `user` | `Object` | Dados de um usuário. Veja mais [aqui](/?shell#objeto-user) |
| `api_key` | `Object` | Objeto com as chaves `live` e `test` da API |
| `api_key[live]` | `String` | Chave *live* da API |
| `api_key[test]` | `String` | Chave *test* da API |
| `encryption_key` | `Object` | Objeto com chaves `live` e `test` de encriptação |
| `encryption_key[live]` | `String` | Chave *live* de encriptação |
| `encryption_key[test]` | `String` | Chave *test* de encriptação |
| `subscriptions` | `Object` | Objeto com detalhes de configuração das assinaturas |
| `subscriptions[payment_deadline]` | `Number` | Dias que o usuário pode ficar inadimplemente antes de ter a assinatura cancelada. <br> **Padrão**: `5` |
| `subscriptions[email_customers]` | `Boolean` | Variável que informa se o cliente será notificado ou não, independente do tipo da notificação. |
| `subscriptions[charge_attempts]` | `Number` | Número de tentativas de cobrança |
| `subscriptions[chrages_interva;_in_days]` | `Number` | Espaço, em dias, entre uma cobrança e outra |
| `subscriptions[cancel_after_failed_charges]` | `Boolean` | Caso as cobranças não sejam bem sucedidas, você pode optar por cancelar essa assinatura automaticamente |
| `subscriptions[customer_can_cancel_subscription]` | `Boolean` | Habilita a opção do seu cliente cancelar uma assinatura |
| `antifraud` | `Object` | Dados de configuração do seu antifraude. Dentro deste objeto, existem mais dois objetos, `test` e `live`, que contém as mesmas propriedades |
| `antifraud[test / live][providers]` | `Array` | Contém objetos literais com propriedades identificando os dados do(s) antifraude(s) |
| `antifraud[test / live][providers][0][id]` | `String` | Identificador do antifraude |
| `antifraud[test / live][providers][0][enabled]` | `Boolean` | Propriedade que identifica se o antifraude está ativo ou não |
| `antifraud[test / live][providers][0][name]` | `String` | Nome do antifraude |
| `antifraud[test / live][providers][0][date_created]` | `String` | Data de ativação do antifraude (ISODate) |
| `antifraud[test / live][providers][0][date_updated]` | `String` | Data de atualização do antifraude (ISODate) |
| `antifraud[test / live][providers][0][last_enabled_change]` | `String` | Dia da última alteração de status do antifraude (ISODate - padrão: `null`) |
| `antifraud[test / live][enabled]` | `Boolean` | Propriedade que sinaliza se o antifraude está habilitado ou não nas transações do cliente |
| `antifraud[test / live][last_enabled_change]` | `String` | Dia da última alteração de status do antifraude (ISODate - padrão: `null`) |
| `antifraud[test / live][rule]` | `String` | Regra para validar se o cliente/transação é confiável ou não |
| `transaction_cost` | `Object` | Objeto com dados dos custos das transações por boleto e por cart
ào de crédito |
| `transaction_cost[credit_card]` | `Number` | Valor, em centavos, cobrado das transações feitas utilizando cartão de crédito |
| `transaction_cost[boleto]` | `Number` | Valor, em centavos, cobrado das transações feitas utilizando boleto |
| `transaction_spread` | `Object` |  |
| `transaction_spread[credit_card]` | `Number` |  |
| `transaction_spread[boleto]` | `Number` |  |

> Objeto company

```json
{
    "object": "company",
    "name": "Pagar.me",
    "status": "active",
    "id": "5240a52b1bbc9cb50e000003",
    "date_created": "2013-10-10T20:35:54.941Z",
    "preferences": {},
    "branding": {
        "primary_color": "#ef6d00",
        "logo": "https://d1fzuw5mzeho8x.cloudfront.net/companies/5240a52b1bbc9cb50e000003/branding/logo_1417732661478.jpg"
    },
    "users": [{
        "object": "user",
        "id": "5240a52b1bbc9cb50e000004",
        "email": "fulano@pagar.me",
        "name": "Pagar.me",
        "permission": "admin",
        "date_created": "2014-12-10T00:35:54.939Z"
    }, {
        "object": "user",
        "id": "iauASUGQqweoiu123OIUAais",
        "email": "ciclano@pagar.me",
        "name": "Ciclano da Silva",
        "permission": "read_write",
        "date_created": "2014-01-16T15:28:38.201Z"
    }],
    "api_key": {
        "live": "ak_live_ASDFGBR4omAE469CEghXsh12cKsoao",
        "test": "ak_test_ASXAUXHAicOa2BLAsdkoajopq7x788"
    },
    "encryption_key": {
        "live": "ek_live_bspDfASIdiasudads87yas7d7qyap1v",
        "test": "ek_test_879asdhasjdq124ASUhdahusdOA123a"
    },
    "subscriptions": {
        "payment_deadline": 5,
        "email_customers": true,
        "charge_attempts": 4,
        "charges_interval_in_days": 3,
        "cancel_after_failed_charges": false,
        "customer_can_cancel_subscription": true
    },
    "antifraud": {
        "test": {
            "providers": [{
                "id": "87a6sd6qdas87d6asduqyu12",
                "enabled": true,
                "name": "development",
                "date_created": "2014-12-21T22:16:38.990Z",
                "date_updated": "2015-03-12T19:05:52.740Z",
                "last_enabled_change": null
            }],
            "enabled": false,
            "last_enabled_change": "2015-02-02T18:24:24.192Z",
            "rule": "development.score <= 95.0 || development.status == 'failed'"
        },
        "live": {
            "providers": [{
                "id": "3245237456YAGSDgsdgasyas",
                "enabled": true,
                "name": "clearsale",
                "date_created": "2014-12-21T22:16:38.990Z",
                "date_updated": "2015-03-12T19:05:52.740Z",
                "last_enabled_change": null
            }],
            "enabled": false,
            "last_enabled_change": "2015-03-04T19:47:15.575Z",
            "rule": "clearsale.score <= 95.0 || clearsale.status == 'failed'"
        }
    },
    "transaction_cost": {
        "credit_card": 50,
        "boleto": 115
    },
    "transaction_spread": {
        "credit_card": 1.5,
        "boleto": 0
    }
}
```

# Antifraude

## Objeto `antifraud_analysis`

Objeto retornado após a análise antifraude feita em uma transação.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `antifraud_analysis` |
| `name` | `String` | Nome do antifraude utilizado |
| `score` | `Number` | pontuação, de 0 a 100, da probabilidade de fraude na transação realizada |
| `cost` | `Number` | Custo da análise antifraude |
| `status` | `String` | Possíveis valores de estado para as análises antifraude: `processing`, `approved`, `refused` e `failed` |
| `date_created` | `String` | Data de criação da transação no formato ISODate |
| `date_updated` | `String` | Data de atualização da transação no formato ISODate |
| `id` | `Number` | Número identificador da análise antifraude |

> Objeto antifraud_analysis

```json
{
    "cost": 60,
    "date_created": "2015-01-10T12:31:13.000Z",
    "date_updated": "2015-03110T12:31:13.000Z",
    "id": 99999,
    "name": "clearsale",
    "object": "antifraud_analysis",
    "score": 31.39,
    "status": "approved"
}
```

# Usuário

## Objeto `user`

Dados de um usuário registrado no nosso sistema.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `user` |
| `id` | `String` | Identificador do usuário |
| `email` | `String` | Email do usuário |
| `name` | `String` | Nome do usuário |
| `permission` | `String` | Tipo de permissão do usuário. <br> **Tipos**: `admin`, `read_write`, `read_only` |
| `date_created` | `String` | Data da criação do usuário (ISODate) |

> Objeto user

```json
{
    "object": "user",
    "id": "52d7faa6d8dd64e210f6c4e3",
    "email": "ciclano@pagar.me",
    "name": "Ciclano da Silva",
    "permission": "read_write",
    "date_created": "2014-01-16T15:28:38.201Z"
}
```
