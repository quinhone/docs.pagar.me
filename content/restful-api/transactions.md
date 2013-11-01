---
title: Transações
---

# Transações

## Status de transações {#transactions-status}
Existem 5 estados diferentes para uma transação: 

- `processing` - a transação e está em processamento
- `paid` - a transação foi aprovada no pela operatora de cartão ou o boleto foi pago.
- `waiting_payment` - o boleto foi emitido porém ainda não foi pago
- `refused` - a transação foi reprovada pela operadora do cartão ou pelo antifraude (ver `refuse_reason`) 
- `refunded` - a transação foi estornada/cancelada 

## POST /transactions {#post-transaction}

Cria uma transação

**Parâmetros**:

- `amount` - valor da transação, com centavos, sem virtulas ou pontos. Ex: se o valor da transação é de R$15,90, o valor de `amount` será `1590`.
- `payment_method` - a forma de pagamento da transação. Opções: `credit_card` (padrão) ou `boleto`.

Se a transação for com cartão de crédito, os dados do cartão devem ser enviados:

- `card_number` - o número do cartão de crédito, sem espaços ou separações.
- `card_holder_name` - o nome do portador do cartão, como escrito nele.
- `card_expiration_date` - mês (2 dígitos) seguido do ano (2 dígitos) de expiração.
- `card_cvv` - o código de segurança do cartão.

Caso a transação seja realizada a partir do browser, é essencial o [uso do `card_hash`](/docs/restful-api/card-hash) para proteger os dados do cartão de crédito. Dessa forma, só será necessário o envio de um único parâmetro que conterá todos os dados do cartão:

- `card_hash` - o `card_hash` gerado no browser do cliente usando a [biblioteca em Javascript](/docs/apis/javascript) do Pagar.me.

Também é possível fornecer os dados do cliente que está realizando a transação, para futuras estatísticas. Para transações com antifraude, é obrigatório fornecer os dados do cliente para a análise de fraude:

- `customer[name]` - o nome completo ou razão social do cliente que está realizando a transação.
- `customer[document_number]` - o número do documento que identifica o cliente (CPF ou CNPJ), sem separadores.
- `customer[email]` - o email do cliente.

- `customer[address][street]` - o logradouro (rua, avenida) do cliente.
- `customer[address][street_number]` - o número da casa/edifício do cliente.
- `customer[address][complementary]` - o complemento (sala, número do apartamento, etc) do cliente.
- `customer[address][neighborhood]` - o bairro do cliente.
- `customer[address][zipcode]` - o CEP do cliente, sem separadores.

A cidade e o estado do cliente são obtidos a partir do CEP fornecido.

- `customer[phone][ddd]` - o DDD do telefone do cliente.
- `customer[phone][number]` - o número de telefone do cliente.

Parâmetros opcionais:

- `customer[sex]` - o sexo do cliente. Opções: `M` (masculino) e `F` (feminino)
- `customer[born_at]` - a data de nascimento do cliente. Formato: `MM-DD-AAAA` (20 de julho de 1969 -> `07-20-1969`)

Esses parâmetros, embora opcionais, melhoram a qualidade da análise de fraude. Portanto, é muito recomendado que também sejam enviados.

Para receber notificações sobre a mudança de `status` dessa transação, é possível fornecer uma URL de POSTback:

- `postback_url` - URL para receber notificações de mudanças de status conforme definido na [página de URLs de POSTback](/docs/restful-api/postback-url).

**Exemplo de requisição**:

<pre><code data-language="javascript">curl -X POST 'https://api.pagar.me/1/transactions' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo' \
-d 'amount=1590' \
-d 'card_number=4901720080344448' \
-d 'card_holder_name=Jose da Silva' \
-d 'card_expiration_date=1215' \
-d 'card_cvv=314' \
-d 'customer[name]=Jose da Silva' \
-d 'customer[document_number]=51472745531' \
-d 'customer[email]=josedasilva@gmail.com' \
-d 'customer[address][street]=Av. Brigadeiro Faria Lima' \
-d 'customer[address][street_number]=2941' \
-d 'customer[address][complementary]=5 andar' \
-d 'customer[address][neighborhood]=Itaim Bibi' \
-d 'customer[address][zipcode]=01452000' \
-d 'customer[phone][ddd]=11' \
-d 'customer[phone][number]=981836482' \
-d 'customer[sex]=M' \
-d 'customer[born_at]=07-20-1969'
</code></pre>

