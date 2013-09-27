---
title: Clientes
---

# Clientes

Ao criar uma transação no Pagar.me e fornecer os dados do cliente através do parâmetro `customer`, [conforme descrito na página de transações](/docs/restful-api/transactions), o Pagar.me se encarregará de criar um cliente ou de associar essa transação a um cliente já existente baseado no número do documento ou email enviado.

Dessa forma, você utiliza o Pagar.me normalmente e nós nos preocupamos em associar os dados dos clientes às transações. Pelo dashboard e pela API você pode ver seus clientes, assim como acompanhar o seu crescimento.

## GET /customers {#get-customers}

Retorna os últimos clientes criados.

**Exemplo de requisição**:

<pre><code data-language="javascript">curl -X GET 'https://api.pagar.me/1/customers' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo'
</code></pre>

**Exemplo de resposta**:

<pre><code data-language="javascript">[{
    "document_number": "37723767897",
    "document_type": "cpf",
    "name": "Paulo Fernandes",
    "email": "paulo.fernandes@gmail.com",
    "born_at": "1992-05-21T03:00:00.000Z",
    "sex": "M",
    "date_created": "2013-09-24T16:08:09.000Z",
    "id": 17,
    "addresses": [{
        "street": "Av. Brigadeiro Faria Lima",
        "street_2": "8 andar",
        "street_number": "2927",
        "neighborhood": "Itaim Bibi",
        "city": "Sao Paulo",
        "state": "SP",
        "zipcode": "01452000",
        "country": "Brasil",
        "id": 20
    }],
    "phones": [{
        "type": "cellphone",
        "ddi": "55",
        "ddd": "11",
        "number": "988126497",
        "id": 21
    }]
}, {
    "document_number": "76773014794",
    "document_type": "cpf",
    "name": "Fernando Vellasco",
    "email": "pedro@pagar.me",
    "born_at": "1991-05-19T03:00:00.000Z",
    "sex": "M",
    "date_created": "2013-09-24T15:56:56.000Z",
    "id": 16,
    "addresses": [{
        "street": "Av. Brigadeiro Faria Lima",
        "street_2": "5 andar",
        "street_number": "2927",
        "neighborhood": "Itaim Bibi",
        "city": "Sao Paulo",
        "state": "SP",
        "zipcode": "01452000",
        "country": "Brasil",
        "id": 19
    }],
    "phones": [{
        "type": "cellphone",
        "ddi": "55",
        "ddd": "11",
        "number": "88110037",
        "id": 20
    }]
}, {
    "document_number": "63195966271",
    "document_type": "cpf",
    "name": "Paulo Francisco",
    "email": "paulo@pagar.me",
    "born_at": "1993-07-11T03:00:00.000Z",
    "sex": "M",
    "date_created": "2013-09-24T15:53:05.000Z",
    "id": 15,
    "addresses": [{
        "street": "Av. Brigadeiro Faria Lima",
        "street_2": "5 andar",
        "street_number": "2941",
        "neighborhood": "Itaim Bibi",
        "city": "Sao Paulo",
        "state": "SP",
        "zipcode": "01452000",
        "country": "Brasil",
        "id": 17
    }],
    "phones": [{
        "type": "cellphone",
        "ddi": "55",
        "ddd": "11",
        "number": "88286066",
        "id": 18
    }]
}, {
    "document_number": "12388151708",
    "document_type": "cpf",
    "name": "Pedro Franceschi",
    "email": "pedro@pagar.me",
    "born_at": "1993-07-19T03:00:00.000Z",
    "sex": "M",
    "date_created": "2013-09-24T15:26:58.000Z",
    "id": 14,
    "addresses": [{
        "street": "Av. Brigadeiro Faria Lima",
        "street_2": "8 andar",
        "street_number": "2941",
        "neighborhood": "Itaimbibi",
        "city": "Sao Paulo",
        "state": "SP",
        "zipcode": "01452000",
        "country": "Brasil",
        "id": 16
    }, {
        "street": "Av. Brigadeiro Faria Lima",
        "street_2": "8 andar",
        "street_number": "2927",
        "neighborhood": "Itaim Bibi",
        "city": "Sao Paulo",
        "state": "SP",
        "zipcode": "01452000",
        "country": "Brasil",
        "id": 18
    }],
    "phones": [{
        "type": "cellphone",
        "ddi": "55",
        "ddd": "21",
        "number": "87360798",
        "id": 16
    }, {
        "type": "cellphone",
        "ddi": "55",
        "ddd": "21",
        "number": "87360795",
        "id": 17
    }, {
        "type": "cellphone",
        "ddi": "55",
        "ddd": "11",
        "number": "988110037",
        "id": 19
    }]
}, {
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
        "ddd": "21",
        "number": "87360798",
        "id": 12
    }, {
        "type": "cellphone",
        "ddi": "55",
        "ddd": "11",
        "number": "981836482",
        "id": 24
    }]
}]</code></pre>

## GET /customers/:id {#get-customer}

Retorna um cliente específico a partir do seu `id`.

**Exemplo de requisição**:

<pre><code data-language="javascript">curl -X GET 'https://api.pagar.me/1/customers/10' \
-d 'api_key=ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo'
</code></pre>

**Exemplo de resposta**:

<pre><code data-language="javascript">{
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
        "ddd": "21",
        "number": "87360798",
        "id": 12
    }, {
        "type": "cellphone",
        "ddi": "55",
        "ddd": "11",
        "number": "981836482",
        "id": 24
    }]
}</code></pre>
