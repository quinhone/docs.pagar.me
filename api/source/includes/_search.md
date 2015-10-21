# Buscas avançadas

## ElasticSearch

> GET https://api.pagar.me/1/search

```shell
curl -X GET https://api.pagar.me/1/search \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
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


