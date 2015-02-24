---
title: Referência da API - Pagar.me

language_tabs:
  - shell
  - ruby
  - php

toc_footers:
  - <a href='http://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---

# Introdução

Bem-vindo ao guia de referências da API do [Pagar.me](https://pagar.me/)! É através desta API que você irá integrar seu sistema ao nosso, e, além disso, você também pode recriar as funcionalidades existentes na nossa dashboard, que são feitas consumindo a API que será aqui descrita.

A primeira coisa que você deve saber é o endpoint que usamos:

`
https://api.pagar.me/1/
`

# Transações

Através da rota `/transactions` e suas derivadas, você pode realizar as seguintes ações:

* Criar uma transação (para pagamentos por cartão de crédito ou boleto bancário)
* Calcular as prestações de pagamentos parcelados
* Fazer o estorno de alguma transação
* Fazer a captura de alguma transação previamente autorizada
* Verificar o resultado da análise do antifraude
* Pegar uma nova chave para encriptar o card_hash
* Verificar uma transação efetuada
* Atualizar uma transação
* Receber a mensagem de recusa de uma transação
