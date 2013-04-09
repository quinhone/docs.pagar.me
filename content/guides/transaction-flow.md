---
title: Como funciona o pagamento?
---

# Como funciona o pagamento?

Toda transação realizada com o PagarMe envolve três etapas. Primeiro, é necessário capturar os dados do cartão de crédito do usuário em seu site. Depois, enviar esses dados para o seu servidor. A partir daí, em posse das informações do cartão de crédito, você pode se comunicar com o PagarMe do seu servidor e realizar a transação em si.

A segurança é vital em todas as etapas do processo.

### Captura dos dados do cartão de crédito em seu site

Uma das vantagens do PagarMe é permitir que os pagamentos com cartão de créditos sejam realizados sem que o usuário deixe o seu site em nenhum momento. Para garantir essa comodidade e a segurança da operação, é preciso que os dados do cartão de crédito do usuário sejam capturados e transmitidos de forma segura.

Para isso, é importante que o seu site utilize a [biblioteca em Javascript do PagarMe](/apis/javascript). Ela permite que os dados do cartão de crédito trafeguem de forma que só podem ser lidos pelo PagarMe, garantindo assim a segurança e a autenticidade da transação.

A biblioteca em Javascript do PagarMe transforma os dados do cartão (número, nome do portador, data de validade, etc.) presentes em um `form` de seu HTML em uma única string chamada `card_hash`.

### Envio dos dados do cartão para seu servidor

O `card_hash` é a única string que deve ser enviada para o seu servidor. Ele será usado pelo seu servidor para realizar a transação nas próximas etapas com o PagarMe.

Embora seja recomendado que o seu site utilize `HTTPS`, o `card_hash` gerado pela biblioteca em Javascript pode ser seguramente enviado para o seu servidor através de uma requisição HTTP.

### Realizando a transação com os dados do `card_hash`

Agora que o seu servidor detém o `card_hash`, ele pode se comunicar com o PagarMe para realizar a transação em si, creditando o cartão de crédito do usuário.

Se o seu site é em [Ruby on Rails](http://rubyonrails.org) ou [PHP](http://php.net), o PagarMe já possui bibliotecas prontas. Visite o [manual de integração em Ruby on Rails](/apis/ruby) e o [manual de integração em PHP](/apis/php).

Caso o seu site não utilize essas linguagens, a API do PagarMe é RESTful, e portanto simples de ser implementada. [Confira os exemplos de requisição a API usando o cURL](/restful-api/examples).
