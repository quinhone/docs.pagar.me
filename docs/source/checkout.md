---
title: Integração via Checkout

language_tabs:
  - shell
  - ruby
  - php

search: true
---

# Integração via Checkout

O Checkout é a forma mais simples de realizar a integração com o Pagar.me.

Com ele, você não precisa se preocupar com validações, segurança no envio dos
dados, tratamento de erros das operadoras de cartão, otimização da conversão,
etc.

Basta inserir nosso JavaScript na sua página e depois realizar a captura da
transação pelo seu servidor. Nós cuidaremos de todo o resto! :)

[Clique aqui](https://pagar.me/checkout) para testar o Checkout.

## Inserindo o formulário

```html
<form method="POST" action="/comprar">
	<script type="text/javascript"
		src="https://assets.pagar.me/checkout/checkout.js"
		data-button-text="Pagar"
		data-encryption-key="ek_test_Ec8KhxISQ1tug1b8bCGxC2nXfxqRmk"
		data-amount="1000">
	</script>
</form>
```

> Não se esqueça de substituir `ek_test_Ec8KhxISQ1tug1b8bCcxC2nXfxqRnk` pela
> sua chave de encriptação disponível no seu
> [Dashboard](https://dashboard.pagar.me/).

O código acima irá inserir o botão de pagar na sua página. Você pode alterar
o texto do botão pela tag `data-button-text` e o valor da transação pela tag
`data-amount`.

Ao clicar no botão, o Checkout do Pagar.me abrirá dentro do seu site e
o usuário digitará os dados necessários para realizar a transação. 

Quando a transação for concluída, um `token` referente a transação realizada
será adicionado ao `form`. O `form`, então, será submetido para o seu servidor,
onde a transação será capturada.

### Configurações do Checkout

Tag | Padrão | Descrição
--- | ------ | ---------
data-encryption-key | --- | Chave de encriptação disponível no seu dashboard.
data-amount | --- | Valor da transação (em centavos) a ser capturada pelo Checkout. Ex: R$14,79 = `1479`
data-button-text | `Pagar` | Texto do botão de pagamento.
data-button-class | --- | Classe CSS a ser adicionada no botão de pagamento.
data-customer-data | `true` | Caso não deseje capturar dados do cliente pelo Checkout, setar como `false`.
data-payment-methods | `credit_card,boleto` | Meios de pagamento disponíveis no Checkout.
data-card-brands | `visa,mastercard,amex,aura,jcb,diners,elo` | Bandeiras aceitas pelo Checkout.
data-max-installments | `1` | Número máximo de parcelas aceitas.
data-ui-color | `#1a6ee1` | Cor primária da interface de Checkout.
data-postback-url | --- | Endereço da URL de POSTback do seu sistema, que receberá as notificações das alterações de status das transações |
data-create-token | `true` | Habilita a geração do token para autorização da transação. <br> **OBS**: Caso você queira apenas pegar os dados do cliente, deixe esse atributo com o valor `false`, e realize a transação normalmente no seu backend, com os dados informados no formulário do checkout.
| data-customer-name | - | Nome do cliente |
| data-customer-document-number | - | CPF ou CNPJ do cliente |
| data-customer-email | - | E-mail do cliente |
| data-customer-address-street | - | Nome do logradouro do cliente |
| data-customer-address-street-number | - | Número do imóvel do cliente |
| data-customer-address-complementary | - | Complemente do endereço do cliente |
| data-customer-address-neighborhood | - | Bairro do cliente |
| data-customer-address-city | - | Cidade do cliente |
| data-customer-address-state | - | Estado (unidade federativa) do cliente |
| data-customer-address-zipcode | - | Código de endereçmento postal (CEP) da cidade do cliente |
| data-customer-phone-ddd | - | DDD do telefone do cliente |
| data-customer-phone-number | - | Número do telefone do cliente |
| data-interest-rate | - | Taxa de juros a ser cobrada na transação |

## Capturando a transação

Com o `token` em mãos, agora basta realizar a captura da transação no seu
servidor. Por motivos de segurança, você precisará fornecer novamente o valor a
ser capturado.

```shell
curl -X POST "https://api.pagar.me/1/transactions/{TOKEN}/capture"
  -d 'amount=1000'
  -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.find_by_id("{TOKEN}")
transaction.capture({:amount => 1000})
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$transaction = PagarMe_Transaction::findById("{TOKEN}");
	$transaction->capture(1000);
?>
```

```cs
PagarMeService.DefaultApiKey = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

Transaction transaction = PagarMeService.GetDefaultService().Transactions.Find("{TOKEN}");
transaction.Capture(1000);
```

> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu
> [Dashboard](https://dashboard.pagar.me/).

Após realizar a captura de uma transação de cartão de crédito, a transação
terá status `paid`, indicando que o cartão do usuário foi cobrado com sucesso.

Caso a transação seja um boleto bancário, a transação terá status
`waiting_payment` e a URL do boleto bancário para pagamento estará disponível na
variável `boleto_url`.

<aside class="notice">Após a finalização da transação em sua página, você terá
05 minutos para capturá-la no seu servidor. Após esse período, a transação será
recusada pelo motivo `capture_timeout`.</aside>

