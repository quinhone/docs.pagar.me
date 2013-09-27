---
title: Modo de testes
---

# Modo de testes (sandbox)

O Pagar.me conta com um modo de testes que permite simular transações, cancelamentos, etc, sem que as transações ocorram de verdade. Isso permite testar o Pagar.me sem creditar cartões de crédito ou mexer em suas transações do ambiente de produção.

[Todas os métodos](/docs/restful-api/methods) podem ser usados no modo de testes. Para isso, basta utilizar a `api_key` e a `encryption_key` de teste disponíveis no seu dashboard.

## Exemplo de chaves de teste

- `api_key`: `ak_test_KGXIjQ4GicOa2BLGZrDRTR5qNQxDWo`
- `encryption_key`: `ek_test_Ec8KhxISQ1tug1b8bCGxC2nXfxqRmk`

## Exemplos de chave de produção

- `api_key`: `ak_live_u81exsH9rlp9T0P9PVHu3pNSrc9MGD`
- `encryption_key`: `ek_live_56h0PKYwnbUQNB8MB5Ott1KfMrqBSV`
