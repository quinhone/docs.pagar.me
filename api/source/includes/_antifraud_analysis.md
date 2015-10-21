# Análises antifraude

## Objeto `antifraud_analysis`

> Objeto antifraud_analysis

```json
{
    "cost": 60,
    "date_created": "2015-01-10T12:31:13.000Z",
    "date_updated": "2015-03110T12:31:13.000Z",
    "id": 99999,
    "name": "clearsale",
    "object": "antifraud_analysis",
    "score": 31.39,
    "status": "approved"
}
```

Objeto retornado após a análise antifraude feita em uma transação. Toda vez que uma transação é criada e você está com seu sistema de antifraude ativo, ela passa pela análise antifraude de todos antifraudes ativos para sua empresa, para cada análise dessa, um novo objeto `antifraud_analysis` é criado.

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `antifraud_analysis` |
| **name**<br> String | Nome do antifraude utilizado |
| **score**<br> Number | pontuação, de 0 a 100, da probabilidade de fraude na transação realizada |
| **cost**<br> Number | Custo da análise antifraude |
| **status**<br> String | Possíveis valores de estado para as análises antifraude: `processing`, `approved`, `refused` e `failed` |
| **date_created**<br> String | Data de criação da transação no formato ISODate |
| **date_updated**<br> String | Data de atualização da transação no formato ISODate |
| **id**<br> Number | Número identificador da análise antifraude |

