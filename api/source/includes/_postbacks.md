# POSTback

Ao criar uma transação ou uma assinatura, você tem a opção de passar o parâmetro `postback_url` na requisição com a informação da URL do seu sistema que irá receber as notificações a cada alteração de status dessas transações/assinaturas.

## POSTback de transações

> Dados enviados via POSTback de uma transação

```json
{
  "old_status": "processing",
  "object": "transaction",
  "current_status": "paid",
  "desired_status": "paid",
  "event": "transaction_status_changed",
  "id": 194330
}
```

Sempre que uma **transação** tiver seu estado alterado, uma notificação será enviada caso tenha sido atribuída uma URL de POSTback na criação desta transação.

<a href="http://puu.sh/hdMYO/9a740bd556.png" target="_blank">Exemplo de retorno via POSTback</a>


| Propriedade | Descrição |
|--:|:--|
| **old_status**<br> String | Status anterior desta transação. <br> **Valores possíveis**: `processing`, `authorized`, `waiting_payment`, `pending_refund` |
| **object**<br> String | Nome do tipo do objeto <br> **Valores possíveis**: `transaction` |
| **current_status**<br> String | Status atual da transação. <br> **Valores possíveis**: `authorized`, `paid`, `refunded`, `waiting_payment`, `pending_refund`, `refused` |
| **desired_status**<br> String | Status desejado desta transação se todo o fluxo for respeitado.<br> **Valores possíveis**: `paid` |
| **event**<br> String | Nome do evento <br> **Valores possíveis**: `transaction_status_changed` |
| **id**<br> Number | Id da transação |

<aside class="notice">OBS: Você deve validar os postbacks para garantir que eles foram enviados pela Pagar.me.<br/>
  Para isso existe o cabeçalho HTTP `X-Hub-Signature`, <a href="https://docs.pagar.me/advanced#validando-a-origem-de-um-postback">saiba mais</a></aside>

## POSTback de assinaturas

> Dados enviados via POSTback de uma assinatura

```json
{
  "old_status": "unpaid",
  "object": "transaction",
  "current_status": "paid",
  "desired_status": "paid",
  "event": "subscription_status_changed",
  "id": 16859
}
```

Sempre que uma **assinatura** tiver seu estado alterado, uma notificação será enviada caso tenha sido atribuída uma URL de POSTback na criação desta assinatura.

<a href="http://puu.sh/hdPWZ/fe35cb7980.png" target="_blank">Exemplo de retorno via POSTback</a>

<aside class="notice">OBS: Você deve validar os postbacks para garantir que eles foram enviados pela Pagar.me.<br/>
  Para isso existe o cabeçalho HTTP `X-Hub-Signature`, <a href="https://docs.pagar.me/advanced#validando-a-origem-de-um-postback">saiba mais</a></aside>
