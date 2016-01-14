# Buscas avançadas

## ElasticSearch

> GET https://api.pagar.me/1/search

```shell
curl -X GET https://api.pagar.me/1/search \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'type=transaction' \
-d 'query=
{
  "query": {
    "filtered": {
      "query": {"match_all": {}},
      "filter": {
        "and": [
          {
            "range": {
              "date_created": {
                "lte": "2016-01-31",
                "gte": "2016-01-01"
              }
            }
          },
          {
            "or": [
              {"term": {"status": "waiting_payment"}},
              {"term": {"status": "paid"}}
            ]
          }
        ]
      }
    }
  },
  "sort": [
    {
      "date_created": {"order": "desc"}
    }
  ],
  "size": 5,
  "from": 0
}'
```

```ruby
```

```php
```

```cs
```

Através da rota `/search` você consegue fazer consultas usando o [ElasticSearch](https://www.elastic.co/products/elasticsearch) em nossa base dados. Essas consultas são extremamente otimizadas, e permitem que você minere os dados de suas transações e demais informações armazenadas no Pagar.me da forma que lhe for mais conveniente.

Um exemplo de como utilizar a [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) do ElasticSearch é exibido nesta sessão. No exemplo ao lado, buscamos por objetos do tipo `transaction`. Usamos o filtro `range` para filtrar transações com `date_created` entre 1º de Janeiro de 2016 e 31 de Janeiro de 2016. Da mesma maneira, usamos uma combinação de filtros `or` e `term` para filtrar todas as transações que contanham `status` como `paid` ou como `waiting_payment`. Por fim, limitamos nossa busca a 5 elementos com o parâmetro `size`, ordenamos os resultados por ordem descrescente de `date_created` com o parâmetro `sort`, e por fim especificamos a página de resultados desejada com o parâmetro `from`.

> JSON Retornado (Exemplo)

```json
{
  "took": 7,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 17,
    "max_score": null,
    "hits": [
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "353328",
        "_score": null,
        "_source": {
          "object": "transaction",
          "status": "waiting_payment",
          "refuse_reason": null,
          "status_reason": "acquirer",
          "acquirer_response_code": null,
          "acquirer_name": "development",
          "authorization_code": null,
          "soft_descriptor": null,
          "tid": null,
          "nsu": null,
          "date_created": "2016-01-14T16:07:16.000Z",
          "date_updated": "2016-01-14T16:07:17.000Z",
          "amount": 23000,
          "installments": 1,
          "id": 353328,
          "cost": 0,
          "card_holder_name": null,
          "card_last_digits": null,
          "card_first_digits": null,
          "card_brand": null,
          "postback_url": null,
          "payment_method": "boleto",
          "capture_method": "ecommerce",
          "antifraud_score": null,
          "boleto_url": "https://pagar.me",
          "boleto_barcode": "1234 5678",
          "boleto_expiration_date": "2016-01-21T02:00:00.730Z",
          "referer": "api_key",
          "ip": "179.191.82.50",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        },
        "sort": [
          1452787636000
        ]
      },
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "353327",
        "_score": null,
        "_source": {
          "object": "transaction",
          "status": "waiting_payment",
          "refuse_reason": null,
          "status_reason": "acquirer",
          "acquirer_response_code": null,
          "acquirer_name": "development",
          "authorization_code": null,
          "soft_descriptor": null,
          "tid": null,
          "nsu": null,
          "date_created": "2016-01-14T16:07:12.000Z",
          "date_updated": "2016-01-14T16:07:12.000Z",
          "amount": 22000,
          "installments": 1,
          "id": 353327,
          "cost": 0,
          "card_holder_name": null,
          "card_last_digits": null,
          "card_first_digits": null,
          "card_brand": null,
          "postback_url": null,
          "payment_method": "boleto",
          "capture_method": "ecommerce",
          "antifraud_score": null,
          "boleto_url": "https://pagar.me",
          "boleto_barcode": "1234 5678",
          "boleto_expiration_date": "2016-01-21T02:00:00.247Z",
          "referer": "api_key",
          "ip": "179.191.82.50",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        },
        "sort": [
          1452787632000
        ]
      },
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "353326",
        "_score": null,
        "_source": {
          "object": "transaction",
          "status": "waiting_payment",
          "refuse_reason": null,
          "status_reason": "acquirer",
          "acquirer_response_code": null,
          "acquirer_name": "development",
          "authorization_code": null,
          "soft_descriptor": null,
          "tid": null,
          "nsu": null,
          "date_created": "2016-01-14T16:06:47.000Z",
          "date_updated": "2016-01-14T16:06:47.000Z",
          "amount": 21000,
          "installments": 1,
          "id": 353326,
          "cost": 0,
          "card_holder_name": null,
          "card_last_digits": null,
          "card_first_digits": null,
          "card_brand": null,
          "postback_url": null,
          "payment_method": "boleto",
          "capture_method": "ecommerce",
          "antifraud_score": null,
          "boleto_url": "https://pagar.me",
          "boleto_barcode": "1234 5678",
          "boleto_expiration_date": "2016-01-21T02:00:00.223Z",
          "referer": "api_key",
          "ip": "179.191.82.50",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        },
        "sort": [
          1452787607000
        ]
      },
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "353325",
        "_score": null,
        "_source": {
          "object": "transaction",
          "status": "waiting_payment",
          "refuse_reason": null,
          "status_reason": "acquirer",
          "acquirer_response_code": null,
          "acquirer_name": "development",
          "authorization_code": null,
          "soft_descriptor": null,
          "tid": null,
          "nsu": null,
          "date_created": "2016-01-14T16:06:41.000Z",
          "date_updated": "2016-01-14T16:06:42.000Z",
          "amount": 20000,
          "installments": 1,
          "id": 353325,
          "cost": 0,
          "card_holder_name": null,
          "card_last_digits": null,
          "card_first_digits": null,
          "card_brand": null,
          "postback_url": null,
          "payment_method": "boleto",
          "capture_method": "ecommerce",
          "antifraud_score": null,
          "boleto_url": "https://pagar.me",
          "boleto_barcode": "1234 5678",
          "boleto_expiration_date": "2016-01-21T02:00:00.664Z",
          "referer": "api_key",
          "ip": "179.191.82.50",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        },
        "sort": [
          1452787601000
        ]
      },
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "353324",
        "_score": null,
        "_source": {
          "object": "transaction",
          "status": "waiting_payment",
          "refuse_reason": null,
          "status_reason": "acquirer",
          "acquirer_response_code": null,
          "acquirer_name": "development",
          "authorization_code": null,
          "soft_descriptor": null,
          "tid": null,
          "nsu": null,
          "date_created": "2016-01-14T16:06:16.000Z",
          "date_updated": "2016-01-14T16:06:16.000Z",
          "amount": 19000,
          "installments": 1,
          "id": 353324,
          "cost": 0,
          "card_holder_name": null,
          "card_last_digits": null,
          "card_first_digits": null,
          "card_brand": null,
          "postback_url": null,
          "payment_method": "boleto",
          "capture_method": "ecommerce",
          "antifraud_score": null,
          "boleto_url": "https://pagar.me",
          "boleto_barcode": "1234 5678",
          "boleto_expiration_date": "2016-01-21T02:00:00.080Z",
          "referer": "api_key",
          "ip": "179.191.82.50",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        },
        "sort": [
          1452787576000
        ]
      }
    ]
  }
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **type**<br> <span class="required">obrigatório</span> | Objeto a ser buscado na base de dados, você pode buscar por qualquer objeto existente na API.<br> **Ex**: `transaction`, `subscription` ou `bank_account` |
| **query** | Filtros a serem utilizados para obtenção dos resultados esperados. Veja mais sobre as buscas no Elasticsearch [aqui](http://www.elastic.co/guide/en/elasticsearch/reference/current//search.html) |
| **search_type** | Informa o tipo de busca que deve ser feita na base de dados. Mais sobre tipos de pesquisa [aqui](http://www.elastic.co/guide/en/elasticsearch/reference/current//search-request-search-type.html) |
