---
title: Modo de testes
---

# Modo de testes (sandbox)

O Pagar.me conta com um modo de testes que permite simular transações, cancelamentos, etc, sem que as transações ocorram de verdade. Isso permite testar o Pagar.me sem creditar cartões de crédito ou mexer em suas transações do ambiente de produção.

[Todas os métodos](/docs/restful-api/methods) podem ser usados no modo de testes. Para isso, basta utilizar a `api_key` e a `encryption_key` de teste disponíveis no seu dashboard.
