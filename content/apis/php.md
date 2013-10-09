---
title: Guia de integração em PHP
---

# Guia de integração em PHP

## Passo 1 - Instalação

### Baixando a biblioteca 

Para baixar a biblioteca, faça um `clone` usando o `git`:

	git clone https://github.com/PagarMe/pagarme-php.git	

Ou caso não tenha o `git` instalado, baixe-a [clicando aqui](https://github.com/pagarme/pagarme-php/archive/master.zip).

Após baixar a biblioteca, copie-a para a pasta do seu projeto.

### Utilizando a biblioteca

#### Importando...

Antes de iniciar, é necessário incluir a biblioteca no seu código:

<pre><code data-language="php">require("pagarme-php/Pagarme.php");</code></pre>

#### Configurando a chave de API

Para usar a biblioteca, é necessário configurá-la com a chave de API disponível em seu [dashboard](http://dashboard.pagar.me/):

<pre><code data-language="php">Pagarme::setApiKey("ak_live_abxA6CDv9yYqlt7ZPmxut9D5qvo0xh"); // Insira sua chave de API </code> </pre> 

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
$transaction->setInstallments(6); // Número de parcelas - OPCIONAL

$transaction->charge();

if($transaction->getStatus() == 'paid') {
	//Transação foi aprovada
} else if($transaction->getStatus() == 'refuse') {
	//Transação foi recusada
	// $transaction->getRefuseReason() - mostra por que a transação foi recusada
}
</code></pre>

Você também pode inicializar o objeto de transação com um array:

<pre><code data-language="php">$transaction = new PagarMe_Transaction(array(
    "amount" => "1000", // Valor em centavos - 1000 = R$ 10,00
    "payment_method" => "credit_card", // Meio de pagamento
    "card_number" => "4901720080344448", // Número do cartão
    "card_holder_name" => "Jose da Silva", // Nome do proprietário do cartão
    "card_expiracy_month" => "10", // Mês de expiração do cartão
    "card_expiracy_year" => "15", // Ano de expiração do cartão
    "card_cvv" => "314", // Código de segurança
	"installments" => 6 // Numero de parcelas - OPCIONAL
));

$transaction->charge(); // Cobre! 

if($transaction->getStatus() == 'paid') {
	//Transação foi aprovada
} else if($transaction->getStatus() == 'refuse') {
	//Transação foi recusada
	// $transaction->getRefuseReason() - mostra por que a transação foi recusada
}
</code></pre>

... ou com um `card_hash` que foi recebido do browser do cliente:

<pre><code data-language="php">$transaction = new PagarMe_Transaction("5169d12b3da665f36e00000a_FFtwikzg/FC1mH7XLFU5fjPAzDsP0ogeAQh3qXRpHzkIrgDz64lITBUGwio67zm2CQXwbKRjGdRi5J1xFNpQLWnxQsUJAQELcTSGaGtF6RGSu6sq1stp8OLRSNG7wp+xGe8poqxw4S1gOL5JYO7XZp/Uz7rTpKXh3IcRshmX36hh66J6+7l5j0803cGIfMZu3T7nbMjQYIf+yLi8r0O6vL9DQPmqSZ9FBerqFGxWHrxScneaaMVzMpNX/5eneqveVBt88RccytyJG5+HYRHcRyKIbLfmX48L/C22HJeAm3PyzehGHdOmDcsxPtVB+Fgq7SDuB4tHWBT8j6wihOO7ww==");

$transaction->setAmount(3000); // Valor da transação em centavos 3000 - R$ 30,00
$transaction->setInstallments(6); // Número de parcelas - OPCIONAL
$transaction->charge();

if($transaction->getStatus() == 'paid') {
	//Transação foi aprovada
} else if($transaction->getStatus() == 'refuse') {
	//Transação foi recusada
	// $transaction->getRefuseReason() - mostra por que a transação foi recusada
}
</code></pre>

Independente da forma com que a transação foi realizada, se não ocorreu nenhum erro, a transação passará a ter status "paid", ou seja, estará paga:

<pre><code data-language="php">echo $transaction->getStatus();
 => "paid"
</code></pre>

Lembre-se que transações via cartão de crédito normalmente são aprovadas rapidamente, porém para boletos é recomendado configurar uma URL de postback. Veja mais na seção de [postback](#postback)

### Boletos
Para realizar uma transação com boleto...

<pre><code data-language="php">
$transaction = new PagarMe_Transaction(array(
	'payment_method' => 'boleto',
	'amount' => 1000, // 1000 = R$ 10,00
	'postback_url' => 'http://seusite.com/postback.php'
));
</code>
</pre>
Lembre-se de ler a seção de [postback](#postback) ser notificado quando o boleto foi pago.

### Tratando erros ao realizar uma transação

Caso um dos parâmetros seja inválido ao realizar uma transação, a biblioteca irá dar `throw` em um erro do tipo `PagarMe_Exception`:

<pre><code data-language="php">$transaction = new PagarMe_Transaction(array(
    "card_number" => "4901720080344448",
    "card_holder_name" => "Jose da Silva",
    "card_expiracy_month" => "13",
    "card_expiracy_year" => "15",
    "card_cvv" => "314",
	"installments" => 6, // Número de parcelas - OPCIONAL
));

$transaction->charge();

if($transaction->getStatus() == 'paid') {
	//Transação foi aprovada
} else if($transaction->getStatus() == 'refuse') {
	//Transação foi recusada
	// $transaction->getRefuseReason() - mostra por que a transação foi recusada
}
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
	if($transaction->getStatus() == 'paid') {
		//Transação foi aprovada
	} else if($transaction->getStatus() == 'refuse') {
		//Transação foi recusada
		// $transaction->getRefuseReason() - mostra por que a transação foi recusada
	}

} catch(PagarMe_Exception $e) {
	echo $e->getMessage();
}
</code></pre>

Dessa vez, o resultado será:

<pre><code data-language="php">Invalid expiracy date month.</code></pre>

O erro foi "resgatado" pelo `catch`. É nesse ponto onde o tratamento de erro específico deve ser feito (e respondido para o cliente).


#### Lista de mensagens de erro

-  `Número do cartão inválido.`

- `Nome do portador do cartão inválido.`

- `Nome do portador do cartão inválido`

- `Mês de expiração do cartão inválido`

- `Ano de expiração do cartão inválido`

- `Cartão expirado`

- `Código de segurança inválido`

- `Faltam informações do cliente`


### Cancelando uma transação

Após a transação ser realizada com sucesso, ela terá o status `paid`, como já foi visto:

<pre><code data-language="php">$transaction->getStatus();
 => "paid"
</code></pre>

Caso você deseja cancelar a transação, estornando o valor pago pelo cliente:

<pre><code data-language="php">$transaction->refund();
 => "1654" # o id da transação é retornado
> $transaction->getStatus();
 => "chargebacked"
</code></pre>

Se a transação for cancelada com sucesso, seu status mudará para "refunded", indicando que ela foi cancelada com sucesso.

### Buscando uma transação pelo `id`

Consultar os dados de uma transação já realizada é possível com o seu `id`, que é retornado ao realizá-la:

<pre><code data-language="php">> $transaction = PagarMe_Transaction::findById("1654");
</code></pre>

## Passo 3 - Postback {#postback}
Quando um boleto for emitido, a transação será criada com o status `waiting_payment`. Para saber quando o boleto foi pago, é recomendado que se configure uma URL de Postback. O Pagar.me usará essa URL para notificar o seu servidor sobre mudanças de status da transação, inclusive quando o boleto foi pago. A URL de postback também é recomendada quando o antifraude está ligado.

### Configurando a URL de postback
Para configurar a URL de POSTback, basta acrescentar o parâmetro `postback_url` à transação:

<pre><code data-language="php">$transaction = new PagarMe_Transaction(array(
    "payment_method" => "boleto",
    "amount" => 1000,
    "postback_url" => "https://seusite.com/transactions_postback.php"
)); 
</code></pre>

### Recebendo o POSTback
Quando a transação mudar de `status`, o Pagar.me irá fazer uma requisição a URL definida. O código da página PHP definida como URL de POSTback é:

<pre>
<code data-language="php">
$id = $_GET['id'];
$current_status = $_GET['current_status'];
$old_status = $_GET['old_status'];
$fingerprint = $_GET['fingerprint'];

if(PagarMe::validateFingerprint($id, $fingerprint)) {
	if($current_status == 'paid') {
		//Pago...
	} else {
		// Não funcionou...
	}
}
</code>
</pre>

Para saber mais sobre cada `status`, visite a sessão de status nas [ referências de transações ]( /docs/restful-api/transactions/index.html#transactions-status )

## Passo 4 - Antifraude (opcional)

O Pagar.me recomenda fortemente o uso de antifraude. Para começar a utilizar o antifraude basta acessar o dashboard e ativá-lo. Para mais informações, visite o [guia sobre utilização do antifraude](/docs/guides/antifraud).

Quando o antifraude está ativado, é necessário fornecer os dados do cliente que está realizando a transação para que a análise de fraude possa ser realizada:

<pre>
<code data-language="php">$transaction = new PagarMe_Transaction(array(
    'amount' => 70000,
    'card_number' => '4901720080344448', 
    'card_holder_name' => "Jose da silva", 
    'card_expiracy_month' => 11, 
    'card_expiracy_year' => "13", 
    'card_cvv' => 356, 
    'customer' => array(
        'name' => "Jose da Silva",  
        'document_number' => "36433809847", 
        'email' => "henrique@pagar.me", 
        'address' => array(
            'street' => 'Av. Brigadeiro Faria Lima', 
            'neighborhood' => 'Itaim bibi',
            'zipcode' => '01452000', 
            'street_number' => 2941, 
        ),
        'phone' => array(
            'ddd' => 12, 
            'number' => '981433533', 
        ),
    'sex' => 'M', 
    'born_at' => '1970-10-11')
));

$transaction->charge();
</code>
</pre>

## Customers (Clientes)

Caso os dados do cliente sejam fornecidos ao realizar uma transação, o Pagar.me se encarregará de criar um cliente (`customer`) automaticamente para você. Para acessar o cliente de uma transação:

<pre>
<code data-language="php">$customer = $transaction->getCustomer(); // Cliente
$customer->getName(); // Nome do cliente
$customer->getAddresses(); // Array com os endereços dos clientes
$customer->getPhones(); // Array com os telefones do cliente
$customer->getDocumentNumber(); // CPF/CNPJ do cliente
</code>
</pre>

Para uma lista completa de todas as informações de um customer clique aqui. Não se esqueça que para utilizar o antifraude também é necessária uma alteração no frontend. Basta adicionar esse método na sua página de checkout:

## Planos/Assinaturas

### Planos
Um plano é um valor a ser cobrado periódicamente, ou seja a cada X dias será cobrado automaticamente um valor fixo do cartão de credito daquele cliente.

#### Criando Planos
Um plano pode ser criado pelo nosso [Dashboard](https://dashboard.pagar.me) ou pela nossa API. Para criar com a nossa API basta executar o seguinte código:

<pre>
<code data-language="php">$plan = new PagarMe_Plan(array(
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
<code data-language="php">$subscription = new PagarMe_Subscription(array(
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
<code data-language="php">$subscription = new PagarMe_Subscription(array(
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








