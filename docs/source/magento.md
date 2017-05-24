---
title: Integração com Magento

search: true
---

# Integração com Magento

## Configurando o Plugin

### No painel Magento

**Instalando o plugin:**

Acesse o Plugin Pagar.me para Magento por meio desse link: [https://github.com/pagarme/pagarme-magento](https://github.com/pagarme/pagarme-magento)

**Configurando o plugin:**

Com o plugin instalado acesse, o admin do Magento e faça as configurações necessárias.

Para fazer as configurações do plugin, é só seguir as imagens abaixo. Para testar e ativá-lo, você precisa das chaves que estão no
painel do Pagar.me, tem um tutorial de como pegá-las logo abaixo.

**Configurando os campos no painel do Magento:**

Para prosseguir, precisamos de dois campos configurados no painel.

1. Vá até a parte referente a ***Número de linhas p/ endereço > 4***
2. Após fazer essa alteração, configure ***Exibir CPF/CNPJ > Obrigatório***

![](magento/configurando-campos.png)

Feito isso, precisamos configurar as chaves (API Key).

![](magento/configurando-api-keys.png)

Para testar e ativá-lo, você precisa das chaves que estão no painel do Pagar.me, tem um tutorial de como pegá-las logo abaixo.

**Na Dashboard do Pagar.me:**

    3. Na Home da nossa Dashboard, acesse suas configurações de conta.

![](plataformas/dashboard-minha-conta.png)

    4. Na sua conta, vá em ***Configurações > API Keys***.
Nessa página, você encontra as chaves de API de modo LIVE e TEST

![](plataformas/dashboard-api-keys.png)

**De volta ao Painel do Magento:**

Após inserir as chaves, salve as alterações.
Depois, é só configurar os pagamentos.

## Configurando Boleto

![](magento/configurando-boleto.png)

## Configurando Cartão de Crédito

![](magento/configurando-cartao.png)

Também está disponível para cliente Magento o Checkout Pagar.me

Saiba mais clicando no link [Pagar.me Checkout](http://pagar.me/checkout) e siga as instruções de configuração para utilizar.

Agora é só fazer algumas transações em modo TEST para testar a ferramenta.
O Pagar.me já está funcionando!



