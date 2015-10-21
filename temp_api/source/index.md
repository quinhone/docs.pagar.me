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

## Criando um cliente

> POST https://api.pagar.me/1/customers/:id

```shell
curl -X POST https://api.pagar.me/1/customers \
-d "api_key=ak_test_T12378asdgyug234DoGKgN234897dsf98" \
-d "document_number=18152564000105" \
-d "name=nome do cliente" \
-d "email=eee@email.com" \
-d "born_at=13121988" \
-d "gender=M" \
-d "address[street]=rua qualquer" \
-d "address[complementary]=apto" \
-d "address[street_number]=13" \
-d "address[neighborhood]=pinheiros" \
-d "address[city]=sao paulo" \
-d "address[state]=SP" \
-d "address[zipcode]=05444040" \
-d "address[country]=Brasil" \
-d "phone[ddi]=55" \
-d "phone[ddd]=11" \
-d "phone[number]=999887766"
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

customer = PagarMe::Card.new({
	:document_number => "18152564000105",
	:name => "nome do cliente",
	:email => "eee@email.com",
	:born_at => 13121988,
	:gender => "M",
	:address => {
		:street => "rua qualquer",
		:complementary => "apto",
		:street_number => 13,
		:neighborhood => "pinheiros",
		:city => "sao paulo",
		:state => "SP",
		:zipcode => "05444040",
		:country => "Brasil"
	},
	:phone => {
		:ddi => 55,
		:ddd => 11,
		:number => 999887766
	}
})

customer.create
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$customer = new Pagarme_Customer(array(
	  "document_number" => "18152564000105",
	  "name" => "nome do cliente",
	  "email" => "eee@email.com",
	  "born_at" => 13121988,
	  "gender" => "M",
	  "address" => array(
		"street" => "rua qualquer",
		"complementary" => "apto",
		"street_number" => 13,
		"neighborhood" => "pinheiros",
		"city" => "sao paulo",
		"state" => "SP",
		"zipcode" => "05444040",
		"country" => "Brasil"
	  ),
	  "phone" => array(
		"ddi" => 55,
		"ddd" => 11,
		"number" => 999887766
	  )
	));

	$customer->create();
?>
```

```cs
```

Através dessa rota você pode salvar os dados de um cliente no nosso banco de dados.

> JSON Retornado (Exemplo)

```json
{
    "object": "customer",
    "document_number": "18152564000105",
    "document_type": "cnpj",
    "name": "nome do cliente",
    "email": "eee@email.com",
    "born_at": "1970-01-01T03:38:41.988Z",
    "gender": "M",
    "date_created": "2015-04-10T18:38:19.000Z",
    "id": 253591,
    "phones": [{
        "object": "phone",
        "ddi": "55",
        "ddd": "11",
        "number": "999887766",
        "id": 148590
    }],
    "addresses": [{
        "object": "address",
        "street": "rua qualquer",
        "complementary": "apto",
        "street_number": "13",
        "neighborhood": "pinheiros",
        "city": "sao paulo",
        "state": "SP",
        "zipcode": "05444040",
        "country": "Brasil",
        "id": 153809
    }]
}
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `document_number` | Não | - | Número do CPF ou CNPJ do cliente |
| `name` | Sim | - | Nome ou razão social do comprador |
| `email` | Sim | - | E-mail do comprador |
| `born_at` | Não | - | Data de nascimento |
| `gender` | Não | - | Gênero |
| `address[street]` | Sim | - | Nome da rua |
| `address[complementary]` | Não | - | Complemento do endereço |
| `address[street_number]` | Sim | - | Número do imóvel |
| `address[neighborhood]` | Sim | - | Bairro |
| `address[city]` | Não | - | Cidade |
| `address[state]` | Não | - | Estado |
| `address[zipcode]` | Sim | - | Código postal (CEP) |
| `address[country]` | Não | - | País |
| `phone[ddi]` | Não | - | DDI (Discagem Direta Internacional) |
| `phone[ddd]` | Sim | - | DDD (Discagem Direta à Distância) |
| `phone[number]` | Sim | - | Número do telefone (máximo de 9 dígitos, apenas números) |

## Retornando dados do cliente

> GET https://api.pagar.me/1/customers/:id

```shell
curl -X GET https://api.pagar.me/1/customers/11222 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

customer = PagarMe::Customer.find_by_id(11222)
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$customer = PagarMe_Customer::findById(11222);
?>
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

## Retornando dados de clientes

> GET https://api.pagar.me/1/customers

```shell
curl -X GET https://api.pagar.me/1/customers \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'page=1' \
-d 'count=2'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

card = PagarMe::Card.all(1, 2)
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$customers = PagarMe_Customer::all(1, 2);
?>
```

```cs
```

Retorna todos os clientes cadastrados em sua conta.

> JSON Retornado (Exemplo)

