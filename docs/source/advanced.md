---
title: Opções avançadas

language_tabs:
  - shell
  - ruby
  - php

search: true
---

# Opções avançadas

## Validando a origem de um POSTback

Você pode validar a origem do POSTback, isto é, se ele foi realmente enviado
pelo Pagar.me, pelo parâmetro `fingerprint`. O `fingerprint` é enviada pelo
Pagar.me ao notificar a sua `postback_url`.

<aside class="notice">O `fingerprint` é o hash `SHA1` calculado a partir da string:<br/>
`id_do_objeto#sua_chave_de_api`.</aside>

```shell
EXPECTED_FINGERPRINT=`echo -n "149784#ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0" | openssl sha1`
FINGERPRINT=1213e67a3b34c2848f8317d29bcb8cbc9e0979b8
if [ "$FINGERPRINT" = "$EXPECTED_FINGERPRINT" ]; then
	echo "Fingerprint válido"
fi
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

if PagarMe::validate_fingerprint("149784", "1213e67a3b34c2848f8317d29bcb8cbc9e0979b8")
	puts "Fingerprint válido"
end
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	if(PagarMe::validateFingerprint("149784", "1213e67a3b34c2848f8317d29bcb8cbc9e0979b8")) {
		echo "Fingerprint válido";
	}
?>
```

> Não se esqueça de substituir:<br/>
> - `149784` pelo ID do objeto (transação, assinatura, etc.),<br/>
> - `1213e67a3b34c2848f8317d29bcb8cbc9e0979b8` pelo `fingerprint` recebido,<br/>
> - `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela sua chave de API disponível<br/>
>   no seu [Dashboard](https://dashboard.pagar.me/).

## Enviando dados adicionais (metadata)

Você pode também enviar dados adicionais para o Pagar.me (ID do pedido em seu
sistema, carrinho de compras, características do produto/serviço, etc.) através
do campo `metadata`.

Dessa forma, você poderá visualizar, exportar e efetuar buscas pelos dados do
seu negócio através do seu [Dashboard](https://dashboard.pagar.me).

Para enviar esses dados para o Pagar.me, basta configurar as chaves/valores das
variáveis que você deseja enviar dentro do campo `metadata`.

O `metadata` pode ser enviado em transações e assinaturas.

```shell
curl -X POST 'https://api.pagar.me/1/transactions' \
    -d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
    -d 'amount=1000' \
    -d 'card_hash={CARD_HASH}' \
	-d 'metadata[id_pedido]=12345' \
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0";

transaction = PagarMe::Transaction.new({
	:amount => 1000,
    :card_hash => "{CARD_HASH}",
	:metadata => {
		:id_pedido => 12345
	}
})

transaction.charge
```

```php
<?php
	require("pagarme-php/Pagarme.php");

	Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$transaction = new PagarMe_Transaction(array(
		'amount' => 1000,
		'card_hash' => "{CARD_HASH}"
		'metadata' => array(
			'id_pedido' => 12345
		)
	));

	$transaction->charge();
?>
```
> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu [Dashboard](https://dashboard.pagar.me/).
