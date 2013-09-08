---
title: Segurança e autenticação
---

# Segurança e autenticação

A segurança é um dos pontos mais importantes na operação do PagarMe. Para isso, medidas precisam ser tomadas para garantir a autenticidade e a segurança das transações realizadas.

## Autenticação pela *api_key*

Todas as requisições ao PagarMe devem passar o parâmetro `api_key`, contendo a chave de acesso da API disponível no seu [dashboard](https://dashboard.pagar.me).

A sua `api_key` é responsável pela autenticação na API do PagarMe, assim como por associar as transações realizadas à sua conta. Por isso, mantê-la em segredo é essencial.

## HTTPS

A comunicação com o PagarMe só é possível por HTTPS. Dessa forma, os riscos de ataques _man in the middle_ que ofereçam perigo aos dados de transações diminui consideravelmente.

Nossas bibliotecas prontas fazem a validação do certificado HTTPS do servidor, e caso você deseje realizar as [requisições manualmente](/docs/restful-api/examples) ou construir sua própria biblioteca, é altamente recomendável que faça essa validação também.

## O *card_hash*

Todos os dados de cartão de crédito devem ser enviados para o servidor utilizando o `card_hash`. O `card_hash` torna possível que todos os dados do cartão trafeguem de forma criptografada e que só pode ser compreendida pelo PagarMe, tornando impraticável qualquer tentativa de utilizá-los de forma indevida por terceiros.

O `card_hash` consiste em uma string gerada a partir dos dados do cartão de crédito. Para mais informações sobre como gerá-lo, [consulte a referência sobre o *card_hash*](/docs/restful-api/card-hash).
