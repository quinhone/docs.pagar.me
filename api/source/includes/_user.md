# Usuário

## Objeto `user`

> Objeto user

```json
{
    "object": "user",
    "id": "52d7faa6d8dd64e210f6c4e3",
    "email": "ciclano@pagar.me",
    "name": "Ciclano da Silva",
    "permission": "read_write",
    "date_created": "2014-01-16T15:28:38.201Z"
}
```

Dados de um usuário registrado no nosso sistema.

| Propriedade | Descrição |
|--:|:--|
| **object**<br> String | Nome do tipo do objeto criado/modificado. <br> **Valor retornado**: `user` |
| **id**<br> String | Identificador do usuário |
| **email**<br> String | Email do usuário |
| **name**<br> String | Nome do usuário |
| **permission**<br> String | Tipo de permissão do usuário. <br> **Tipos**: `admin`, `read_write`, `read_only` |
| **date_created**<br> String | Data da criação do usuário (ISODate) |

