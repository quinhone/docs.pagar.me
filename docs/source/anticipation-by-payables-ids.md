
# Antecipações escolhendo recebíveis

Através da rota `/recipients/:recipient_id/bulk_anticipations` e suas derivadas, você pode criar antecipações especificando quais recebíveis gostaria, ou seja, 
recebíveis que pertençam a um grupo de transações que mais lhe interesse. Segue:

## Objeto `bulk_anticipation`

> Objeto bulk_anticipation

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

Ao criar ou atualizar uma antecipação, este será o objeto que você irá receber como resposta em cada etapa do processo de efetivação da antecipação.

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `bulk_anticipation` |
| **status**<br> String | Status atual da antecipação <br> **Valores possíveis**: `building`, `pending`, `approved`, `refused`, `canceled` |
| **timeframe**<br> String | Período de onde os recebíveis irão vir, do ínicio ou do fim de sua agenda de recebíveis. **Ex**: Caso você escolha do começo (`start`), seu custo será menor mas há maior impacto no seu fluxo de caixa. <br> **Valores possíveis**: `start`, `end` |
| **payment_date**<br> String | Data de pagamento da antecipação.  |
| **amount**<br> Number | Valor bruto, em centavos, da antecipação criada.  |
| **fee**<br> Number | Taxa de adquirência relacionada aos recebíveis antecipados. |
| **anticipation_fee**<br> Number | Taxa de antecipação relacionada aos recebíveis antecipados. |
| **id**<br> String | Identificador da antecipação |

## Criando uma antecipação escolhendo recebíveis

> POST https://api.pagar.me/1/recipients/:recipient_id/bulk_anticipations

```shell
curl -X POST https://api.pagar.me/1/recipients/re_a123sd18das9d164/bulk_anticipations/ \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'timeframe=start' \
-d 'payment_date=1462999741870' \
-d 'requested_amount=561599' \
-d 'building=true' \
-d 'payables_ids[]=347640' \
-d 'payables_ids[]=347639'
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
| **api_key**<br> <span class="required">obrigatório</span>| Chave da API (disponível no seu dashboard) |
| **payment_date**<br> <span class="required">obrigatório</span>| Data que você deseja receber a antecipação em sua conta Pagar.me |
| **payables_ids**<br> | Conjunto de IDs de recebíveis que você queira antecipar |
| **timeframe**<br> <span class="required">obrigatório</span><br> Valores: `start`, `end`| Define o período de onde os recebíveis serão escolhidos. **start** define recebíveis próximos, perto de serem pagos, e **end** define recebíveis longes, no final de todos recebíveis que você possui para receber |
| **requested_amount**<br> <span class="required">obrigatório</span>| Valor líquido, em centavos, que você deseja receber de antecipação |
| **building**<br> Valores: `true` ou `false` |  Define se a antecipação deve retornar com status `building`, para `building=true`, para possíveis ajustes no valor da antecipação, ou se a transferência é criada diretamente, para `building=false` e a antecipação já vai diretamente para a aprovação do Pagar.me. **OBS**: Caso você deseje alterar a antecipação após confirmar, você tem 5 minutos antes que a antecipação `building` seja destruída automaticamente |


## Exemplo prático

1. Ao fazer a antecipação escolhendo os 'payables_ids':[id1,id2,id3], sendo que cada um desses payables é de R$ 500,00, para vencimento em 01/12/16, 02/12/16, e 03/12/16 respectivamente (e considerando taxa de antecipação = 0 **apenas para ilustração**).
- a) se requested_amount = R$ 1000,00 e timeframe = start: Ele vai antecipar os payables id1 e id2
- b) se requested_amount = R$ 1000,00 e timeframe = end: Ele vai antecipar os payables id2 e id3
- c) se requested_amount = R$ 7000,00: ele vai antecipar payables id1, id2 e id3 , independentemente de timeframe (vai ser valor R$ 1500,00)

Para saber mais sobre antecipação: [Refêrencia completa API - Pagar.Me](https://docs.pagar.me/api/#antecipacoes)

