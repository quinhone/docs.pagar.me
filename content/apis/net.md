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

O CardHash deve ser adquirido pelo browser usando nossa biblioteca em javascript, [pagarme-js](/docs/apis/javascript/) ou usando a classe CreditCard:

<pre><code data-language="csharp">CreditCard creditcard = new CreditCard();
creditcard.CardholderName = "Jose da Silva";
creditcard.CardNumber = "5433229077370451";
creditcard.CardExpirationDate = "1016";
creditcard.CardCvv = "018";

var transaction = pagarme.PostTransaction(new TransactionSetup
{
	Amount = 10.99m,
	PaymentMethod = PaymentMethod.CreditCard,
	CardHash = pagarme.GenerateCardHash(creditcard)
});
</code></pre>

### Cancelando uma transação

Após a transação ser realizada com sucesso, ela terá o status `TransactionStatus.Paid`, como já foi visto:

Caso você deseja cancelar a transação, estornando o valor pago pelo cliente:

<pre><code data-language="csharp">transaction.Refund();</code></pre>

Se a transação for cancelada com sucesso, seu status mudará para `TransactionStatus.Refunded`, indicando que ela foi cancelada com sucesso.

### Buscando uma transação, subscription, customer ou plan

As transações podem ser buscadas atráves do LINQ, usando qualquer critério disponível.

#### Pesquisa por ID:

<pre><code data-language="csharp">var transaction = pagarme.Transactions.Find(18305);</code></pre>

#### Pesquisa por LINQ:

<pre><code data-language="csharp">var transactions = from t in pagarme.Transactions where t.Amount > 1000 select t;</code></pre>

<pre><code data-language="csharp">var transactions = pagarme.Transactions.First(t => t.PaymentMethod == PaymentMethod.Boleto);</code></pre>

Note que o suporte a condições ainda é pequeno e apenas os operadores `==`, `>`, `>=`, `<` e `<=` estão disponíveis.

### Boletos

Para realizar uma transação com boleto, pasta setar o PaymentType para PaymentType.Boleto...

<pre><code data-language="csharp">TransactionSetup transactionData = new TransactionSetup
{
	Amount = 1000,
	PaymentMethod = PaymentMethod.Boleto
};

Transaction transaction = pagarme.PostTransaction(transactionData);
</code></pre>

A URL do boleto estara disponível em transaction.BoletoUrl

## Antifraude (opcional)

O Pagar.me recomenda fortemente o uso de antifraude. Para começar a utilizar o antifraude basta acessar o dashboard e ativá-lo. Para mais informações, visite o [guia sobre utilização do antifraude](/docs/guides/antifraud).

Quando o antifraude está ativado, é necessário fornecer os dados do cliente que está realizando a transação para que a análise de fraude possa ser realizada:

<pre>
<code data-language="csharp">var transaction = pagarme.PostTransaction(new TransactionSetup
{
	Amount = 1975.50m,
	PaymentMethod = PaymentMethod.CreditCard,
	CardNumber = "4901720080344448",
	CardHolderName = "Jose da Silva",
	CardExpirationDate = "1215",
	CardCvv = "314",
	Installments = 6, // Número de parcelas - OPCIONAL
	Customer = new Customer
	{
		Name = "José",
		DocumentNumber = "51472745531",
		Email = "josedasilva@pagar.me",
		Sex = CustumerSex.Male,
		BornAt = new DateTime(1969, 07, 20),
		Addresses =
		{
			new CustomerAddress
			{
				Street = "Av. Brigadeiro Faria Lima",
				Number = "2941",
				Complementary = "5 andar",
				Neighborhood = "Itaim Bibi",
				ZipCode = "01452000"
			}
		},
		Phones =
		{
			new CustomerPhone
			{
				Ddd = 11,
				Number = 981836482
			}
		}
	}
});
</code>
</pre>

## Customers (Clientes)

Caso os dados do cliente sejam fornecidos ao realizar uma transação, o Pagar.me se encarregará de criar um cliente (`customer`) automaticamente para você. Para acessar o cliente de uma transação:

Para acessar os dados do customer, basta usar a propriedade `Customer` de uma transação.

Você também pode pesquisar todos seus customers através do `pagarme.Customers` via LINQ.

## Planos/Assinaturas


### Planos
Um plano é um valor a ser cobrado periódicamente, ou seja a cada X dias será cobrado automaticamente um valor fixo do cartão de credito daquele cliente.

#### Criando Planos
Um plano pode ser criado pelo nosso [Dashboard](https://dashboard.pagar.me) ou pela nossa API. Para criar com a nossa API basta executar o seguinte código:

<pre>
<code data-language="csharp">Plan plan = new Plan(pagarme);
plan.Name = "Plano Basico"; // Nome do plano
plan.Amount = 29.99m; // Valor do plano em reais
plan.Days = 30; // De quantos em quantos dias o cliente será cobrado
plan.TrialDays = 5; // Dias para o cliente testar o plano antes de ser cobrado
plan.Color = "#FF88FF"; // Cor do plano nos gráficos da Dashboard
plan.Save();
</code>
</pre>

Após isso guarde o `plan.Id` para uso futuro.

### Assinaturas
Assinaturas representam clientes. Uma assinatura PODE OU NÃO ter um plano. 

#### Criando uma assinatura dentro de um plano
Se você já tem um plano e quer adicionar um cliente a esse plano basta executar esse código:
<pre>
<code data-language="php">CreditCard creditcard = new CreditCard();
creditcard.CardholderName = "Jose da Silva";
creditcard.CardNumber = "5433229077370451";
creditcard.CardExpirationDate = "1016";
creditcard.CardCvv = "018";

Subscription subscription = pagarme.PostSubscription(new SubscriptionSetup
{
	PaymentMethod = PaymentMethod.CreditCard,
	CardHash = pagarme.GenerateCardHash(creditcard),
	Plan = 3, // ID do plano no qual esse cliente vai assinar
	CustomerEmail =  "josedasilva@pagar.me" // Email do cliente
});
</code>
</pre>

Com esse código o cliente será cobrado periodicamente.

#### Criando uma assinatura sem um plano / One-click buy

Para fazer o one-click buy ou uma transação recorrente variável basta criar uma assinatura e cobrar ela quando achar devido.

<pre>
<code data-language="php">CreditCard creditcard = new CreditCard();
creditcard.CardholderName = "Jose da Silva";
creditcard.CardNumber = "5433229077370451";
creditcard.CardExpirationDate = "1016";
creditcard.CardCvv = "018";

Subscription subscription = pagarme.PostSubscription(new SubscriptionSetup
{
	PaymentMethod = PaymentMethod.CreditCard,
	CardHash = pagarme.GenerateCardHash(creditcard),
	CustomerEmail =  "josedasilva@pagar.me" // Email do cliente
});

subscription.Charge(10.99m); // Cobra em reais o cartão do cliente
</code>
</pre>

### Tratando erros ao realizar uma operação na API

Caso um dos parâmetros seja inválido ao realizar uma transação, a biblioteca irá disparar uma PagarMeException contendo informações sobre o erro

#### Lista de mensagens de erro

Essas são algumas das mensagens de erro possíveis. Mas não são as únicas.

-  `Número do cartão inválido.`

- `Nome do portador do cartão inválido.`

- `Nome do portador do cartão inválido`

- `Mês de expiração do cartão inválido`

- `Ano de expiração do cartão inválido`

- `Cartão expirado`

- `Código de segurança inválido`

- `Faltam informações do cliente`
