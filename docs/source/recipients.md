---
title: Recebedores e Fluxo de Recebimento

language_tabs:
  - shell
  - ruby
  - php

search: true
---

# Fluxo de Recebimento

Através dos `recipients`, ou recebedores, você pode configurar para que o valor dos recebíveis referentes a uma transação sejam dividos automaticamente, e enviados para as respectivas contas bancárias.

Em um recebedor estará configurado as informações da sua conta bancária, se ele irá receber de forma automática, qual a frequência do recebimento, dentre outras variáveis.

## Criando um recebedor

Para criar um recebedor, você deve ter previamente o identificador de uma conta bancária salva no nosso sistema (`bank_account_id`), ou as informações da conta bancária do futuro recebedor.

Usando um `bank_account_id`, a sua requisição para criar um recebedor fica da seguinte forma:

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

> Não se esqueça de substituir `ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0` pela
> sua chave de API disponível no seu [Dashboard](https://dashboard.pagar.me/).

Caso você queira passar os dados da conta bancária na hora da criação do recipiente, a requisição fica dessa forma:

```shell
curl -X POST https://api.pagar.me/1/recipients \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'transfer_interval=weekly' \
-d 'transfer_day=5' \
-d 'transfer_enabled=true' \
-d 'bank_account[bank_code]=341' \
-d 'bank_account[agencia]=0932' \
-d 'bank_account[conta]=58999' \
-d 'bank_account[conta_dv]=3' \
-d 'bank_account[document_number]=26268738888' \
-d 'bank_account[legal_name]=RECIPIENT TEST'
```

```ruby

```

```php

```

```cs

```

## Detalhes do recebimento

Ao criar um recebedor, você pode definir com que frequência ele receberá os pagamentos.

As possibilidades são:

- `daily`: irá receber diariamente
- `weekly`: irá receber semanalmente, onde os dias variam de segunda a sexta, com o parâmetro `transfer_day` variando de 1 a 5.
- `montlhy`: irá receber mensalmente, com o parâmetro `transfer_day` variando de 1 a 31.
