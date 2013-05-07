---
title: Guia de integração para iOS
---

# Guia de integração para iOS

A biblioteca para iOS do PagarMe permite que o [`card_hash`](/restful-api/card-hash) seja gerado no seu aplicativo para iOS e, portanto, que os dados de cartão de crédito sejam transmitidos de forma segura do seu aplicativo para o seu servidor, e do seu servidor para o servidor do PagarMe.

Ela funciona de forma análoga a [biblioteca em Javascript](/apis/javascript) num browser.

## Instalando a biblioteca

Para instalar a biblioteca, siga os seguintes passos:

- [Baixe a biblioca para iOS no GitHub do PagarMe.](https://github.com/PagarMe/pagarme-ios/archive/master.zip)
- Copie a pasta `PagarMeAPI` para o seu projeto do Xcode.
- Adicione o framework `Security.framework` ao seu projeto:

![](/assets/images/screenshots/xcode_add_framework.png)
(clique no botão `+` em vermelho e selecione o framework `Security.framework`)

## Usando a biblioteca
