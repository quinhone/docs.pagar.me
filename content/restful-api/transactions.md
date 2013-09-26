---
title: Transações
---

# Transações

## POST /transactions {#post-transaction}

Método usado para realizar uma transação.

**Parâmetros**:

- `amount` - valor da transação, com centavos, sem virtulas ou pontos. Ex: se o valor da transação é de R$15,90, o valor de `amount` será `1590`.
- `payment_method` - a forma de pagamento da transação. Opções: `credit_card` (padrão) ou `boleto`.

Se a transação for com cartão de crédito, os dados do cartão devem ser enviados:

- `card_number` - o número do cartão de crédito, sem espaços ou separações.
- `card_holder_name` - o nome do portador do cartão, como escrito nele.
- `card_expiracy_date` - mês (2 dígitos) seguido do ano (2 dígitos) de expiração.
- `card_cvv` - o código de segurança do cartão.

Caso o antifraude esteja habilitado, é necessário que os dados do cartão sejam enviados utilizando o `card_hash` gerado no browser do cliente. Para mais informações, consulte a [página de `card_hash`](/docs/restful-api/card-hash). Também é preciso enviar os dados do cliente para a análise de fraude:

- `customer[name]` - o nome completo ou razão social do cliente que está realizando a transação.
- `customer[document_type]` - o tipo de documento que identifica o cliente. Opções: `cpf` e `cnpj`.
- `customer[document_number]` - o número do documento que identifica o cliente, sem separadores.
- `customer[email]` - o email do cliente.

- `customer[address][street]` - o logradouro (rua, avenida, etc) do cliente.
- `customer[address][street_number]` - o número da casa/edifício do cliente.
- `customer[address][street_2]` - o complemento (sala, número do apartamento, etc) do cliente.
- `customer[address][neighborhood]` - o bairro do cliente.
- `customer[address][city]` - a cidade do cliente.
- `customer[address][state]` - o estado do cliente, abreviado em duas letras. Ex: `SP`.
- `customer[address][zipcode]` - o CEP do cliente, sem separadores.
- `customer[address][country]` - o país do cliente (Brasil).

- `customer[phone][type]` - o tipo do telefone do cliente. Opções: `home`, `work`, `cellphone`.
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
-d 'card_expiracy_date=1215' \
-d 'card_cvv=314' \
-d 'customer[name]=Jose da Silva' \
-d 'customer[document_number]=51472745531' \
-d 'customer[document_type]=cpf' \
-d 'customer[email]=josedasilva@gmail.com' \
-d 'customer[address][street]=Av. Brigadeiro Faria Lima' \
-d 'customer[address][street_number]=2941' \
-d 'customer[address][street_2]=5 andar' \
-d 'customer[address][neighborhood]=Itaim Bibi' \
-d 'customer[address][city]=Sao Paulo' \
-d 'customer[address][state]=SP' \
-d 'customer[address][zipcode]=01452000' \
-d 'customer[address][country]=Brasil' \
-d 'customer[phone][type]=cellphone' \
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
            "street_2": "5 andar",
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
        "street_2": "5 andar",
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
