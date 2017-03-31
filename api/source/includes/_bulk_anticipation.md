# Antecipações

Através da rota `/recipients/:recipient_id/bulk_anticipations` e suas derivadas, você pode criar antecipações, obter os limites de antecipação, cancelar, dentre outras atividades relacionadas a estas.

## Objeto `bulk_anticipation`

> Objeto bulk_anticipation

```json
{
  "object": "bulk_anticipation",
  "id": "ba_cisc10x0k013x4x6ezdivenc7",
  "status": "pending",
  "amount": 312695,
  "fee": 31270,
  "anticipation_fee": 20866,
  "type": "spot",
  "timeframe": "start",
  "payment_date": "2016-09-02T03:00:00.000Z",
  "date_created": "2016-08-26T17:22:55.656Z",
  "date_updated": "2016-08-26T17:23:07.770Z"
}
```

Ao criar ou atualizar uma antecipação, este será o objeto que você irá receber como resposta em cada etapa do processo de efetivação da antecipação.

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `bulk_anticipation` |
| **id**<br> String | Identificador da antecipação |
| **status**<br> String | Status atual da antecipação <br> **Valores possíveis**: `building`, `pending`, `approved`, `refused`, `canceled` |
| **amount**<br> Number | Valor bruto, em centavos, da antecipação criada.  |
| **fee**<br> Number | Taxa de adquirência relacionada aos recebíveis antecipados. |
| **anticipation_fee**<br> Number | Taxa de antecipação relacionada aos recebíveis antecipados. |
| **type**<br> Number | Tipo de antecipação criada. <br> **Valores possíveis**: `spot`, `automatic` |
| **timeframe**<br> String | Período de onde os recebíveis irão vir, do ínicio ou do fim de sua agenda de recebíveis. **Ex**: Caso você escolha do começo (`start`), seu custo será menor mas há maior impacto no seu fluxo de caixa. <br> **Valores possíveis**: `start`, `end` |
| **payment_date**<br> String | Data de pagamento da antecipação.  |
| **date_created**<br> String | Data de criação da antecipação.  |
| **date_updated**<br> String | Data de atualização da antecipação.  |

## Criando uma antecipação

> POST https://api.pagar.me/1/recipients/:recipient_id/bulk_anticipations

```shell
curl -X POST https://api.pagar.me/1/recipients/re_a123sd18das9d164/bulk_anticipations/ \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'timeframe=start' \
-d 'payment_date=1491346800000' \
-d 'requested_amount=45000' \
-d 'build=true' \
```

```ruby
```

```php
```

```cs
```

Para criar uma antecipação, você deve usar a rota `/recipients/:recipient_id/bulk_anticipations`.

> JSON retornado (exemplo):

