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

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `plan` |
| **id**<br> Number | Número identificador do plano |
| **amount**<br> Number | Preço do plano, em centavos |
| **days**<br> Number | Dias para efetuação da próxima cobrança da assinatura atrelada ao plano. |
| **name**<br> String | Nome do plano |
| **trial_days**<br> Number | Dias que o usuário poderá testar o serviço gratuitamente |
| **date_created**<br> String | Data da criação do plano (ISODate) |
| **payment_methods**<br> Array | Array de Strings contendo os possíveis métodos de pagamento deste plano. <br> **Valores possíveis**: `credit_card`, `boleto` |
| **color**<br> String | Propriedade opcional para atribuição de uma cor ao plano. <br> **Valor padrão**: `null` |
| **charges**<br> Number | Número de cobranças que podem ser feitas em uma assinatura.<br> **OBS**: No caso de pagamento com cartão de crédito, esse valor **não inclui a cobrança feita na criação da assinatura**. <br> **Ex**: Plano anual com no máximo 3 cobranças, `days = 365` e `charges = 2` (cartão de crédito) ou `charges = 3` (boleto) |
| **installments**<br> Number | Informa em quantas vezes o pagamento será parcelado entre cada cobrança |

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
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

plan = PagarMe::Plan.new({
    :name => "Plano gold",
    :trial_days => 5,
    :days => 30,
    :amount => 3000,
}

plan.create
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$plan = new PagarMe_Plan(array(
		"amount" => 3000,
		"trial_days" => 5,
		"days" => 30,
		"name" => "Plano gold"
	));

	$plan->create();
```

```cs
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

Plan plan = new Plan();
plan.Amount = 3000;
plan.TrialDays = 5;
plan.Days = 30;
plan.Name = "Plano gold";

plan.Save();
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

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **amount**<br> <span class="required">obrigatório</span> | Valor que será cobrado recorrentemente (em centavos). Ex: R$49,90 = `4990` |
| **days**<br> <span class="required">obrigatório</span> | Prazo, em dias, para cobrança das parcelas |
| **name**<br> <span class="required">obrigatório</span> | Nome do plano |
| **trial_days**<br> default: `0` | Dias para teste gratuito do produto. Valor começará a ser cobrado no dia `trial_days + 1` |
| **payment_methods**<br> Array, default: `[boleto, credit_card]` | Meios de pagamentos aceitos. Pode ser boleto, cartão de crédito ou ambos |
| **color**<br> default: `null` | Armazena o valor de uma cor para o plano |
| **charges**<br> default: `null` | Número de cobranças que poderão ser feitas nesse plano. <br> **Ex**: Plano cobrado 1x por ano, válido por no máximo 3 anos. Nesse caso, nossos parâmetros serão: `days = 365, installments = 1`, `charges=2` (cartão de crédito) ou `charges=3` (boleto). <br> **OBS**: No caso de cartão de crédito, a cobrança feita na ativação da assinatura **não é considerada**. <br> **OBS**: `null` irá cobrar o usuário indefinidamente, ou até o plano ser cancelado |
| **installments**<br> default: `1` | Número de parcelas entre cada *charge*. <br> **Ex**: Plano anual, válido por 2 anos, podendo ser divido em até 12 vezes. Nesse caso, nossos parâmetros serão: `days = 30, installments = 12`, `charges=2` (cartão de crédito) ou `charges=3` (boleto). <br> **OBS**: Boleto sempre terá `installments = 1` |

Veja mais sobre como criar um plano [aqui](https://pagar.me/docs/plans-subscriptions/#criando-um-plano).

## Retornando um plano

> GET https://api.pagar.me/1/plans/:id

```shell
curl -X GET https://api.pagar.me/1/plans/13580 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

plan = PagarMe::Plan.find_by_id("13580")
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$plan = PagarMe_Plan::findById("13850");

```

```cs
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

var plan = PagarMeService.GetDefaultService().Plans.Find("13850");
```

Retorna um plano previamente criado.

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

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **:id**<br> <span class="required">obrigatório</span> | id de identificação do plano previamente criado |

## Retornando planos

> GET https://api.pagar.me/1/plans

```shell
curl -X GET https://api.pagar.me/1/plans \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'page=1' \
-d 'count=3'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

plans = PagarMe::Plan.all(1, 3)
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$plans = PagarMe_Plan::all(1, 3);

```

```cs
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

var plans = PagarMeService.GetDefaultService().Plans.FindAll(new Plan());
```

Retorna todos os planos previamente criados. 

> JSON Retornado (Exemplo)

```json
[{
    "object": "plan",
    "id": 15553,
    "amount": 31000,
    "days": 30,
    "name": "Plano Ouro",
    "trial_days": 0,
    "date_created": "2015-03-27T00:37:36.000Z",
    "payment_methods": [
        "boleto",
        "credit_card"
    ],
    "color": null,
    "charges": null,
    "installments": 1
}, {
    "object": "plan",
    "id": 15495,
    "amount": 79000,
    "days": 30,
    "name": "Cacique",
    "trial_days": 0,
    "date_created": "2015-03-26T14:37:10.000Z",
    "payment_methods": [
        "boleto",
        "credit_card"
    ],
    "color": null,
    "charges": null,
    "installments": 1
}, {
    "object": "plan",
    "id": 15487,
    "amount": 300000,
    "days": 30,
    "name": "TOP MBA 360",
    "trial_days": 0,
    "date_created": "2015-03-25T21:28:32.000Z",
    "payment_methods": [
        "boleto",
        "credit_card"
    ],
    "color": null,
    "charges": null,
    "installments": 1
}]
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **count**<br> default: `10` | Retorna `n` objetos de plano |
| **page**<br> default: `1` | Útil para implementação de uma paginação de resultados |

## Atualizando Planos

> PUT https://api.pagar.me/1/plans/:id

```shell
curl -X  PUT https://api.pagar.me/1/plans/13580 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'name=Plano Diamong' \
-d 'trial_days=7'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

plan = PagarMe::Plan.find_by_id("1234")

plan.name = "plano silver"

plan.save
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$plan = PagarMe_Plan::findById("12785");

	$plan->setName("plano silver");

    $plan->setTrialDays(7);

    $plan->save();
```

```cs
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";
var plan = PagarMeService.GetDefaultService().Plans.Find("13580");
plan.Name = "Plano Diamond";
plan.TrialDays = 7;
plan.Save();
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

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **:id**<br> <span class="required">obrigatório</span> | id de identificação do plano previamente criado |
| **name** | Nome do plano |
| **trial_days** | Dias para testar o produto/serviço gratuitamente |

