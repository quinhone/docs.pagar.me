# Regras do split

## Objeto `split_rule`

> Objeto split_rule

```json
{
    "object": "split_rule",
    "id": "sr_ci7ntawl1001s2m164zrbp7tz",
    "recipient_id": "re_ci7nhf1ay0007n016wd5t22nl",
    "charge_processing_fee": true,
    "liable": true,
    "percentage": 30,
    "amount": null,
    "date_created": "2015-03-24T21:26:09.000Z",
    "date_updated": "2015-03-24T21:26:09.000Z"
}
```

Objeto que contém as informações das regras da divisão do valor gerado na transação.

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `user` |
| **id**<br>String | Identificador da regra de divisão |
| **recipient_id**<br><span class="required">obrigatório</span><br>String | Recebedor que irá receber os valores descritos nessa regra |
| **charge_processing_fee**<br>Boolean | Define se o recebedor dessa regra irá ser cobrado pela taxa da Pagar.me |
| **liable**<br>Boolean | Define se o recebedor vinculado a essa regra irá se responsabilizar pelo risco da transação (estorno/chargeback) |
| **percentage**<br><span class="required">obrigatório\*</span><br>Number | Porcentagem que o recebedor vai receber do valor da transação. <br> **OBS**: Caso `percentage` seja utilizada, não é necessário passar o parâmetro `amount` |
| **amount**<br><span class="required">obrigatório\*</span><br>Number | Valor que o recebedor vai receber da transação. <br> **OBS**: Caso `amount` seja utilizado, não é necessário passar o parâmetro `percentage` |
| **date_created**<br>String | Data da criação da `split_rule` |
| **date_updated**<br>String | Data de atualização da `split_rule` |