**Exemplo de resposta**:

<pre><code data-language="javascript">{
    "status": "paid",
    "refuse_reason": null,
    "date_created": "2013-09-26T03:19:36.000Z",
    "amount": 1590,
    "installments": 1,
    "id": 1379,
    "card_holder_name": "Jose da Silva",
    "card_last_digits": "4448",
    "card_brand": "visa",
    "postback_url": null,
    "payment_method": "credit_card",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "subscription_id": null,
    "customer": {
        "document_number": "51472745531",
        "document_type": "cpf",
        "name": "Jose da Silva",
        "email": "josedasilva@gmail.com",
        "born_at": "1969-07-20T03:00:00.000Z",
        "sex": "M",
        "date_created": "2013-09-23T20:34:53.000Z",
        "id": 10,
        "addresses": [{
            "street": "Av. Brigadeiro Faria Lima",
            "complementary": "5 andar",
            "street_number": "2941",
            "neighborhood": "Itaimbibi",
            "city": "Sao Paulo",
            "state": "SP",
            "zipcode": "01452000",
            "country": "Brasil",
            "id": 12
        }],
        "phones": [{
            "ddi": "55",
            "ddd": "11",
            "number": "981836482",
            "id": 24
        }]
    },
    "address": {
        "street": "Av. Brigadeiro Faria Lima",
        "complementary": "5 andar",
        "street_number": "2941",
        "neighborhood": "Itaimbibi",
        "city": "Sao Paulo",
        "state": "SP",
        "zipcode": "01452000",
        "country": "Brasil",
        "id": 12
    },
    "phone": {
        "ddi": "55",
        "ddd": "11",
        "number": "981836482",
        "id": 24
    }
}
</code></pre>

## POST /transactions/:id/refund {#post-transaction-refund}

Estorna uma transação.

**Exemplo de requisição**:

<pre><code data-language="javascript">curl -X POST 'https://api.pagar.me/1/transactions/1379/refund' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo'
</code></pre>

**Exemplo de resposta**:

<pre><code data-language="javascript">{
    "status": "refunded",
    "refuse_reason": null,
    "date_created": "2013-09-26T03:19:36.000Z",
    "amount": 1590,
    "installments": 1,
    "id": 1379,
    "card_holder_name": "Jose da Silva",
    "card_last_digits": "4448",
    "card_brand": "visa",
    "postback_url": null,
    "payment_method": "credit_card",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "subscription_id": null,
    "customer": {
        "document_number": "51472745531",
        "document_type": "cpf",
        "name": "Jose da Silva",
        "email": "josedasilva@gmail.com",
        "born_at": "1969-07-20T03:00:00.000Z",
        "sex": "M",
        "date_created": "2013-09-23T20:34:53.000Z",
        "id": 10,
        "addresses": [{
            "street": "Av. Brigadeiro Faria Lima",
            "complementary": "5 andar",
            "street_number": "2941",
            "neighborhood": "Itaimbibi",
            "city": "Sao Paulo",
            "state": "SP",
            "zipcode": "01452000",
            "country": "Brasil",
            "id": 12
        }],
        "phones": [{
            "ddi": "55",
            "ddd": "11",
            "number": "981836482",
            "id": 24
        }]
    },
    "address": {
        "street": "Av. Brigadeiro Faria Lima",
        "complementary": "5 andar",
        "street_number": "2941",
        "neighborhood": "Itaimbibi",
        "city": "Sao Paulo",
        "state": "SP",
        "zipcode": "01452000",
        "country": "Brasil",
        "id": 12
    },
    "phone": {
        "ddi": "55",
        "ddd": "11",
        "number": "981836482",
        "id": 24
    }
}
</code></pre>

## GET /transactions/:id {#get-transaction}

Retorna uma transação já criada a partir do seu `id`.

