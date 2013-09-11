---
title: Guia de integração em PHP
---

# Guia de integração em PHP

Para iniciar sua integração backend vamos seguir 3 passos:

## Passo 1 - Instalação

### Baixando a biblioteca 

Para baixar a biblioteca execute esse comando para fazer um clone dela

	git clone https://github.com/PagarMe/pagarme-php.git	

Ou caso não tenha git instalado, baixe-a clickando neste [https://github.com/pagarme/pagarme-php/archive/master.zip
](https://github.com/pagarme/pagarme-php/archive/master.zip)

Após baixar a biblioteca, copie-a para a pasta do seu projeto

### Utilizando a biblioteca

#### Importando...

Antes de iniciar, é necessário incluir a biblioteca no seu código:

<pre><code data-language="php">require("pagarme-php/Pagarme.php");</code></pre>

#### Configurando a chave de API

Para usar a biblioteca, é necessário configurá-la com a chave de API disponível em seu [dashboard](http://dashboard.pagar.me/):

<pre><code data-language="php">Pagarme::setApiKey("Jy1V5bJcGf8q4gHepttt"); // Insira sua chave de API </code> </pre> 

## Passo 2 - Fazendo a primeira transação

### Realizando uma transação

Para realizar uma transação simples...

<pre><code data-language="php">$transaction = new PagarMe_Transaction();
$transaction->setAmount(1000); // Valor em centavos - 1000 = R$ 10,00
$transaction->setPaymentMethod("credit_card"); // Meio de pagamento 
$transaction->setCardNumber("4901720080344448"); // Número do cartão
$transaction->setCardHolderName("Jose da Silva"); // Nome do proprietário do cartão
$transaction->setCardExpiracyMonth("10"); //Mes da data de expiração
$transaction->setCardExpiracyYear("15"); // Ano da data de expiração
$transaction->setCardCvv("314"); // Código de segurança

$transaction->charge();
</code></pre>

Você também pode inicializar o objeto de transação com um array:

<pre><code data-language="php">$transaction = new PagarMe_Transaction(array(
	"amount" => "1000", // Valor em centavos - 1000 = R$ 10,00
	"payment_method" => "credit_card", // Meio de pagamento
    "card_number" => "4901720080344448", // Número do cartão
    "card_holder_name" => "Jose da Silva", // Nome do proprietário do cartão
    "card_expiracy_month" => "10", // Mês de expiração do cartão
    "card_expiracy_year" => "15", // Ano de expiração do cartão
    "card_cvv" => "314" // Código de segurança
));

$transaction->charge(); // Cobre! 
</code></pre>

... ou com um `card_hash` que foi recebido do browser do cliente:

<pre><code data-language="php">$transaction = new PagarMe_Transaction("5169d12b3da665f36e00000a_FFtwikzg/FC1mH7XLFU5fjPAzDsP0ogeAQh3qXRpHzkIrgDz64lITBUGwio67zm2CQXwbKRjGdRi5J1xFNpQLWnxQsUJAQELcTSGaGtF6RGSu6sq1stp8OLRSNG7wp+xGe8poqxw4S1gOL5JYO7XZp/Uz7rTpKXh3IcRshmX36hh66J6+7l5j0803cGIfMZu3T7nbMjQYIf+yLi8r0O6vL9DQPmqSZ9FBerqFGxWHrxScneaaMVzMpNX/5eneqveVBt88RccytyJG5+HYRHcRyKIbLfmX48L/C22HJeAm3PyzehGHdOmDcsxPtVB+Fgq7SDuB4tHWBT8j6wihOO7ww==");

$transaction->setAmount(3000); // Valor da transação em centavos 3000 - R$ 30,00
$transaction->charge();
</code></pre>

Independente da forma com que a transação foi realizada, se não ocorreu nenhum erro, a transação passará a ter status "paid", ou seja, estará paga:

<pre><code data-language="php">echo $transaction->getStatus();
 => "paid"
</code></pre>

Lembre-se que transações via cartão de crédito normalmente são aprovadas rapidamente, porém para boletos é necessário configurar uma URL de postback. Veja mais na seção de [postback](#postback)


### Tratando erros ao realizar uma transação

Caso um dos parâmetros seja inválido ao realizar uma transação, a biblioteca irá dar `throw` em um erro do tipo `PagarMe_Exception`:

<pre><code data-language="php">$transaction = new PagarMe_Transaction(array(
    "card_number" => "4901720080344448",
    "card_holder_name" => "Jose da Silva",
    "card_expiracy_month" => "13",
    "card_expiracy_year" => "15",
    "card_cvv" => "314"
));

$transaction->charge();
</code></pre>

Resultado:

<pre><code data-language="php">Fatal error: Uncaught exception 'PagarMe_Exception' with message 'Invalid expiracy month.' in /Users/henriquedubugras/Sites/Pagarme/Transaction.php:91 Stack trace: #0 /Users/henriquedubugras/Sites/test-rest.php(9): PagarMe_Transaction->charge()
</code></pre>

Para tratar erros desse tipo, você pode inserir um `try` `catch` no código acima para tratar erros do PagarMe (`PagarMeError`):

<pre><code data-language="php">$transaction = new PagarMe_Transaction(array(
    "card_number" => "4901720080344448",
    "card_holder_name" => "Jose da Silva",
    "card_expiracy_month" => "13",
    "card_expiracy_year" => "15",
    "card_cvv" => "314"
));

try {
    $transaction->charge();
} catch(PagarMe_Exception $e) {
    echo $e->getMessage();
}
</code></pre>

Dessa vez, o resultado será:

<pre><code data-language="php">Invalid expiracy date month.</code></pre>

O erro foi "resgatado" pelo `catch`. É nesse ponto onde o tratamento de erro específico deve ser feito (e respondido para o cliente).

### Cancelando uma transação

Após a transação ser realizada com sucesso, ela terá o status `paid`, como já foi visto:

<pre><code data-language="php">$transaction->getStatus();
 => "paid"
</code></pre>

Caso você deseja cancelar a transação, estornando o valor pago pelo cliente:

<pre><code data-language="php">$transaction->refund();
 => "517035290039fc26d9000024" # o id da transação é retornado
> $transaction->getStatus();
 => "chargebacked"
</code></pre>

Se a transação for cancelada com sucesso, seu status mudará para "refunded", indicando que ela foi cancelada com sucesso.

### Buscando uma transação pelo `id`

Consultar os dados de uma transação já realizada é possível com o seu `id`, que é retornado ao realizá-la:

<pre><code data-language="php">> $transaction = PagarMe_Transaction::findById("517035290039fc26d9000024");
</code></pre>

## Passo 3 - Postback
Quando um boleto for emitido nosso sistema vai criar uma transação com o status `waiting_payment`. Para você saber quando o boleto foi pago você precisa configurar uma URL de Postback. O que é isso? É uma URL que nosso servidor irá chamar quando o boleto for pago para te avisar que ele foi pago. 

### Passando a URL de postback
Para isso o primeiro passo é passar essa URL que será chamada. Para fazer isso basta acrescentar o `postback_url` a transação, assim:
<pre>
<code data-language="php">
$transaction = new PagarMe_Transaction(array(
	"payment_method" => "boleto",
	"amount" => 1000,
	"postback_url" => "https://seusite.com/transactions_postback.php"
)); 
</code>
</pre>

### Recebendo o postback
Após a transação ser aprovada ou recusada nosso servidor irá chamar a URL que você passou, então vamos para o código da transactions_postback.php

<pre>
<code data-language="php">
	//transactions_postback.php
	$postback = new PagarMe_Postback(); // Carrega os dados do postback
	$id = $postback->getId(); // Pega o ID da transação
	if(postback->worked()) { // SE funcionou a sua requisição, ou seja foi aprovada/reprovada com sucesso
		if($postback->getCurrentStatus() == 'paid') {
			// Enviar produto para o cliente	
		} elseif($postback->getCurrentStatus() == 'refunded')  {
			// Avisar cliente que a transação dele foi cancelada
		}
	}
</code>
</pre>

AVISO: Se você usa um framework que trata os parâmetros $_GET diferente do padrão, você precisará implementar o postback manualmente. Para isso acesse nosso guia sobre [Postback URLS](/docs/restful-api/postback-urls)

## Planos/Assinaturas
Essa seção vai te ensinar como criar e gerenciar transações recorrentes e one-click buy.

### Planos
Um plano é um valor a ser cobrado periódicamente, ou seja a cada X dias será cobrado automaticamente um valor fixo do cartão de credito daquele cliente.

#### Criando Planos
Um plano pode ser criado pelo nosso [Dashboard](https://dashboard.pagar.me) ou pela nossa API. Para criar com a nossa API basta executar o seguinte código:

<pre>
<code data-language="php">
$plan = new PagarMe_Plan(array(
	"amount" => 3000, // Valor do plano em centavos
	"trial_days" => 5, // Dias para o cliente testar o plano antes de ser cobrado
	"days" => 30, //De quantos em quantos dias o cliente será cobrado
	"name" => "Plano Basico", //Nome do plano
));

$plan->create(); // Cria o plano!
// Assim que você criar o plano, guarde o ID dele em algum lugar pois você o usará mais tarde
guardar_no_banco_de_dados($plan->getId());
</code>
</pre>

### Assinaturas
Assinaturas representam clientes. Uma assinatura PODE OU NÃO ter um plano. 

#### Criando uma assinatura dentro de um plano
Se você já tem um plano e quer adicionar um cliente a esse plano basta executar esse código:
<pre>
<code data-language="php">
$subscription = new PagarMe_Subscription(array(
		'plan_id' => '3', // ID do plano no qual esse cliente vai assinar
		'customer_email' => "customer@pagar.me", // Email do cliente
		'payment_method' => "credit_card", "Meio de cobrança - Cartão de crédito ou boleto"
		'postback_url' => 'http://testepagarme.com', // URL de Postback. Você será notificado toda vez que um cliente for cobrado.
		'card_number' => '4111111111111111', // Número do cartão do cliente
		'card_holder_name' => "Jose da Silva", // Nome do cliente
		'card_expiracy_month' => "12", // Mês de expiração do cartã
		'card_expiracy_year' => '15', // Ano de expiração do cartão
		'card_cvv' => "123" // Cvv
));

$subscription->create();
</code>
</pre>

Com esse código o cliente será cobrado periodicamente.

#### Criando uma assinatura sem um plano / One-click buy
Para fazer o one-click buy ou uma transação recorrente variável basta criar uma assinatura e cobrar ela quando achar devido.
<pre>
<code data-language="php">
$subscription = new PagarMe_Subscription(array(
		'customer_email' => "customer@pagar.me", // Email do cliente
		'payment_method' => "credit_card", "Meio de cobrança - Cartão de crédito ou boleto"
		'postback_url' => 'http://testepagarme.com', // URL de Postback. Você será notificado toda vez que um cliente for cobrado.
		'card_number' => '4111111111111111', // Número do cartão do cliente
		'card_holder_name' => "Jose da Silva", // Nome do cliente
		'card_expiracy_month' => "12", // Mês de expiração do cartã
		'card_expiracy_year' => '15', // Ano de expiração do cartão
		'card_cvv' => "123" // Cvv
));
$subscription->create();
$subscription->charge(1000); //Cobra em centavos o cartão do cliente - 1000 = R$ 10,00
</code>
</pre>