```json
[{
    "object": "customer",
    "document_number": "18152564000105",
    "document_type": "cnpj",
    "name": "nome do cliente",
    "born_at": "1970-01-01T03:38:41.988Z",
    "gender": "M",
    "date_created": "2015-04-10T22:04:18.000Z",
    "id": 15132,
    "phones": [{
        "object": "phone",
        "ddi": "55",
        "ddd": "11",
        "number": "999887766",
        "id": 13746
    }],
    "addresses": [{
        "object": "address",
        "street": "rua qualquer",
        "complementary": "apto",
        "street_number": "13",
        "neighborhood": "pinheiros",
        "city": "sao paulo",
        "state": "SP",
        "zipcode": "05444040",
        "country": "Brasil",
        "id": 13958
    }]
}, {
    "object": "customer",
    "document_number": "18152564000105",
    "document_type": "cnpj",
    "email": "eee@email.com",
    "born_at": "1970-01-01T03:38:41.988Z",
    "gender": "M",
    "date_created": "2015-04-10T22:03:49.000Z",
    "id": 15131,
    "phones": [{
        "object": "phone",
        "ddi": "55",
        "ddd": "11",
        "number": "999887766",
        "id": 13745
    }],
    "addresses": [{
        "object": "address",
        "street": "rua qualquer",
        "complementary": "apto",
        "street_number": "13",
        "neighborhood": "pinheiros",
        "city": "sao paulo",
        "state": "SP",
        "zipcode": "05444040",
        "country": "Brasil",
        "id": 13957
    }]
}]
```

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |
| `count` | Não | `10` | Retorna `n` objetos `customer` |
| `page` | Não | `1` | Útil para implementação de uma paginação de resultados | 

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

> POST https://api.pagar.me/1/bank_accounts

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
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

bank_account = PagarMe::BankAccount.new({
    :bank_code => '237',
    :agencia => '1935',
    :agencia_dv => '9',
    :conta => '23398',
    :conta_dv => '9',
    :legal_name => 'foo bar loem',
    :document_number => '111.111.111-11'
})

bank_account.create
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

> GET https://api.pagar.me/1/bank_accounts/:id

```shell
curl -X GET https://api.pagar.me/1/bank_accounts/4840 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

bank_account = PagarMe::BankAccount.find_by_id("1234")
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
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

bank_accounts = PagarMe::BankAccount.find_by({ bank_code: '237' })
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

# Pagamentos

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

Objeto contendo os dados de um pagamento.

| Propriedade | Tipo | Descrição |
|:--|:--:|:--|
| `object` | `String` | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `payable` |
| `id` | `Number` | Identificador do pagamento |
| `status` | `String` | Estado atual do pagamento. <br> **Valores possíveis**: `waiting_funds`, `paid` |
| `amount` | `Number` | Valor em centavos que foi pago |
| `fee` | `Number` | Valor em centavos que foi cobrado (taxa) |
| `installment` | `Number` | Número da parcela |
| `transaction_id` | `Number` | Identificador da transação que gerou o pagamento |
| `split_rule_id` | `String` | Identificador da regra de split do pagamento |
| `payment_date` | `String` | Dia e hora do pagamento (ISODate) |
| `type` | `String` | Tipo do pagamento. <br> **Valores possíveis**: `credit`, `refund` e `chargeback` |
| `date_created` | `String` | Data da criação do objeto (ISODate) |

## Retornando pagamentos

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

Retorna todos os pagamentos recebidos pela empresa.

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

## Retornando um pagamento

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

Retorna um pagamento recebido pela empresa.

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

| Parâmetro | Obrigatório | Default (valor padrão) | Descrição |
|:--|:--:|:--:|:--|
| `api_key` | Sim | - | Chave da API (disponível no seu dashboard) |

# Códigos postais

## Consulta de CEP

> GET https://api.pagar.me/1/zipcodes/:id

```shell
curl -X GET https://api.pagar.me/1/zipcodes/01452001
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
|:--:|:--:|:--:|:--:|
| - | - | - | - |

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

# Erros

## Erros da API

Os possíveis erros retornados da API são:

- `invalid_parameter`: quando algum parâmetro passado está incorreto/faltando.


- `action_forbidden`: quando o usuário não tem permissão para fazer determinada ação.


- `internal_error`: quando algum erro interno em nosso servidor ocorreu.


- `not_found`: quando o recurso procurado não foi encontrado/não existe.

> Exemplo:

```
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

## Erros na geração do card_hash

Antes do `card_hash` ser criado, é verificado se os dados do cartão estão corretos, caso algum item esteja errado, será retornado um objeto com todos os valores incorretos.

> Exemplo:

```js
{
    card_number: "Número do cartão inválido.",
    card_holder_name: "Nome do portador inválido.",
    card_expiration_month: "Mês de expiração inválido.",
    card_expiration_year: "Ano de expiração inválido.",
    card_cvv: "Código de segurança inválido."
}
```
