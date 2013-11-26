---
title: Guia de integração em .NET
---

# Guia de integração em .NET

## Instalando a gem

A biblioteca está disponível no [GitHub](https://github.com/pagarme/pagarme-net) ou pelo NuGet:

	PM> Install-Package Pagarme

## Utilizando a biblioteca

### Instanciando o PagarMeProvider

Antes de iniciar, é necessário instanciar a cclasse PagarMeProvider informando a chave da API e de criptografia

<pre><code data-language="csharp">PagarMeProvider pagarme = new PagarMeProvider("chave da api", "chave de criptografia");</code></pre>

### Realizando uma transação

Para realizar uma transação...

<pre><code data-language="csharp">TransactionSetup transactionData = new TransactionSetup
{
	Amount = 1000,
	PaymentMethod = PaymentMethod.CreditCard,
	CardHash = "... card hash obtido pelo cliente ..."
};

Transaction transaction = pagarme.PostTransaction(transactionData);
</code></pre>

Se não ocorreu nenhum erro, o metodo PostTransaction retornara os dados da nova transação.

### Tratando erros ao realizar uma operação na API

Caso um dos parâmetros seja inválido ao realizar uma transação, a biblioteca irá disparar uma PagarMeException contendo informações sobre o erro

### Cancelando uma transação

Após a transação ser realizada com sucesso, ela terá o status `TransactionStatus.Paid`, como já foi visto:

Caso você deseja cancelar a transação, estornando o valor pago pelo cliente:

<pre><code data-language="csharp">transaction.Refund();</code></pre>

Se a transação for cancelada com sucesso, seu status mudará para `TransactionStatus.Refunded`, indicando que ela foi cancelada com sucesso.

### Buscando uma transação

As transações podem ser buscadas atráves do LINQ, usando qualquer critério disponível.

<pre><code data-language="csharp">var transaction = pagarme.Transactions.Find(18305);</code></pre>

<pre><code data-language="csharp">var transactions = from t in pagarme.Transactions where t.Amount > 1000 select t;</code></pre>

<pre><code data-language="csharp">var transactions = pagarme.Transactions.First(t => t.PaymentMethod == PaymentMethod.Boleto);</code></pre>

Note que o suporte a condições ainda é pequeno e apenas os operadores `==`, `>`, `>=`, `<` e `<=` estão disponíveis.
