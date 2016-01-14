# Buscas avançadas

## ElasticSearch

> GET https://api.pagar.me/1/search

```shell
curl -X GET https://api.pagar.me/1/search \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'\
-d 'type=transaction' \
-d 'query={
  "query" : {
      "term" : {
        "id" :"12345"
       }
      }
   }'
```

```ruby
```

```php
```

```cs
```

Através da rota `/search` você consegue fazer consultas usando o [ElasticSearch](https://www.elastic.co/products/elasticsearch) em nossa base dados. Essas consultas são extremamente otimizadas, e permitem que você minere os dados de suas transações e demais informações armazenadas no Pagar.me da forma que lhe for mais conveniente.

> JSON Retornado (Exemplo)

```json
{
    "took": 3,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "failed": 0
    },
    "hits": {
        "total": 1,
        "max_score": null,
        "hits": [{
            "_index": "pagarme1417399537375",
            "_type": "transaction",
            "_id": "12345",
            "_score": null,
            "_source": {
                "object": "transaction",
                "status": "paid",
                "refuse_reason": null,
                "status_reason": null,
                "acquirer_response_code": null,
                "acquirer_name": "development",
                "authorization_code": null,
                "soft_descriptor": null,
                "tid": null,
                "nsu": null,
                "date_created": "2014-03-28T03:10:21.000Z",
                "date_updated": "2014-03-28T03:10:21.000Z",
                "amount": 100,
                "installments": 1,
                "id": 12345,
                "cost": 51.5,
                "card_holder_name": "Load Test",
                "card_last_digits": "1111",
                "card_first_digits": "411111",
                "card_brand": "visa",
                "postback_url": null,
                "payment_method": "credit_card",
                "antifraud_score": null,
                "boleto_url": null,
                "boleto_barcode": null,
                "boleto_expiration_date": null,
                "referer": null,
                "ip": null,
                "subscription_id": null,
                "phone": null,
                "address": null,
                "customer": null,
                "card": null,
                "metadata": {}
            },
            "sort": [12345]
        }]
    }
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **type**<br> <span class="required">obrigatório</span> | Objeto a ser buscado na base de dados, você pode buscar por qualquer objeto existente na API.<br> **Ex**: `transaction`, `subscription` ou `bank_account` |
| **query** | Filtros a serem utilizados para obtenção dos resultados esperados. Veja mais sobre as buscas no Elasticsearch [aqui](http://www.elastic.co/guide/en/elasticsearch/reference/current//search.html) |
| **search_type** | Informa o tipo de busca que deve ser feita na base de dados. Mais sobre tipos de pesquisa [aqui](http://www.elastic.co/guide/en/elasticsearch/reference/current//search-request-search-type.html) |


## Busca Avançada com o ElasticSearch

> GET https://api.pagar.me/1/search

```shell
curl -X GET https://api.pagar.me/1/search \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'type=transaction' \
-d 'query={
      "query": {
        "filtered": {
          "query": {
            "match_all": {}
          },
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
                  {
                    "term": {
                      "status": "waiting_payment"
                    }
                  },
                  {
                    "term": {
                      "status": "paid"
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    }'
```

```ruby
```

```php
```

```cs
```

Você pode utilizar a [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) do ElasticSearch para fazer buscas avançadas. No exemplo ao lado, realizamos uma query em que filtramos `transactions` com `date_created` no mês de Janeiro de 2016, ao mesmo tempo que filtramos apenas transações que contenham `status` como `paid` ou como `waiting `

> JSON Retornado (Exemplo)

```json
{
  "took": 2,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 4,
    "max_score": 14.429372,
    "hits": [
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "352251",
        "_score": 14.429372,
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
          "date_created": "2016-01-13T15:52:52.000Z",
          "date_updated": "2016-01-13T15:52:53.000Z",
          "amount": 10000,
          "installments": 1,
          "id": 352251,
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
          "boleto_expiration_date": "2016-01-20T02:00:00.744Z",
          "referer": "api_key",
          "ip": "179.191.82.50",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        }
      },
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "352247",
        "_score": 14.425906,
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
          "date_created": "2016-01-13T15:51:56.000Z",
          "date_updated": "2016-01-13T15:51:57.000Z",
          "amount": 10000,
          "installments": 1,
          "id": 352247,
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
          "boleto_expiration_date": "2016-01-20T02:00:00.664Z",
          "referer": "api_key",
          "ip": "179.191.82.50",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        }
      },
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "348547",
        "_score": 14.025334,
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
          "date_created": "2016-01-07T21:19:53.000Z",
          "date_updated": "2016-01-07T21:19:53.000Z",
          "amount": 1000,
          "installments": 1,
          "id": 348547,
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
          "boleto_expiration_date": "2016-01-14T02:00:00.474Z",
          "referer": "api_key",
          "ip": "179.185.132.108",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        }
      },
      {
        "_index": "pagarme",
        "_type": "transaction",
        "_id": "352252",
        "_score": 14.025334,
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
          "date_created": "2016-01-13T15:53:07.000Z",
          "date_updated": "2016-01-13T15:53:07.000Z",
          "amount": 10000,
          "installments": 1,
          "id": 352252,
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
          "boleto_expiration_date": "2016-01-20T02:00:00.502Z",
          "referer": "api_key",
          "ip": "179.191.82.50",
          "subscription_id": null,
          "phone": null,
          "address": null,
          "customer": null,
          "card": null,
          "antifraud_metadata": {},
          "metadata": {}
        }
      }
    ]
  }
}
```