```json
{
  "object": "bulk_anticipation",
  "id": "ba_cj0x9l43l0033y86dudlmevd4",
  "status": "pending",
  "amount": 48070,
  "fee": 2923,
  "anticipation_fee": 221,
  "type": "spot",
  "timeframe": "start",
  "payment_date": "2017-04-04T03:00:00.000Z",
  "date_created": "2017-03-31T03:23:23.277Z",
  "date_updated": "2017-03-31T03:23:23.277Z"
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span>| Chave da API (disponível no seu dashboard) |
| **payment_date**<br> <span class="required">obrigatório</span>| Data que você deseja receber a antecipação em sua conta Pagar.me |
| **timeframe**<br> <span class="required">obrigatório</span><br> Valores: `start`, `end`| Define o período de onde os recebíveis serão escolhidos. **start** define recebíveis próximos, perto de serem pagos, e **end** define recebíveis longes, no final de todos recebíveis que você possui para receber |
| **requested_amount**<br> <span class="required">obrigatório</span>| Valor líquido, em centavos, que você deseja receber de antecipação |
| **build**<br> Valores: `true` ou `false` |  Define se a antecipação deve retornar status `building` com `build=true`, isso para possíveis ajustes no valor da antecipação, data de pagamento ou timeframe. Para `build=false`, a antecipação já vai diretamente para a aprovação do Pagar.me. **OBS**: Caso deseje alterar a antecipação antes de confirmar, você tem 5 minutos antes que a antecipação `building` seja destruída automaticamente. |

### Criando uma antecipação para o mesmo dia
Para criar uma antecipação com essa condição, você precisa apenas passar o parâmetro `payment_date` com a data de hoje, mas com a restrição de que só pode ser feito até as 11h da manhã. Ademais, vale ressaltar também que antecipações desse tipo, feitas via API, **não** criam uma transferência automática para sua conta bancária.

## Obtendo os limites de antecipação

> GET https://api.pagar.me/1/recipients/:recipient_id/bulk_anticipations/limits

```shell
curl -X GET https://api.pagar.me/1/recipients/re_a123sd18das9d164/bulk_anticipations/limits \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'timeframe=start' \
-d 'payment_date=1462999741870' \
```

```ruby
```

```php
```

```cs
```

Retorna os limites máximos e mínimos de antecipação que aquele recebedor pode fazer.

> JSON Retornado (exemplo):

```json
{
    "maximum": {
        "amount": 23000, 
        "anticipation_fee": 1000, 
        "fee": 2633
    }, 
    "minimum": {
        "amount": 10000, 
        "anticipation_fee": 200, 
        "fee": 1543
    }
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **:recipient_id**<br> <span class="required">obrigatório</span> | Identificador do recebedor |
| **timeframe**<br> <span class="required">obrigatório</span> <br> Valores: `start`, `end`| Define o período de onde os recebíveis serão escolhidos. **start** define recebíveis próximos, perto de serem pagos, e **end** define recebíveis mais distantes, a partir do final de todos recebíveis que você possui para receber |
| **payment_date**<br> <span class="required">obrigatório</span> |  Data de pagamento desejada para a antecipação, ou seja, data em que você deseja que o dinheiro esteja em sua conta Pagar.me disponível para saque |


## Confirmando uma antecipação `building`

> POST https://api.pagar.me/1/recipients/:recipient_id/bulk_anticipations/:id/confirm

```shell
curl -X POST https://api.pagar.me/1/recipients/re_a123sd18das9d164/bulk_anticipations/ba_as2i4234js23in123/confirm \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Confirma a antecipação criada, assim seu status passará para `pending`, ou seja, está criada com sucesso e aguardando aprovação do Pagar.me.

> JSON Retornado (exemplo):

```json
{
    "amount": 600005, 
    "anticipation_fee": 44940, 
    "date_created": "2015-10-23T05:17:54.000Z", 
    "date_updated": "2015-10-23T05:17:54.000Z", 
    "fee": 30025, 
    "id": "ba_cig37i5s6004xor6e5cefsjsp", 
    "object": "bulk_anticipation", 
    "payment_date": "2015-12-13T02:00:00.000Z", 
    "status": "pending", 
    "timeframe": "start", 
    "type": "spot"
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |

## Cancelando uma antecipação `pending`

> POST https://api.pagar.me/1/recipients/:recipient_id/bulk_anticipations/:id/cancel

```shell
curl -X POST https://api.pagar.me/1/recipients/re_a123sd18das9d164/bulk_anticipations/ba_as2i4234js23in123/cancel \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Cancela uma antecipação com status `pending`. Enquanto a antecipação foi criada e o Pagar.me ainda não a confirmou, você pode cancelar a antecipação a qualquer momento.

> JSON Retornado (exemplo):

```json
{
    "amount": 600005, 
    "anticipation_fee": 44940, 
    "date_created": "2015-10-23T05:17:54.000Z", 
    "date_updated": "2015-10-23T05:17:54.000Z", 
    "fee": 30025, 
    "id": "ba_cig37i5s6004xor6e5cefsjsp", 
    "object": "bulk_anticipation", 
    "payment_date": "2015-12-13T02:00:00.000Z", 
    "status": "canceled", 
    "timeframe": "start", 
    "type": "spot"
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |

## Deletando uma antecipação `building`

> DELETE https://api.pagar.me/1/recipients/:recipient_id/bulk_anticipations/:id/

```shell
curl -X DELETE https://api.pagar.me/1/recipients/re_a123sd18das9d164/bulk_anticipations/ba_as2i4234js23in123/ \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Enquanto você está construindo uma antecipação (status `building`), você pode cancelar o processo deletando a criação daquela antecipação. Lembrando que caso você não a destrua no status `building`, após 5 minutos ela é automaticamente destruída.

> JSON Retornado (exemplo):

```json
[
]
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |


## Retornando todas as antecipações

> GET https://api.pagar.me/1/recipients/:recipient_id/bulk_anticipations/

```shell
curl -X GET https://api.pagar.me/1/recipients/re_a123sd18das9d164/bulk_anticipations/ \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0'
```

```ruby
```

```php
```

```cs
```

Retorna um `Array` contendo objetos de antecipações.

> JSON Retornado (exemplo):

```json
[
    {
        "amount": 600005, 
        "anticipation_fee": 44940, 
        "date_created": "2015-10-23T05:17:54.000Z", 
        "date_updated": "2015-10-23T05:17:54.000Z", 
        "fee": 30025, 
        "id": "ba_cig37i5s6004xor6e5cefsjsp", 
        "object": "bulk_anticipation", 
        "payment_date": "2015-12-13T02:00:00.000Z", 
        "status": "pending", 
        "timeframe": "start", 
        "type": "spot"
    }, 
    {
        "amount": 220439, 
        "anticipation_fee": 24271, 
        "date_created": "2015-10-21T17:09:09.000Z", 
        "date_updated": "2015-10-21T17:09:43.000Z", 
        "fee": 11028, 
        "id": "ba_cig1214ng000sii6eryzz4pjb", 
        "object": "bulk_anticipation", 
        "payment_date": "2015-10-23T02:00:00.000Z", 
        "status": "canceled", 
        "timeframe": "start", 
        "type": "spot"
    }, 
    {
        "amount": 406065, 
        "anticipation_fee": 16842, 
        "date_created": "2015-10-21T17:08:41.000Z", 
        "date_updated": "2015-10-22T12:20:51.000Z", 
        "fee": 20313, 
        "id": "ba_cig120jcg000rii6evg415z4w", 
        "object": "bulk_anticipation", 
        "payment_date": "2015-10-23T02:00:00.000Z", 
        "status": "canceled", 
        "timeframe": "start", 
        "type": "spot"
    }]
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **count**<br> default: `10` | Retorna `n` objetos de transação |
| **page**<br> default: `1` | Útil para implementação de uma paginação de resultados |

