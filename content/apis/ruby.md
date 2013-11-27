---
title: Guia de integração em Ruby
---

# Guia de integração em Ruby

## Passo 1 - Instalação

### Instalando a gem

A biblioteca em Ruby do Pagar.me está disponível em uma *gem*. Para instalá-la,

	$ gem install pagarme

### Utilizando a biblioteca

#### Importando...

Antes de iniciar, é necessário incluir a biblioteca no seu código:

<pre><code data-language="ruby">require "pagarme"</code></pre>

#### Configurando a chave de API

Para usar a biblioteca, é necessário configurá-la com a chave de API disponível em seu [dashboard](http://dashboard.pagar.me/).

<pre><code data-language="ruby">PagarMe.api_key = "Jy1V5bJcGf8q4gHepttt"</code></pre>

## Passo 2 - Fazendo a primeira transação

<strong> Se você não tiver um SSL instalado no seu servidor, utilize a nossa biblioteca de [javascript](http://pagar.me/docs/apis/javascript/) e inicialize uma transação com [card_hash](#card_hash) </strong>


### Realizando uma transação
Para realizar uma transação simples...

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new
transaction.card_number = "4901720080344448" # Número do cartão
transaction.card_holder_name = "Jose da Silva" #Nome do portador do cartão
transaction.card_expiration_month = "10" # Mes da data de expiração
transaction.card_expiration_year = "15" # Ano da data de expiração
transaction.card_cvv = "314" # Codigo de segurança
transaction.amount = 1000 # Valor em centavos - 1000 = R$ 10,00
transaction.installments = 6 # Numero de parcelas - OPCIONAL

transaction.charge

if transaction.status == 'paid'
	# Transação aprovada
elsif transaction.status == 'refused'
	#Transação recusada
	# transaction.refuse_reason mostra por que a transação foi recusada
end
</code></pre>

Você também pode inicializar o objeto de transação com um hash:

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new({
    :card_number => "4901720080344448", # Número do cartão
    :card_holder_name => "Jose da Silva", #Nome do portador do cartão
    :card_expiration_month => "10", # Mês da data de expiração
    :card_expiration_year => "15",  # Ano da data de expiração
    :card_cvv => "314", # Código de segurança
    :amount => 1000, # Valor em centavos - 1000 = R$ 10,00
    :installments => 6 # Número de parcelas - OPCIONAL
})

transaction.charge

if transaction.status == 'paid'
	# Transação aprovada
elsif transaction.status == 'refused'
	#Transação recusada
	# transaction.refuse_reason mostra por que a transação foi recusada
end
</code></pre>

### Realizando uma transação sem SSL {#card_hash}
... ou com um `card_hash` que foi recebido do browser do cliente:

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new({
:card_hash => 
"5169d12b3da665f36e00000a_FFtwikzg/FC1mH7XLFU5fjPAzDsP0ogeAQh3qXRpHzkIrgDz64lITBUGwio67zm2CQXwbKRjGdRi5J1xFNpQLWnxQsUJAQELcTSGaGtF6RGSu6sq1stp8OLRSNG7wp+xGe8poqxw4S1gOL5JYO7XZp/Uz7rTpKXh3IcRshmX36hh66J6+7l5j0803cGIfMZu3T7nbMjQYIf+yLi8r0O6vL9DQPmqSZ9FBerqFGxWHrxScneaaMVzMpNX/5eneqveVBt88RccytyJG5+HYRHcRyKIbLfmX48L/C22HJeAm3PyzehGHdOmDcsxPtVB+Fgq7SDuB4tHWBT8j6wihOO7ww=="
})

transaction.amount = 1000 # Valor em centavos - 1000 = R$ 10.00
transaction.charge
</code></pre>

<strong> Se você não tiver um SSL instalado no seu servidor, utilize a nossa biblioteca de [javascript](http://pagar.me/docs/apis/javascript/) e inicialize uma transação com card_hash </strong>

Independente da forma com que a transação foi realizada, se não ocorreu nenhum erro, a transação passará a ter status `:paid`, ou seja, estará aprovada:

<pre><code data-language="ruby">> transaction.status
 => :paid
</code></pre>

Lembre-se que transações via cartão de crédito normalmente são aprovadas rapidamente, porém para boletos é recomendado configurar uma URL de postback. Veja mais na seção de [postback](#postback)

### Boletos
Para realizar uma transação com boleto...

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new({
:payment_method => 'boleto', # Forma de pagemtno 'boleto' ou 'credit_card'
:amount => 1000, # Valor em centavos - 1000 = R$ 10.00
:postback_url => 'http://seusite.com/postback' # URL de postback
})
transaction.charge

transaction.boleto_url # Retorna a URL do boleto gerado. PS: Em modo TESTE retorna SEMPRE `null`
</code>
</pre>

Lembre-se de ler a seção de [postback](#postback) ser notificado quando o boleto foi pago.

### Tratando erros ao realizar uma transação

Caso um dos parâmetros seja inválido ao realizar uma transação, a biblioteca irá dar `throw` em um erro do tipo `PagarMeError`:

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new
transaction.card_number = "4901720080344448"
transaction.card_holder_name = "Jose da Silva"
transaction.card_expiration_month = "13" # o mês 13 é maior do que 12 (dezembro) -> parâmetro inválido!
transaction.card_expiration_year = "15"
transaction.card_cvv = "314"
transaction.amount = 1000

transaction.charge
</code></pre>

Resultado:

<pre><code data-language="ruby">PagarMe::PagarMeError PagarMe::PagarMeError - Invalid expiration date month.
	from /Users/pedrofranceschi/.rvm/gems/ruby-1.9.3-p0/gems/pagarme-0.11/lib/pagarme/transaction.rb:80:in `charge'
	from (irb):13
	from /Users/pedrofranceschi/.rvm/rubies/ruby-1.9.3-p0/bin/irb:16:in `main'
</code></pre>

Para tratar erros desse tipo, você pode inserir um `begin` `rescue` no código acima para tratar erros do Pagar.me (`PagarMeError`):

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new
transaction.card_number = "4901720080344448"
transaction.card_holder_name = "Jose da Silva"
transaction.card_expiration_month = "13" # o mês 13 é maior do que 12 (dezembro) -> parâmetro inválido!
transaction.card_expiration_year = "15"
transaction.card_cvv = "314"
transaction.amount = 1000

begin
    transaction.charge
rescue PagarMe::PagarMeError => e
    puts "Erro na transação: #{e.message}"
end
</code></pre>

Dessa vez, o resultado será:

<pre><code data-language="ruby">Erro na transação: PagarMe::TransactionError - Invalid expiration date month.</code></pre>

O erro foi "resgatado" pelo `rescue`. É nesse ponto onde o tratamento de erro específico deve ser feito (e respondido para o cliente).

Caso deseje fazer uma validação mais avançada disponibilizamos mais detalhes sobre o erro no objeto `errors` da Exception...
<pre><code data-language="ruby"> begin
	transaction.charge
rescue PagarMe::PagarMeError => e
	e.message # Mensagens de erro concatenadas
	errors = e.errors
	error = errors.first
	error.message # Mensagem do primeiro erro. Ex: Número do cartão inválido
	error.type #Tipo de erro - invalid_parameter, internal_error, action_forbidden
	error.parameter_name # Parâmetro do erro. Ex: 'card_number', 'card_holder_name', etc
end
</code>
</pre>


### Cancelando uma transação

Após a transação ser realizada com sucesso, ela terá o status `:paid`, como já foi visto:

<pre><code data-language="ruby">> transaction.status
 => :paid
</code></pre>

Caso você deseja cancelar a transação, estornando o valor pago pelo cliente:

<pre><code data-language="ruby">> transaction.refund
 => "517035290039fc26d9000024" # o id da transação é retornado
> transaction.status
 => :refunded
</code></pre>

Se a transação for cancelada com sucesso, seu status mudará para `:refunded`, indicando que ela foi cancelada com sucesso.

### Buscando uma transação pelo `id`

Consultar os dados de uma transação já realizada é possível com o seu `id`, que é retornado ao realizá-la:

<pre><code data-language="ruby">> transaction = PagarMe::Transaction.find_by_id("517035290039fc26d9000024")
 => #<PagarMe::Transaction:0x007fa071371ef0 @statuses_codes={:local=>0, :paid=>1, :processing=>2, :refused=>3, :chargebacked=>4}, @date_created="2013-04-18T18:02:17.540Z", @id="517035290039fc26d9000024", @status=4, @live=true, @installments=1, @card_cvv="", @card_expiration_year="", @card_expiration_month="", @card_holder_name="Jose da Silva", @card_number="", @amount="1000">
> transaction.id
 => "517035290039fc26d9000024"
> transaction.status
 => :chargebacked
</code></pre>

### Buscando as últimas transações realizadas

Para buscar as últimas transações realizadas em sua conta:

<pre><code data-language="ruby">> transactions = PagarMe::Transaction.all
> transactions.length
 => 10
> transactions[0]
 => #<PagarMe::Transaction:0x007fa0712bcfc8 @statuses_codes={:local=>0, :paid=>1, :processing=>2, :refused=>3, :chargebacked=>4}, @date_created="2013-04-18T18:02:17.540Z", @id="517035290039fc26d9000024", @status=4, @live=true, @installments=1, @card_cvv="", @card_expiration_year="", @card_expiration_month="", @card_holder_name="Jose da Silva", @card_number="", @amount="1000">
</code></pre>

Também é possível especificar a página do resultado desejada, assim como o número de transações retornadas por página:

<pre><code data-language="ruby">> transactions = PagarMe::Transaction.all(3, 5) # página 3, com 5 transações por página
> transactions.length
 => 5
> transactions[0]
 => #<PagarMe::Transaction:0x007fa071252f38 @statuses_codes={:local=>0, :paid=>1, :processing=>2, :refused=>3, :chargebacked=>4}, @date_created="2013-04-16T02:39:03.412Z", @id="516cb9c70039fc26d9000010", @status=1, @live=true, @installments=5, @card_cvv="", @card_expiration_year="", @card_expiration_month="", @card_holder_name="Test User", @card_number="", @amount="10000">
</code></pre>

## Passo 3 - Postback {#postback}
Quando um boleto for emitido, a transação será criada com o status `:waiting_payment`. Para saber quando o boleto foi pago, é recomendado que se configure uma URL de Postback. O Pagar.me usará essa URL para notificar o seu servidor sobre mudanças de status da transação, inclusive quando o boleto foi pago. A URL de postback também é recomendada quando o antifraude está ligado.

### Configurando a URL de postback
Para configurar a URL de POSTback, basta acrescentar o parâmetro `postback_url` à transação:

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new
transaction.card_number = "4901720080344448" # Número do cartão
transaction.card_holder_name = "Jose da Silva" #Nome do portador do cartão
transaction.card_expiration_month = "10" # Mes da data de expiração
transaction.card_expiration_year = "15" # Ano da data de expiração
transaction.card_cvv = "314" # Codigo de segurança
transaction.amount = 1000 # Valor em centavos - 1000 = R$ 10,00
transaction.installments = 6 # Numero de parcelas - OPCIONAL

transaction.postback_url = 'https://seustie.com/postback' # URL de postback

transaction.charge

if transaction.status == 'paid'
	# Transação aprovada
elsif transaction.status == 'refused'
	#Transação recusada
	# transaction.refuse_reason mostra por que a transação foi recusada
end
</code></pre>

### Recebendo o POSTback
Quando a transação mudar de `status`, o Pagar.me irá fazer uma requisição a URL definida na transação. O código da página que receberá o POSTback é:

<pre>
<code data-language="ruby">id = params[:id]
current_status = params[:current_status]
old_status = params[:old_status]
fingerprint = params[:fingerprint]

if PagarMe::validate_fingerprint(id, fingerprint)
	if current_status == 'paid'
		# Transação realizada com sucesso
	else
		# Ainda não foi realizada
	end
end
</code>
</pre>

Para saber mais sobre cada `status`, visite a sessão de status nas [ referências de transações ]( /docs/restful-api/transactions/index.html#transactions-status )

## Passo 4 - Antifraude (opcional)

O Pagar.me recomenda fortemente o uso de antifraude. Para começar a utilizar o antifraude basta acessar o dashboard e ativá-lo. Para mais informações, visite o [guia sobre utilização do antifraude](/docs/guides/antifraud).

Quando o antifraude está ativado, é necessário fornecer os dados do cliente que está realizando a transação para que a análise de fraude possa ser realizada:
<pre>
<code data-language="ruby">PagarMe::Transaction.new({
	:amount => 1000,
	:card_number => '4901720080344448', 
	:card_holder_name => "Jose da Silva", 
	:card_expiration_month => 11, 
	:card_expiration_year => "13", 
	:card_cvv => 356, 
	:customer => { 
	  :name => "Jose da Silva",  
	  :document_number => "36433809847", 
	  :email => "henrique@pagar.me", 
	  :address => {
		:street => 'Av. Brigadeiro Faria Lima', 
		:neighborhood => 'Itaim bibi',
		:zipcode => '01452000', 
		:street_number => 2941, 
	  },
	  :phone => {
		:ddd => 12, 
		:number => '981234567', 
	  },
	  :sex => 'M', 
	  :born_at => '1970-10-11'	
	}
  }
</code>
</pre>

## Customers (Clientes)

Caso os dados do cliente sejam fornecidos ao realizar uma transação, o Pagar.me se encarregará de criar um cliente (`customer`) automaticamente para você. Para acessar o cliente de uma transação:
<pre>
<code data-language="ruby">customer = transação.customer
customer.name # Nome do cliente
customer.addresses # Endereços do cliente
customer.phones # Telefones do cliente
customer.document_number # CPF/CNPJ do cliente
</code>
</pre>

Para uma lista completa de todas as informações de um customer [clique aqui](/docs/restful-api/customers/). Não se esqueça que para utilizar o antifraude também é necessária uma alteração no frontend. Basta adicionar esse método na sua página de checkout:

## Planos/Assinaturas

### Planos

Um plano é um valor a ser cobrado periódicamente, ou seja a cada `days` dias será cobrado automaticamente um valor fixo do cartão de credito daquele cliente.

#### Criando Planos
Um plano pode ser criado pelo nosso [Dashboard](https://dashboard.pagar.me) ou pela nossa API. Para criar com a nossa API basta executar o seguinte código:
<pre>
<code data-language="ruby">plan = PagarMe::Plan.new({
	:name => "Plano gold",
	:trial_days => 5,
	:days => 30,
	:amount => 3000,	
  }
plan.create

plan.id # Plano criado
</code>
</pre>

### Assinaturas
Assinaturas representam clientes. Uma assinatura PODE OU NÃO ter um plano. 

#### Criando uma assinatura dentro de um plano
Se você já tem um plano e quer adicionar um cliente a esse plano basta executar esse código:
<pre>
<code data-language="ruby">subscription = PagarMe::Subscription.new({
	:payment_method => 'credit_card',
	:card_number => "4901720080344448",
	:card_holder_name => "Jose da Silva",
	:card_expiration_month => "10",
	:card_expiration_year => "15",
	:card_cvv => "314",
	:customer_email => 'test@test.com',
	:postback_url => "http://test.com/postback",
  })

subscription.plan = plan
subscription.create 

subscription.id # Subscription criada com sucesso

</code>
</pre>

Com esse código o cliente será cobrado periodicamente.

#### Criando uma assinatura sem um plano / One-click buy
Para fazer o one-click buy ou uma transação recorrente variável basta criar uma assinatura e cobrar ela quando achar devido.
<pre>
<code data-language="ruby">subscription = PagarMe::Subscription.new({
	:payment_method => 'credit_card',
	:card_number => "4901720080344448",
	:card_holder_name => "Jose da Silva",
	:card_expiration_month => "10",
	:card_expiration_year => "15",
	:card_cvv => "314",
	:customer_email => 'test@test.com',
	:postback_url => "http://test.com/postback",
  })
 subscription.create # Subscription criada
 subscription.charge(1000) # Vai cobrar o valor em centavos, 1000 = R$ 10.00
</code>
</pre>
