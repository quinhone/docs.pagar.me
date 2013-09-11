---
title: Como funciona o pagamento?
---

# Como funciona o pagamento?

Toda transação realizada com o Pagar.me envolve três etapas. Primeiro, é necessário capturar os dados do cartão de crédito do usuário em seu site. Depois, enviar esses dados para o seu servidor. A partir daí, em posse das informações do cartão de crédito, você pode se comunicar com o Pagar.me e realizar a transação em si.

A segurança é vital em todas as etapas do processo.

### Captura dos dados do cartão de crédito em seu site

Uma das vantagens do Pagar.me é permitir que os pagamentos com cartão de créditos sejam realizados sem que o usuário deixe o seu site em nenhum momento. Para garantir essa comodidade e a segurança da operação, os dados do cartão de crédito do usuário devem ser capturados e transmitidos de forma segura.

Para isso, é importante que o seu site utilize a [biblioteca em Javascript do Pagar.me](/apis/javascript). Ela permite que os dados do cartão de crédito trafeguem de forma que só possam ser lidos pelo Pagar.me, garantindo assim a segurança e a autenticidade da transação.

A biblioteca em Javascript do Pagar.me transforma os dados do cartão (número, nome do portador, data de validade, etc.) presentes em um `form` de seu HTML em uma única string chamada `card_hash`.

### Envio dos dados do cartão para seu servidor

O `card_hash` é a única string que deve ser enviada para o seu servidor. Ele será usado pelo seu servidor para realizar a transação nas próximas etapas com o Pagar.me.

Embora seja recomendado que o seu site utilize `HTTPS`, o `card_hash` gerado pela biblioteca em Javascript pode ser seguramente enviado para o seu servidor através de uma requisição HTTP.

### Realizando a transação com os dados do `card_hash`

Agora que o seu servidor detém o `card_hash`, ele pode se comunicar com o Pagar.me para realizar a transação em si, debitando o cartão de crédito do usuário.

Se o seu site é em [Ruby on Rails](http://rubyonrails.org) ou [PHP](http://php.net), o Pagar.me já possui bibliotecas prontas. Visite o [manual de integração em Ruby on Rails](/apis/ruby) e o [manual de integração em PHP](/apis/php).

Caso o seu site não utilize essas linguagens, a API do Pagar.me é RESTful, e portanto simples de ser implementada. [Confira os exemplos de requisições a API usando o cURL](/restful-api/examples).
