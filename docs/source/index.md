---
title: Início

search: true
---

# Início

Seja bem-vindo a documentação do Pagar.me! Aqui você encontrará guias e
referências sobre como usar nossa infraestrutura de pagamentos.

### Endpoints e bibliotecas

Nossa API é RESTful e todas as respostas são em JSON. Todas as requisições são
feitas no endpoint:

```
https://api.pagar.me/1
```

Nos exemplos que você encontrará pela documentação, usaremos as nossas
bibliotecas de Ruby e PHP. Para instalar a biblioteca de Ruby:

```
gem install pagarme
```

E a biblioteca de PHP:

```
composer install pagarme-php
```

Você também pode baixar a biblioteca PHP do nosso Github
(`https://github.com/PagarMe/pagarme-php`) e copiá-la para a pasta do seu
projeto.

### Para começar...

Recomendamos que você leia o [guia sobre pagamento dentro do seu
site](/custom_form), que explica como realizar uma transação sem sair da sua
página de maneira segura. Esse guia também mostra como gerar o `card_hash`, que
é a forma do Pagar.me de transmitir os dados de cartão com segurança entre o
browser do cliente e nós.

### Cobranças recorrentes

Se você precisa cobrar seus clientes de maneira recorrente, o Pagar.me suporta
[planos e assinaturas](/plans_subscriptions). Com eles, basta nos dizer quanto,
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
