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
| `amount` | Sim | - | Valor que será cobrado recorrentemente |
| `days` | Sim | - | Prazo, em dias, para cobrança das parcelas |
| `name` | Sim | - | Nome do plano |
| `trial_days` | Não | `0` | Dias para teste gratuito do produto. Valor começará a ser cobrado no dia `trial_days + 1` |
| `payment_methods` | Não | `[boleto, credit_card]` | Meios de pagamentos aceitos. Pode ser boleto, cartão de crédito ou ambos |
| `color` | Não | `null` | Armazena o valor de uma cor para o plano |
| `charges` | Não | `null` | Número de cobranças que poderão ser feitas nesse plano. <br> **Ex**: Plano cobrado 1x por ano, válido por no máximo 3 anos. Nesse caso, nossos parâmetros serão: `days = 30, charges = 3, installments = 1` |
| `installments` | Não | `1` | Número de parcelas entre cada *charge*. <br> **Ex**: Plano anual, válido por 2 anos, podendo ser divido em até 12 vezes. Nesse caso, nossos parâmetros serão: `days = 30, charges = 2, installments = 12` |

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
POST https://api.pagar.me/1/plans/:id
```

> Exemplo de Requisição 

```shell
curl -X POST https://api.pagar.me/1/plans/13580 \
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
