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

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `bank_account` |
| **id**<br> String | Identificador da conta bancária |
| **bank_code**<br> String | Valor identificador do código do banco |
| **agencia**<br> String | Valor identificador da agência a qual a conta pertence |
| **agencia_dv**<br> String | Dígito verificador da agência |
| **conta**<br> String | Número da conta bancária |
| **conta_dv**<br> String | Dígito verificador da conta |
| **document_type**<br> String | Tipo do documento do titular da conta |
| **document_number**<br> String | Número do documento do titular da conta (cpf ou cnpj) |
| **legal_name**<br> String | Nome completo (se pessoa física) ou Razão Social (se pessoa jurídica) |
| **date_created**<br> String | Data de criação da conta bancária (ISODate) |

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
<?php
	require("pagarme-php/Pagarme.php");
	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$account = new Pagarme_Bank_Account(array(
		"bank_code" => "341",
		"agencia" => "0932",
		"agencia_dv" => "5",
		"conta" => "58054",
		"conta_dv" => "1",
		"document_number" => "26268738888",
		"legal_name" => "API BANK ACCOUNT"
	));
	$account->create();
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

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **bank_code**<br> <span class="required">obrigatório</span> | Código do banco |
| **agencia**<br> <span class="required">obrigatório</span> | Agência onde sua conta foi criada |
| **agencia_dv** | Dígito verificador da sua agência |
| **conta**<br> <span class="required">obrigatório</span> | Número da conta bancária |
| **conta_dv**<br> <span class="required">obrigatório</span> | Dígito verificador da conta |
| **document_number**<br> <span class="required">obrigatório</span> | Documento identificador do titular da conta (cpf ou cnpj)<br> **Ex**: `35146484252` |
| **legal_name**<br> <span class="required">obrigatório</span> | Nome completo (se pessoa física) ou razão social (se pessoa jurídica) |

## Retornando uma conta bancária

> GET https://api.pagar.me/1/bank_accounts/:id

```shell
curl -X GET https://api.pagar.me/1/bank_accounts/4840 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

bank_account = PagarMe::BankAccount.find_by_id("4840")
```

```php
<?php
	require("pagarme-php/Pagarme.php");
	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$bank_account = PagarMe_Bank_Account::findById("4840");
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

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **:id**<br> <span class="required">obrigatório</span> | Id da conta bancária desejada |

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
<?php
	require("pagarme-php/Pagarme.php");
	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");
	
	$accounts = PagarMe_Bank_Account::all(2, 3);
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

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **count**<br> default: `10` | Retorna `n` objetos de conta bancária |
| **page**<br> default: `1` | Útil para implementação de uma paginação de resultados | 