**Exemplo de requisição**:

<pre><code data-language="javascript">curl -X GET 'https://api.pagar.me/1/transactions/1379' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo'
</code></pre>

**Exemplo de resposta**:

<pre><code data-language="javascript">{
    "status": "refunded",
    "refuse_reason": null,
    "date_created": "2013-09-26T03:19:36.000Z",
    "amount": 1590,
    "installments": 1,
    "id": 1379,
    "card_holder_name": "Jose da Silva",
    "card_last_digits": "4448",
    "card_brand": "visa",
    "postback_url": null,
    "payment_method": "credit_card",
    "antifraud_score": null,
    "boleto_url": null,
    "boleto_barcode": null,
    "subscription_id": null,
    "customer": {
        "document_number": "51472745531",
        "document_type": "cpf",
        "name": "Jose da Silva",
        "email": "josedasilva@gmail.com",
        "born_at": "1969-07-20T03:00:00.000Z",
        "sex": "M",
        "date_created": "2013-09-23T20:34:53.000Z",
        "id": 10,
        "addresses": [{
            "street": "Av. Brigadeiro Faria Lima",
            "complementary": "5 andar",
            "street_number": "2941",
            "neighborhood": "Itaimbibi",
            "city": "Sao Paulo",
            "state": "SP",
            "zipcode": "01452000",
            "country": "Brasil",
            "id": 12
        }],
        "phones": [{
            "type": "cellphone",
            "ddi": "55",
            "ddd": "11",
            "number": "981836482",
            "id": 24
        }]
    },
    "address": {
        "street": "Av. Brigadeiro Faria Lima",
        "complementary": "5 andar",
        "street_number": "2941",
        "neighborhood": "Itaimbibi",
        "city": "Sao Paulo",
        "state": "SP",
        "zipcode": "01452000",
        "country": "Brasil",
        "id": 12
    },
    "phone": {
        "type": "cellphone",
        "ddi": "55",
        "ddd": "11",
        "number": "981836482",
        "id": 24
    }
}
</code></pre>

## GET /transactions {#get-transactions}

Retorna as últimas transações realizadas.

**Parâmetros**:

Todos os parâmetros desse método são opcionais. Porém, é possível paginar os resultados e filtrá-los:

- `count` - número de transações a ser retornado por página (padrão: `10`)
- `page` - página a ser retornada (padrão: `1`)

**Exemplo de requisição**:

<pre><code data-language="javascript">curl -X GET 'https://api.pagar.me/1/transactions' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo'
</code></pre>

## GET /transactions/card_hash_key {#get-card-hash-key}

Retorna os dados para realizar a encriptação dos dados do cartão de crédito, gerando um `card_hash`. Para mais informações, [consulte a referência sobre o *card_hash*](/docs/restful-api/card-hash).

**Exemplo de requisição**:

<pre><code data-language="javascript">curl -X GET 'https://api.pagar.me/1/transactions/card_hash_key' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo'
</code></pre>

**Exemplo de resposta**:

<pre><code data-language="javascript">{
    "date_created": "2013-04-13T21:42:03.886Z",
    "id": "5169d12b3da665f36e00000a",
    "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv71aNn1njtjcSrPXW7LF\nZlxajpBht/jq/+pl77eiZEVyNnP1nHlmkM4ufZmZQF7Q8seTUEBjR2PjoocCrFsP\nsu9+ITFnqAqlYmAVXKFf/gCCQfPDfhsavQXVauDAHXyl/69ooWIMUrYmCmxpZfSU\ne9E/4dl7sUg1ywllU8EpMKIn8Zd7blk49pNZ8I2FlkLRLk3yS9JXDIe8dAZLHoZP\nyT1c/5p1czLoB7Q9k5ic2A4ZM3cwCVkbIKC4wEmFuQCQx4tu1J96kvXhVLYoZlvV\n6+u8apFpFQVpTAK71IVYJbTQjHHty1qtZMImw42YM0kFz0GqhfQk3LKziBDX/FHq\nRQIDAQAB\n-----END PUBLIC KEY-----\n"
}</code></pre>

