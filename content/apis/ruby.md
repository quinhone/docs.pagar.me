---
title: Guia de integração em Ruby
---

# Guia de integração em Ruby

## Instalando a gem

A biblioteca em Ruby do PagarMe está disponível em uma *gem*. Para instalá-la,

	$ gem install pagarme

## Utilizando a biblioteca

### Importando...

Antes de iniciar, é necessário incluir a biblioteca no seu código:

<pre><code data-language="ruby">require "pagarme"</code></pre>

### Configurando a chave de API

Para usar a biblioteca, é necessário configurar a chave de API para a que está definida em seu [dashboard](http://dashboard.pagar.me/).

<pre><code data-language="ruby">PagarMe.api_key = "Jy1V5bJcGf8q4gHepttt"</code></pre>

### Realizando uma transação

Para realizar uma transação...

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new
transaction.card_number = "4901720080344448"
transaction.card_holder_name = "Jose da Silva"
transaction.card_expiracy_month = "10"
transaction.card_expiracy_year = "15"
transaction.card_cvv = "314"

transaction.charge
</code></pre>

Você também pode inicializar o objeto de transação com um hash:

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new({
    :card_number => "4901720080344448",
    :card_holder_name => "Jose da Silva",
    :card_expiracy_month => "10",
    :card_expiracy_year => "15",
    :card_cvv => "314"
})

transaction.charge
</code></pre>

... ou com um `card_hash` que foi recebido do browser do cliente:

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new("5169d12b3da665f36e00000a_FFtwikzg/FC1mH7XLFU5fjPAzDsP0ogeAQh3qXRpHzkIrgDz64lITBUGwio67zm2CQXwbKRjGdRi5J1xFNpQLWnxQsUJAQELcTSGaGtF6RGSu6sq1stp8OLRSNG7wp+xGe8poqxw4S1gOL5JYO7XZp/Uz7rTpKXh3IcRshmX36hh66J6+7l5j0803cGIfMZu3T7nbMjQYIf+yLi8r0O6vL9DQPmqSZ9FBerqFGxWHrxScneaaMVzMpNX/5eneqveVBt88RccytyJG5+HYRHcRyKIbLfmX48L/C22HJeAm3PyzehGHdOmDcsxPtVB+Fgq7SDuB4tHWBT8j6wihOO7ww==")

transaction.charge
</code></pre>

Independente da forma com que a transação foi realizada, se não ocorreu nenhum erro, a transação passará a ter status `:approved`, ou seja, estará aprovada:

<pre><code data-language="ruby">> transaction.status
 => :approved
</code></pre>


### Tratando erros ao realizar uma transação

Caso um dos parâmetros seja inválido ao realizar uma transação, a biblioteca irá dar `throw` em um erro:

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new
transaction.card_number = "4901720080344448"
transaction.card_holder_name = "Jose da Silva"
transaction.card_expiracy_month = "13" # o mês 13 é maior do que 12 (dezembro) -> parâmetro inválido!
transaction.card_expiracy_year = "15"
transaction.card_cvv = "314"

transaction.charge
</code></pre>

Resultado:

<pre><code data-language="ruby">PagarMe::TransactionError: PagarMe::TransactionError - Invalid expiracy date month.
	from /Users/pedrofranceschi/.rvm/gems/ruby-1.9.3-p0/gems/pagarme-0.11/lib/pagarme/transaction.rb:80:in `charge'
	from (irb):13
	from /Users/pedrofranceschi/.rvm/rubies/ruby-1.9.3-p0/bin/irb:16:in `main'
</code></pre>

Para tratar erros desse tipo, você pode inserir um `begin` `rescue` no código acima para tratar erros do PagarMe (`PagarMeError`):

<pre><code data-language="ruby">transaction = PagarMe::Transaction.new
transaction.card_number = "4901720080344448"
transaction.card_holder_name = "Jose da Silva"
transaction.card_expiracy_month = "13" # o mês 13 é maior do que 12 (dezembro) -> parâmetro inválido!
transaction.card_expiracy_year = "15"
transaction.card_cvv = "314"

begin
    transaction.charge
rescue PagarMe::PagarMeError => e
    puts "Erro na transação: #{e}"
end
</code></pre>

Dessa vez, o resultado será:

<pre><code data-language="ruby">Erro na transação: PagarMe::TransactionError - Invalid expiracy date month.</code></pre>

O erro foi "resgatado" pelo `rescue`. É nesse ponto onde o tratamento de erro específico deve ser feito.
