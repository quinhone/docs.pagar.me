---
title: Planos e assinaturas

language_tabs:
  - shell
  - ruby
  - php

search: true
---

# Planos e assinaturas

Com o Pagar.me, você pode cobrar seus clientes de forma recorrente através de
planos e assinaturas.

Ao criar um plano, você define como, quando e quanto devemos cobrar seu
cliente. E para cobrar seu cliente, basta criar uma assinatura atrelada a um
plano.

O Pagar.me então se encarregará de todo o fluxo de cobrança e gestão da
inadimplência para você.

## Criando um plano

O primeiro passo é criar um plano.

Nesse exemplo, vamos criar um plano de R$49,90 e 30 dias:

```shell
curl -X POST 'https://api.pagar.me/1/plans' \
    -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
    -d 'amount=4990' \
    -d 'days=30' \
	-d 'name=Plano Mensal'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

plan = PagarMe::Plan.new({
    :amount => 4990,
    :days => 30,
	:name => "Plano Mensal"
})

plan.create
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$plan = new PagarMe_Transaction(array(
		'amount' => 4990,
		'days' => 30,
		'name' => "Plano Mensal"
	));

	$plan->create();
?>
```

> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu [Dashboard](https://dashboard.pagar.me/).

### Configurações do plano

Tag | Padrão | Descrição
--- | ------ | ---------
name | --- | Nome do plano. Ex: `Plano Gold`
amount | --- | Valor a ser cobrado (em centavos). Ex: R$14,99 = `1499`
days| --- | Dias de duração do plano
trial_days | `0` | Dias de duração do período de trial
payment_methods | `credit_card,boleto` | Meios de pagamento aceitos para o plano
charges | `null` | Número de vezes que o usuário deverá ser cobrado. `null` irá cobrar o usuário indefinidamente, ou até que o plano seja cancelado.
installments | `1` | Número de parcelas a ser cobrado no cartão de crédito. Útil para planos anuais em que o usuário irá parcelar o valor ao longo dos `12` meses.

## Criando uma assinatura

Para criar uma assinatura de cartão de crédito atrelada ao plano criado
anteriormente, basta fornecer o ID do plano criado e o `card_hash` contendo os
dados de cartão.

Para mais informações sobre a geração do `card_hash`, veja nosso [guia de
integração com formulário próprio](/custom_form.html). 

```shell
curl -X POST 'https://api.pagar.me/1/subscriptions' \
    -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
    -d 'plan_id=1234' \
    -d 'card_hash={CARD_HASH}' \
	-d 'customer[email]=email.do.cliente@gmail.com'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

subscription = PagarMe::Subscription.new({
	:plan => PagarMe::Plan.find_by_id("1234"),
	:card_hash => "{CARD_HASH}",
	:customer => {
		:email => "email.do.cliente@gmail.com"
	}
})

subscription.create
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$subscription = new PagarMe_Subscription(array(
		'plan' => PagarMe_Plan::findById("1234"),
		'card_hash' => "{CARD_HASH}",
		'customer' => array(
			'email' => "email.do.cliente@gmail.com"
		)
	));

	$subscription->create();
?>
```

> Não se esqueça de substituir:<br/>
> - `1234` pelo ID do plano,<br/>
> - `{CARD_HASH}` pelo `card_hash` gerado no browser do cliente,<br/>
> - `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela sua chave de API disponível
>   no seu [Dashboard](https://dashboard.pagar.me/).

## Fluxo de cobrança

Toda assinatura tem um `current_period_start` e um `current_period_end`,
indicando, respectivamente, o início e o fim do período de cobrança atual.

Dessa forma, uma assinatura com um plano de 30 dias criada hoje, terá
hoje como `current_period_start`, e daqui a 30 dias como `current_period_end`.

As cobranças serão sempre realizadas na data do `current_period_end`.

A última transação realizada dentro de uma assinatura está disponível na
variável `current_transaction`. Dessa forma, você pode acessar, por exemplo, os
dados do boleto bancário da assinatura sem precisar realizar outra requisição.

### Na criação da assinatura

#### Cartão de crédito

Ao criar uma assinatura de cartão de crédito, tentaremos na mesma hora realizar
a primeira cobrança no cartão do usuário. A assinatura passará a ter o status
`paid` caso a cobrança ocorra com sucesso.

Se o plano tiver um período de trial, iremos validar o cartão antes de
armazená-lo, e a primeira cobrança só será realizada ao fim do trial. Até lá, a
assinatura terá o status `trialing`.

Caso a primeira cobrança ou a validação do cartão de crédito falhe, a
assinatura não será criada e um erro será retornado.

#### Boleto bancário

Ao criar uma assinatura de boleto bancário, será emitido um boleto com 7 dias
de validade. A assinatura terá status `unpaid` até que o boleto bancários seja
pago. Ao detectarmos o pagamento, o status mudará para `paid`.

Se o plano tiver um período de trial, o boleto será emitido com data de
validade para o fim do período de trial e a assinatura terá status `trialing`.
Ao fim do trial, se o boleto for pago, a assinatura irá para o status `paid`.

Caso o boleto não tenha sido pago até o fim do trial, a assinatura passará para
`unpaid`.

### Ao fim do período de cobrança atual

#### Cartão de crédito

Ao fim do período atual (`current_period_end`), iremos realizar a próxima
cobrança na assinatura. Se a cobrança ocorrer com sucesso, a assinatura
permanecerá no status `paid`, e o `current_period_start` e `current_period_end`
serão atualizados.

Caso a cobrança falhe por algum motivo (falta de saldo, transação negada pelo
banco, etc), a assinatura entrará no status `pending_payment` e o usuário será
notificado por e-mail.

#### Boleto bancário 

Sempre que um boleto de uma assinatura é pago, o próximo boleto é emitido e já
está disponível para pagamento. Dessa forma, após o último pagamento, o boleto
correspondente ao período atual já poderá ser pago pelo cliente.

Ao detectarmos o pagamento do boleto do período atual, a assinatura continuará
com o status `paid` e o `current_period_start` e `current_period_end` serão
atualizados respeitando a data de pagamento do boleto. Dessa forma, se o
usuário efetuar o pagamento 5 dias antes do fim da assinatura, o
`current_period_end` terá um acréscimo de 5 dias.

Caso no fim do período o boleto não seja pago, a assinatura entrará no status
`pending_payment` e o usuário será notificado por e-mail.

### Durante o status `pending_payment`
