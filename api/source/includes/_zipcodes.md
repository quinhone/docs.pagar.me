# Códigos postais

## Consulta de CEP

> GET https://api.pagar.me/1/zipcodes/:zipcode

```shell
curl -X GET https://api.pagar.me/1/zipcodes/01452001
```

```ruby
```

```php
```

```cs
```

Com essa rota você pode verificar os dados de um determinado CEP.

> JSON Retornado (Exemplo)

```json
{
    "neighborhood": "Jardim Paulistano",
    "street": "Avenida Brigadeiro Faria Lima",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": "01452001"
}
```

| Parâmetro | Descrição |
|--:|:--|
| **:zipcode**<br> <span class="required">obrigatório</span> | Código postal (CEP) que você deseja buscar informações |


