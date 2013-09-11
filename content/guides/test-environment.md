---
title: Modo de testes
---

# Modo de testes (sandbox)

O Pagar.me conta com um modo de testes que permite simular transações, cancelamentos, etc, sem que as transações ocorram de verdade. Isso permite testar o Pagar.me sem creditar cartões de crédito ou mexer em suas transações do ambiente de produção.

[Todas os métodos](/restful-api/methods) podem ser usados no modo de testes. Para isso, basta adicionar o seguinte parâmetro a qualquer requisição:

	live=0

Para usar o Pagar.me em produção (modo normal), basta ignorar o parâmetro `live`, ou configurá-lo para `1`:

	live=1
