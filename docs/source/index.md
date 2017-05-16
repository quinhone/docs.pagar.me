---
title: Início

search: true
---

# Início

Seja bem-vindo a documentação do Pagar.me! Aqui você encontrará guias e
referências sobre como usar nossa infraestrutura de pagamentos.

### Endpoints e bibliotecas

Nossa API é
[RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) e todas
as respostas são em [JSON](http://www.json.org). Todas as requisições são
feitas no endpoint:

```
https://api.pagar.me/1
```

Nos exemplos que você encontrará pela documentação, usaremos o
[cURL](http://curl.haxx.se) e as nossas bibliotecas em
[Ruby](https://github.com/pagarme/pagarme-ruby),
[PHP](https://github.com/pagarme/pagarme-php/tree/V2) e [C\#](https://github.com/pagarme/pagarme-net). 

### Integração Ruby

Para instalar a biblioteca em Ruby:

```
gem install pagarme
```

Você pode conferir o código-fonte [aqui](https://github.com/pagarme/pagarme-ruby).

### Integração PHP

Para instalar a biblioteca PHP, basta [baixá-la do nosso
Github](https://github.com/pagarme/pagarme-php/tree/V2) e copiá-la para a pasta do seu
projeto. Use o [Composer](https://getcomposer.org) para baixar as dependências necessárias.

A versão mais atual da sdk é 3, estando em: [PHP v3](https://github.com/pagarme/pagarme-php).
Para essa nova versão, vide a wiki no github: [Wiki](https://github.com/pagarme/pagarme-php/wiki)

### Para começar...

Inicie lendo o [guia sobre como capturar os dados de
cartão](/capturing-card-data), que explica como realizar a captura desses dados
sem sair da sua página/aplicativo. 

Esse guia também mostra como gerar o
`card_hash`, que é a forma do Pagar.me de transmitir os dados de cartão com
segurança entre o seu cliente e nosso servidor.

### Realizando uma transação

A forma mais simples de usar o Pagar.me é simplesmente [realizando uma
transação](/transactions) pelo seu servidor. No caso de transações de cartão de
crédito, você deverá utilizar o `card_hash` gerado no browser/aplicativo do
cliente para isso. Para transações de boletos bancários, o uso do `card_hash`
não é necessário.

### Cobranças recorrentes

Se você precisa cobrar seus clientes de maneira recorrente, o Pagar.me suporta
[planos e assinaturas](/plans-subscriptions). Com eles, basta nos dizer quanto,
como e quando devemos cobrar seus clientes, e nós cuidaremos de todo o resto para
você :-)

### One click buy

Você também pode armazenar os dados de cartão dos seus clientes no Pagar.me e
realizar cobranças quando desejar. Dessa forma, você pode implementar
funcionalidades como o one-click-buy em sua aplicação. Leia mais sobre
[cobrando um cartão posteriormente](/cards).

### Dúvidas?

Surgiu alguma dúvida ou sugestão para tornar nossa documentação melhor? Mande
um e-mail para [suporte@pagar.me](mailto:suporte@pagar.me) e iremos te ajudar!
:-)
