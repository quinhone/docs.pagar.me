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

Ao criar ou atualizar uma transação, este será o objeto que você irá receber como resposta em cada etapa do processo de efetivação da transação.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `transaction` |
| `status` | `String` | Para cada atualização no processamento da transação, esta propriedade será alterada, e o objeto `transaction` retornado como resposta através da sua URL de *postback* ou após o término do processamento da ação atual. <br> **Valores possíveis**: `processing`, `authorized`, `paid`, `refunded`, `waiting_payment`, `pending_refund`, `refused` |
| `status_reason` | `String` | Motivo/agente responsável pela validação ou anulação da transação. <br> **Valores possíveis**: `acquirer`, `antifraud`, `internal_error`, `no_acquirer`, `acquirer_timeout` |
| `acquirer_response_code` | `String` | Mensagem de resposta do adquirente referente ao status da transação.  |
| `authorization_code` | `String` | Código de autorização retornado pela bandeira. |
| `soft_descriptor` | `String` | Texto que irá aparecer na fatura do cliente depois do nome da loja. <br> **OBS**: Limite de 13 caracteres. |
| `tid` | `String` | Código que identifica a transação no adquirente. |
| `nsu` | `String` | Código que identifica a transação no adquirente. |
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
| `referer` | `String` | Mostra se a transação foi criada utilizando a API Key ou Encryption Key. |
| `ip` | `String` | IP de origem que criou a transção, podendo ser ou do seu cliente (quando criado via checkout ou utilizando card_hash) ou do servidor. |
| `subscription_id` | `Number` | Caso essa transação tenha sido originada na cobrança de uma assinatura, o `id` desta será o valor dessa propriedade  |
| `phone` | `Object` | Objeto com dados do telefone do cliente |
| `address` | `Object` | Objeto com dados do endereço do cliente |
| `customer` | `Object` | Objeto com dados do cliente |
| `card` | `Object` | Objeto com dados do cartão do cliente |
| `metadata` | `Object` | Objeto com dados adicionais do cliente/produto/serviço vendido |

## Criando uma transação

> POST https://api.pagar.me/1/transactions

```shell
curl -X POST https://api.pagar.me/1/transactions \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'amount=3100' \
-d 'card_id=card_ci6l9fx8f0042rt16rtb477gj' \
-d 'postback_url=http://requestb.in/pkt7pgpk' \
-d 'metadata[idProduto]=13933139'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.new({
    :amount => 3100,
    :card_id => "card_ci6l9fx8f0042rt16rtb477gj",
    :postback_url => "http://requestb.in/pkt7pgpk",
    :metadata[idProduto] => 13933139
})

transaction.charge
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

    $transaction = new PagarMe_Transaction(array(
        "amount" => 3100,
        "card_id" => "card_ci6l9fx8f0042rt16rtb477gj",
        "postback_url" => "http://requestb.in/pkt7pgpk",
        "metadata" => array(
            "idProduto" => 13933139
        )
    ));

    $transaction->charge();
?>
```

```cs
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

Transaction transaction = new Transaction();

transaction.Amount = 3100;
transaction.CardId = "card_ci6l9fx8f0042rt16rtb477gj";
transaction.PostbackUrl = "http://requestb.in/pkt7pgpk";
transaction.Metadata = new Metadata() {
    IdProduto = 13933139
};

transaction.Save();
```

Para fazer uma cobrança, você deve usar a rota `/transactions` para criar sua transação, que pode ser feita por cartão de crédito ou por boleto bancário.

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
    "idProduto": "13933139"
  }
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `amount` | Sim | - | Valor a ser cobrado. Deve ser passado em centavos. Ex: R$ 10.00 = `1000` |
| `card_hash` | Sim\* | - | Informações do cartão do cliente criptografadas no navegador. <br>**OBS**: Para os dados do cartão você deve passar **ou** o  `card_hash` **ou** o  `card_id` |
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
| `split_rules` | Não | - | Esse parâmetro é um `Array` que irá conter as regras da divisão do valor transacionado. <br> **OBS**: Caso você deseje incluir mais regras, passe os parâmetros abaixo alterando o índice em `+1` para cada nova regra/recebedor |
| `split_rules[0][recipient_id]` | Não | - | Identificador do [recebedor](/#recebedores) |
| `split_rules[0][charge_processing_fee]` | Não | `true` | Indica se o recebedor vinculado a essa regra de divisão será cobrado pelas taxas da transação |
| `split_rules[0][liable]` | Não | `true` | Indica se o recebedor vinculado a essa regra de divisão assumirá o risco da transação, ou seja, possíveis estornos (*chargeback*) |
| `split_rules[0][percentage]` | Não | - | Define a porcentagem a ser recebida pelo recebedor configurado na regra. <br> **OBS**: se for utilizado a propriedade `percentage`, a propriedade `amount` não será necessária |
| `split_rules[0][amount]` | Não | - | Define o valor a ser recebido pelo recebedor configurado na regra. <br> **OBS**: se for utilizado a propriedade `amount`, a propriedade `percentage` não será necessária |

**OBS**: Caso você vá usar o recurso antifraude, é **obrigatório** passar os dados do cliente na hora da criação da transação, como explicado [aqui](https://pagar.me/docs/transactions/#customer-data).

## Retornando uma Transação

> GET https://api.pagar.me/1/transactions/:id

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

Retorna os dados de uma transação realizada.

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id` | Sim | - | id da transação previamente criada |

## Retornando transações

> GET https://api.pagar.me/1/transactions

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id` | Sim | - | id da transação previamente criada |
| `count` | Não | `10` | Retorna `n` objetos de transação |
| `page` | Não | `1` | Útil para implementação de uma paginação de resultados |

## Gerando uma nova chave para encriptação do `card_hash`

> GET https://api.pagar.me/1/transactions/card_hash_key

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `encryption_key` | Sim | - | Chave de encriptação (disponível no seu dashboard) |

## Retornando as regras de divisão de uma transação

> GET https://api.pagar.me/1/transactions/:transaction_id/split_rules

```shell
curl -X GET https://api.pagar.me/1/transactions/189164/split_rules \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna os dados das regras de divisão do valor transacionado.

> JSON Retornado (exemplo):

```json
[{
    "object": "split_rule",
    "id": "sr_ci7ntawl1001s2m164zrbp7tz",
    "recipient_id": "re_ci7nhf1ay0007n016wd5t22nl",
    "charge_processing_fee": true,
    "liable": true,
    "percentage": 30,
    "amount": null,
    "date_created": "2015-03-24T21:26:09.000Z",
    "date_updated": "2015-03-24T21:26:09.000Z"
}, {
    "object": "split_rule",
    "id": "sr_ci7ntawl1001t2m1606u3e0uw",
    "recipient_id": "re_ci7nheu0m0006n016o5sglg9t",
    "charge_processing_fee": true,
    "liable": false,
    "percentage": 70,
    "amount": null,
    "date_created": "2015-03-24T21:26:09.000Z",
    "date_updated": "2015-03-24T21:26:09.000Z"
}]
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:transaction_id` | Sim | - | id da transação previamente criada |

## Retornando uma regra de divisão específica

> GET https://api.pagar.me/1/transactions/:transaction_id/split_rules/:id

```shell
curl -X GET https://api.pagar.me/1/transactions/189164/split_rules/sr_ci7ntawl1001s2m164zrbp7tz \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna os dados de uma regra de divisão de uma determinada transaçào.

> JSON Retornado (exemplo):

```json
{
    "object": "split_rule",
    "id": "sr_ci7ntawl1001s2m164zrbp7tz",
    "recipient_id": "re_ci7nhf1ay0007n016wd5t22nl",
    "charge_processing_fee": true,
    "liable": true,
    "percentage": 30,
    "amount": null,
    "date_created": "2015-03-24T21:26:09.000Z",
    "date_updated": "2015-03-24T21:26:09.000Z"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:transaction_id` | Sim | - | Identificador da transação previamente criada |
| `id` | Sim | - | Identificador da regra de divisão |

## Retorna uma análise antifraude

> GET https://api.pagar.me/1/transactions/:transaction_id/antifraud_analyses/:id

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:transaction_id` | Sim | - | id da transação |
| `:id` | Sim | - | id da análise previamente feita |

## Retorna todas as análises antifraude

> GET https://api.pagar.me/1/transactions/:transaction_id/antifraud_analyses

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:transaction_id` | Sim | - | id da transação |

## Notificando cliente sobre boleto à ser pago

> POST https://api.pagar.me/1/transactions/:id/collect_payment

```shell
curl -X POST https://api.pagar.me/1/transactions/314578/collect_payment \
-d 'api_key=ak_live_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'email=seu@email.com'
```

```ruby
```

```php
```

```cs
```

Envia o link de um boleto pendente para o cliente.

**OBS**: Essa rota não funciona em ambiente de testes.

> JSON Retornado (Exemplo)

```json
{ }
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id` | Sim | - | id da transação |
| `email` | Sim | - | email a ser enviado o link do boleto |

## Capturando uma transação posteriormente

> POST https://api.pagar.me/1/transactions/:id/capture

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id` | Sim | - | Id da transação a ser capturada |

## Estorno de transação

> POST https://api.pagar.me/1/transactions/:id/refund

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

## Calculando Pagamentos Parcelados

> GET https://api.pagar.me/1/transactions/calculate_installments_amount

```shell
curl -X GET https://api.pagar.me/1/transactions/calculate_installments_amount \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0 \
-d 'max_installments=3' \
-d 'free_installments=1' \
-d 'interest_rate=13' \
-d 'amount=1300'
```

Usada para calcular o valor de cada uma das parcelas de uma compra.

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `max_installments` | Sim | 12 | Valor máximo de parcelas |
| `free_installments` | Não | 1 | Número de parcelas isentas de juros |
| `interest_rate` | Sim | - | Valor da taxa de juros |
| `amount` | Sim | - | Valor do produto/serviço vendido |

# Planos

Através dessas rotas você pode gerenciar todos os planos do seu negócio, para posteriormente criar cobranças recorrentes, que serão as assinaturas.

## Objeto `plan`

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

## Criando Planos

> POST https://api.pagar.me/1/plans

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `amount` | Sim | - | Valor que será cobrado recorrentemente (em centavos). Ex: R$49,90 = `4990` |
| `days` | Sim | - | Prazo, em dias, para cobrança das parcelas |
| `name` | Sim | - | Nome do plano |
| `trial_days` | Não | `0` | Dias para teste gratuito do produto. Valor começará a ser cobrado no dia `trial_days + 1` |
| `payment_methods` | Não | `[boleto, credit_card]` | Meios de pagamentos aceitos. Pode ser boleto, cartão de crédito ou ambos |
| `color` | Não | `null` | Armazena o valor de uma cor para o plano |
| `charges` | Não | `null` | Número de cobranças que poderão ser feitas nesse plano. <br> **Ex**: Plano cobrado 1x por ano, válido por no máximo 3 anos. Nesse caso, nossos parâmetros serão: `days = 365, charges = 3, installments = 1` <br> **OBS**: `null` irá cobrar o usuário indefinidamente, ou até o plano ser cancelado |
| `installments` | Não | `1` | Número de parcelas entre cada *charge*. <br> **Ex**: Plano anual, válido por 2 anos, podendo ser divido em até 12 vezes. Nesse caso, nossos parâmetros serão: `days = 30, charges = 2, installments = 12` <br> **OBS**: Boleto sempre terá `installments = 1` |

Veja mais sobre como criar um plano [aqui](https://pagar.me/docs/plans-subscriptions/#criando-um-plano).

## Retornando Planos

> GET https://api.pagar.me/1/plans/:id

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id`| Sim | - | id de identificação do plano previamente criado |

## Atualizando Planos

> PUT https://api.pagar.me/1/plans/:id

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `:id`| Sim | - | id de identificação do plano previamente criado |
| `name` | Não | - | Nome do plano |
| `trial_days` | Não | - | Dias para testar o produto/serviço gratuitamente |

## Deletando Planos

> DELETE https://api.pagar.me/1/plans/:id

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

# Assinaturas

## Objeto `subscription`

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

Esse objeto contém os dados das assinaturas geradas pelo seu sistema, que são atreladas a um **plano**.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `subscription` |
| `plan` | `Object` | Objeto com os dados do plano que a assinatura está associada |
| `id` | `Number` | Número identificador do plano |
| `current_transaction` | `Object` | Objeto com os dados da última transação realizada nessa assinatura |
| `postback_url` | `String` | Endpoint da aplicação integrada ao Pagar.me que irá receber os jsons de resposta a cada atualização dos processos |
| `payment_method` | `String` | Método de pagamento associado a essa assinatura |
| `current_period_start` | `String` | Início da criação da assinatura |
| `current_period_end` | `String` | Término do período da assinatura |
| `charges` | `Number` | Número de cobranças a serem efetuadas |
| `status` | `String` | Possíveis estados da transação/assinatura <br> **Valores possíveis**: `trialing`, `paid`, `pending_payment`, `unpaid`, `canceled`, `ended` |
| `date_created` | `String` | Data da criação d assinatura |
| `phone` | `Object` | Objeto com dados do telefone do cliente |
| `address` | `Object` | Objeto com dados do endereço do cliente |
| `customer` | `Object` | Objeto com dados do cliente |
| `card` | `Object` | Objeto com dados do cartão do cliente |
| `metadata` | `Object` | Objeto com dados adicionais do cliente/produto/serviço vendido |

## Criando assinaturas

> POST https://api.pagar.me/1/subscriptions

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

**OBS**: Você pode passar os objetos `customer` e `metadata` na criação de uma assinatura, assim como feito na criação de uma transação. A diferença é que a propriedade `customer[email]` é obrigatória na criação da **assinatura**. 

**OBS**: As transações criadas pelas assinaturas não passam pelo antifraude, devido a ocorrência de fraudes nesse tipo de serviço serem praticamente nulas.

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

## Retornando Assinaturas

> GET https://api.pagar.me/1/subscriptions/:id

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Atualizando uma assinatura

> PUT https://api.pagar.me/1/subscriptions/:id

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `plan_id` | Não | - | id do novo plano atrelado a assinatura |
| `payment_method` | Não | - | meio de pagamento  |

## Cancelando uma assinatura

> POST https://api.pagar.me/1/subscriptions/:id/cancel

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Transações em uma assinatura

> GET https://api.pagar.me/1/subscriptions/:id/transactions

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

# Cartões

## Objeto `card`

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

## Criando um cartão

> POST https://api.pagar.me/1/cards

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `card_number` | Sim | - | Número do portador do cartão |
| `card_expiration_date` ou `expiration_date` | Sim | - | Data de expiração do  |
| `customer_id` | Não | - | Você pode usar o `id` do objeto `customer` para associar mais informações do cliente ao `card` a ser gerado |

## Retornando um cartão salvo

> GET https://api.pagar.me/1/cards/:id

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

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

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `subscription` |
| `waiting_funds` | `Object` | Possui a propriedade `amount`, que representa quanto, em centavos, você tem... |
| `available` | `Object` | Possui a propriedade `amount`, que representa quanto, em centavos, você tem disponível para receber |
| `transferred` | `Object` | Possui a propriedade `amount`, que representa quanto, em centavos, você já transferiu para sua conta (quanto já recebeu efetivamente) |

## Saldo geral das operações

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

Com essa rota `/balance` você poderá consultar o saldo das transações da sua companhia.

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

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

Com este objeto você poderá acompanhar como estava/está seu saldo a cada movimentação bancária.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `balance_operation` |
| `id` | `String` | Identificador da operação |
| `status` | `String` | Estado do saldo da conta. <br> **Valores possíveis**: `waiting_funds`, `available` e `transferred` |
| `balance_amount` | `Number` | Saldo atual da conta |
| `balance_old_amount` | `Number` | Saldo antes da última movimentação |
| `movement_type` | `String` | O que gerou a movimentação. <br> **Valores possíveis**: `payable`, `transaction` ou `antecipation` |
| `amount` | `Number` | Valor transacionado para a conta |
| `fee` | `Number` | Taxa cobrada pela transação |
| `date_created` | `String` | Data da movimentação |
| `movement_object` | `Object` | Objeto da origem da movimentação |

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
| `count` | Não | `10` | Retorna `n` objetos de operação de saldo |
| `page` | Não | `1` | Útil para implementação de uma paginação de resultados |

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

# Clientes

## Retornando dados do cliente

> GET https://api.pagar.me/1/customers/:id

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

# Companhia

## Objeto `company`

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
| `transaction_spread` | `Object` | Objeto contendo o custo por transação em valores percentuais |
| `transaction_spread[credit_card]` | `Number` | Custo por transação feita com cartão de crédito |
| `transaction_spread[boleto]` | `Number` | Custo por transação feito com boleto bancário |

## Retornando dados da companhia

> GET https://api.pagar.me/1/company

```shell
curl -X  GET https://api.pagar.me/1/company \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
```

```php
```

```cs
```

Através dessa URL você irá receber diversos dados da sua companhia, pelo objeto `company`.

> JSON Retornado (Exemplo)

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Obtendo estatísticas da companhia

> GET https://api.pagar.me/1/company/statistics

```shell
curl -X  GET https://api.pagar.me/1/company/statistics \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
```

```php
```

```cs
```

Através dessa URL você irá receber diversos dados estatísticos da sua companhia, como volume de transações mensais, semanais, diárias, número de assinaturas, etc.

> JSON Retornado (Exemplo)

```json
{
    "month_transactions_count": 43,
    "month_transactions_volume": 1637236,
    "week_transactions_count": 20,
    "week_transactions_volume": 749741,
    "day_transactions_count": 0,
    "day_transactions_volume": 0,
    "subscriptions_count": 99
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Atualizando dados da companhia

> PUT https://api.pagar.me/1/company

```shell
curl -X PUT https://api.pagar.me/1/company \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'subscriptions[payment_deadline]=6' \
-d 'subscriptions[email_customers]=false' \
-d 'subscriptions[charge_attempts]=5' \
-d 'subscriptions[charges_interval_in_days]=4' \
-d 'subscriptions[cancel_after_failed_charges]=true' \
-d 'subscriptions[customer_can_cancel_subscription]=false' \
-d 'branding[primary_color]=orange' \
-d 'name=Pagar.me' \
-d 'antifraud=true'
```

```ruby
```

```php
```

```cs
```

Através dessa URL você irá receber diversos dados estatísticos da sua companhia, como volume de transações mensais, semanais, diárias, número de assinaturas, etc.

> JSON Retornado (Exemplo)

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
        "payment_deadline": 6,
        "email_customers": false,
        "charge_attempts": 5,
        "charges_interval_in_days": 4,
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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `subscriptions[payment_deadline]` | Não | - | Dias que o usuário pode ficar inadimplemente antes de ter a assinatura cancelada. <br> **Padrão**: `5` |
| `subscriptions[email_customers]` | Não | - |Variável que informa se o cliente será notificado ou não, independente do tipo da notificação. |
| `subscriptions[charge_attempts]` | Não | - | Número de tentativas de cobrança |
| `subscriptions[chrages_interval_in_days]` | Não | - | Espaço, em dias, entre uma cobrança e outra |
| `subscriptions[cancel_after_failed_charges]` | Não | - | Caso as cobranças não sejam bem sucedidas, você pode optar por cancelar essa assinatura automaticamente |
| `subscriptions[customer_can_cancel_subscription]` | Não | - | Habilita a opção do seu cliente cancelar uma assinatura |
| `branding[primary_color]` | Não | - | Permite alterar a cor padrão da dashboard mostrada para o cliente |
| `name` | Não | - | Altera o nome da empresa exibido na dashboard |
| `antifraud` | Não | - | Liga ou desliga o antifraude. <br> **OBS**: Você poderá alterar o status do antifraude no mínimo a cada 30 dias |

## Resetando as chaves de API e Encriptação

> PUT https://api.pagar.me/1/company/reset_keys

```shell
curl -X PUT https://api.pagar.me/1/company/reset_keys \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
```

```php
```

```cs
```

Através dessa URL você reseta suas chaves da API e Encriptação. A resposta a essa chamada é o objeto `company`, já com as novas chaves.

> JSON Retornado (Exemplo)

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
        "payment_deadline": 6,
        "email_customers": false,
        "charge_attempts": 5,
        "charges_interval_in_days": 4,
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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

# Contas bancárias

## Objeto `bank_account`

> Objeto bank_account

```json
{
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
}
```

Contém os dados de uma conta bancária para futuros pagamentos.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `bank_account` |
| `id` | `String` | Identificador da conta bancária |
| `bank_code` | `String` | Valor identificador do código do banco |
| `agencia` | `String` | Valor identificador da agência a qual a conta pertence |
| `agencia_dv` | `String` | Dígito verificador da agência |
| `conta` | `String` | Número da conta bancária |
| `conta_dv` | `String` | Dígito verificador da conta |
| `document_type` | `String` | Tipo do documento do titular da conta |
| `document_number` | `String` | Número do documento do titular da conta (cpf ou cnpj) |
| `legal_name` | `String` | Nome completo (se pessoa física) ou Razão Social (se pessoa jurídica) |
| `date_created` | `String` | Data de criação da conta bancária (ISODate) |

## Criando uma conta bancária

> POST https://api.pagar.me/1/company/bank_accounts

```shell
curl -X POST https://api.pagar.me/1/bank_accounts \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'bank_code=341' \
-d 'agencia=0932' \
-d 'agencia_dv=5' \
-d 'conta=58054' \
-d 'conta_dv=1' \
-d 'document_number=26268738888' \
-d 'legal_name=API BANK ACCOUNT'
```

```ruby
```

```php
```

```cs
```

Cria uma conta bancária para futuros pagamentos.

> JSON Retornado (Exemplo)

```json
{
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
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `bank_code` | Sim | - | Código do banco |
| `agencia` | Sim | - | Agência onde sua conta foi criada |
| `agencia_dv` | Não | - | Dígito verificador da sua agência |
| `conta` | Sim | - | Número da conta bancária |
| `conta_dv` | Sim | - | Dígito verificador da conta |
| `document_number` | Sim | - | Documento identificador do titular da conta (cpf ou cnpj) |
| `legal_name` | Sim | - | Nome completo (se pessoa física) ou razão social (se pessoa jurídica) |

## Retornando uma conta bancária

> GET https://api.pagar.me/1/company/bank_accounts/:id

```shell
curl -X GET https://api.pagar.me/1/bank_accounts/4840 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Através dessa rota você consegue retornar os dados de uma conta bancária específica.

> JSON Retornado (Exemplo)

```json
{
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
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Retornando várias contas bancárias

> GET https://api.pagar.me/1/bank_accounts

```shell
curl -X GET https://api.pagar.me/1/bank_accounts \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'count=3' \
-d 'page=2'
```

```ruby
```

```php
```

```cs
```

Através dessa rota você consegue retornar os dados de várias contas bancárias.

> JSON Retornado (Exemplo)

```json
[{
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
}, {
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
}, {
    "object": "bank_account",
    "id": 4839,
    "bank_code": "341",
    "agencia": "0932",
    "agencia_dv": "5",
    "conta": "58054",
    "conta_dv": "1",
    "document_type": "cpf",
    "document_number": "26268738888",
    "legal_name": "API BANK ACCOUNT",
    "charge_transfer_fees": false,
    "date_created": "2015-03-19T15:35:14.000Z"
}]
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `count` | Não | `10` | Retorna `n` objetos de conta bancária |
| `page` | Não | `1` | Útil para implementação de uma paginação de resultados | 

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
| `bank_account_id` | Sim | - | Número identificador da conta bancária que irá receber a transferência |

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

# Códigos postais

## Consulta de CEP

> GET https://api.pagar.me/1/zipcodes/:id

```shell
curl -X GET https://api.pagar.me/1/zipcodes/01452001 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Com essa rota você pode verificar os dados de um determinado CEP.

> JSON Retornado (Exemplo)

```json
{
    "neighborhood": "Jardim Paulistano",
    "street": "Avenida Brigadeiro Faria Lima",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": "01452001"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

# Buscas avançadas

## ElasticSearch

> GET https://api.pagar.me/1/search

```shell
curl -X GET https://api.pagar.me/1/search \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
-d 'type=transaction' \
-d 'query={
  "query" : {
      "term" : {
        "id" :"12345"
       }
      }
   }'
```

```ruby
```

```php
```

```cs
```

Através da rota `/search` você consegue fazer consultas usando o [ElasticSearch](https://www.elastic.co/products/elasticsearch) em nossa base dados. Essas consultas são extremamente otimizadas, e permitem que você minere os dados de suas transações e demais informações armazenadas no Pagar.me da forma que lhe for mais conveniente.

> JSON Retornado (Exemplo)

```json
{
    "took": 3,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "failed": 0
    },
    "hits": {
        "total": 1,
        "max_score": null,
        "hits": [{
            "_index": "pagarme1417399537375",
            "_type": "transaction",
            "_id": "12345",
            "_score": null,
            "_source": {
                "object": "transaction",
                "status": "paid",
                "refuse_reason": null,
                "status_reason": null,
                "acquirer_response_code": null,
                "acquirer_name": "development",
                "authorization_code": null,
                "soft_descriptor": null,
                "tid": null,
                "nsu": null,
                "date_created": "2014-03-28T03:10:21.000Z",
                "date_updated": "2014-03-28T03:10:21.000Z",
                "amount": 100,
                "installments": 1,
                "id": 12345,
                "cost": 51.5,
                "card_holder_name": "Load Test",
                "card_last_digits": "1111",
                "card_first_digits": "411111",
                "card_brand": "visa",
                "postback_url": null,
                "payment_method": "credit_card",
                "antifraud_score": null,
                "boleto_url": null,
                "boleto_barcode": null,
                "boleto_expiration_date": null,
                "referer": null,
                "ip": null,
                "subscription_id": null,
                "phone": null,
                "address": null,
                "customer": null,
                "card": null,
                "metadata": {}
            },
            "sort": [12345]
        }]
    }
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `type` | Sim | - | Objeto a ser buscado na base de dados |
| `query` | Não | - | Filtros a serem utilizados para obtenção dos resultados esperados. Veja mais sobre as buscas no Elasticsearch [aqui](http://www.elastic.co/guide/en/elasticsearch/reference/current//search.html) |
| `search_type` | Não | - | Informa o tipo de busca que deve ser feita na base de dados. Mais sobre tipos de pesquisa [aqui](http://www.elastic.co/guide/en/elasticsearch/reference/current//search-request-search-type.html) |

# Recebedores

## Objeto `recipient`

> Objeto recipient

```json
{
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
    "transfer_interval": "weekly",
    "transfer_day": "5",
    "date_created": "2015-03-24T15:18:30.000Z",
    "date_updated": "2015-03-24T15:18:30.000Z"
}
```

Objeto contendo os dados de um recebedor.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `recipient` |
| `id` | `String` | Identificador do recebedor |
| `bank_account` | `Object` | Objeto contendo os dados bancários do recebedor |
| `transfer_enabled` | `Boolean` | Identifica se o recebedor está habilitado para receber ou não |
| `last_transfer` | `String` | Data da última transferência (ISODate) |
| `transfer_interval` | `String` | Frequência na qual o recebedor irá ser pago. <br> **Valores possíveis**: `daily`, `weekly`, `montlhy` |
| `transfer_day` | `Number` | Dia no qual o recebedor vai ser pago. Para cada `transfer_day`, existe uma faixa de pagamento possíveis. <br> `weekly`: 1 a 5 <br> `monthly`: 1 a 31 |
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
    "transfer_interval": "weekly",
    "transfer_day": "5",
    "date_created": "2015-03-24T15:18:30.000Z",
    "date_updated": "2015-03-24T15:18:30.000Z"
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `transfer_interval` | Sim | - | Frequência na qual o recebedor irá ser pago. <br> **Valores possíveis**: `daily`, `weekly`, `montlhy` |
| `transfer_day` | Sim | - | Dia no qual o recebedor vai ser pago. |
| `transfer_enabled` | Sim | - | Variável que indica se o recebedor pode receber os pagamentos |
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
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
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

```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

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

```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

# Antifraude

## Objeto `antifraud_analysis`

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

# Usuário

## Objeto `user`

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

Dados de um usuário registrado no nosso sistema.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `user` |
| `id` | `String` | Identificador do usuário |
| `email` | `String` | Email do usuário |
| `name` | `String` | Nome do usuário |
| `permission` | `String` | Tipo de permissão do usuário. <br> **Tipos**: `admin`, `read_write`, `read_only` |
| `date_created` | `String` | Data da criação do usuário (ISODate) |

# Regras do split

## Objeto `split_rule`

> Objeto split_rule

```json
{
    "object": "split_rule",
    "id": "sr_ci7ntawl1001s2m164zrbp7tz",
    "recipient_id": "re_ci7nhf1ay0007n016wd5t22nl",
    "charge_processing_fee": true,
    "liable": true,
    "percentage": 30,
    "amount": null,
    "date_created": "2015-03-24T21:26:09.000Z",
    "date_updated": "2015-03-24T21:26:09.000Z"
}
```

Objeto que contém as informações das regras da divisão do valor gerado na transação.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `user` |
| `id` | `String` | Identificador da regra de divisão |
| `recipient_id` | `String` | Recebedor que irá receber os valores descritos nessa regra |
| `charge_processing_fee` | `Boolean` | Define se o recebedor dessa regra irá ser cobrado pela taxa da Pagar.me |
| `liable` | `Boolean` | Define se o recebedor vinculado a essa regra irá se responsabilizar pelo risco da transação (estorno/chargeback) |
| `percentage` | `Number` | Porcentagem que o recebedor vai receber do valor da transação. <br> **OBS**: Caso `percentage` seja utilizada, não é necessário passar o parâmetro `amount` |
| `amount` | `Number` | Valor que o recebedor vai receber da transação. <br> **OBS**: Caso `amount` seja utilizado, não é necessário passar o parâmetro `percentage` |
| `date_created` | `String` | Data da criação da `split_rule` |
| `date_updated` | `String` | Data de atualização da `split_rule` |

