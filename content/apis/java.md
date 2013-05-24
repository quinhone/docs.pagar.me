---
title: Guia de integração em Java
---

# Guia de integração em Java

## Instalando a gem

A biblioteca em Java do PagarMe está disponível através do Maven.

    <dados para colocar no pom.xml do Maven>
    </dados para colocar no pom.xml do Maven>

Caso você não use o Maven, pode instalar a biblioteca pelo seu [JAR](https://github.com/pagarme/pagarme-java).

## Utilizando a biblioteca

### Importando...

Antes de iniciar, é necessário incluir a biblioteca no seu código:

<pre><code data-language="python">import com.pagarme.*;</code></pre>

### Configurando a chave de API

Para usar a biblioteca, é necessário configurá-la com a chave de API disponível em seu [dashboard](http://dashboard.pagar.me/).

<pre><code data-language="java">PagarMe.api_key = "Jy1V5bJcGf8q4gHepttt"</code></pre>

### Realizando uma transação

Para realizar uma transação...

<pre><code data-language="python">PagarMeTransaction transaction = new PagarMeTransaction();
transaction.cardNumber = "4901720080344448";
transaction.cardHolderName = "Test User";
transaction.cardExpiracyMonth = 12;
transaction.cardExpiracyYear = 13;
transaction.cardCVV = "314";
transaction.amount = 1000;

try {
    transaction.charge();
} catch (PagarMeException e) {
    System.out.println("Erro: ");
    e.printStackTrace();
}
</code></pre>

Você também pode inicializar uma transação com um `card_hash` que foi recebido do browser do cliente:

<pre><code data-language="python">PagarMeTransaction transaction = new PagarMeTransaction("5169d12b3da665f36e00000a_FFtwikzg/FC1mH7XLFU5fjPAzDsP0ogeAQh3qXRpHzkIrgDz64lITBUGwio67zm2CQXwbKRjGdRi5J1xFNpQLWnxQsUJAQELcTSGaGtF6RGSu6sq1stp8OLRSNG7wp+xGe8poqxw4S1gOL5JYO7XZp/Uz7rTpKXh3IcRshmX36hh66J6+7l5j0803cGIfMZu3T7nbMjQYIf+yLi8r0O6vL9DQPmqSZ9FBerqFGxWHrxScneaaMVzMpNX/5eneqveVBt88RccytyJG5+HYRHcRyKIbLfmX48L/C22HJeAm3PyzehGHdOmDcsxPtVB+Fgq7SDuB4tHWBT8j6wihOO7ww==")

try {
    transaction.charge();
} catch (PagarMeException e) {
    System.out.println("Erro: ");
    e.printStackTrace();
}
</code></pre>

Independente da forma com que a transação foi realizada, se não ocorreu nenhum erro, a transação passará a ter status `approved`, ou seja, estará aprovada:

<pre><code data-language="javascript">System.out.println(transaction.status);
// "approved"
</code></pre>

### Tratando erros ao realizar uma transação

Caso ocorra um erro ao realizar uma transação, a biblioteca irá dar `throw` em um erro:

<pre><code data-language="python">PagarMeTransaction transaction = new PagarMeTransaction();
transaction.cardNumber = "4901720080344448";
transaction.cardHolderName = "Test User";
transaction.cardExpiracyMonth = 13; // o mês 13 é maior do que 12 (dezembro) -> parâmetro inválido!
transaction.cardExpiracyYear = 13;
transaction.cardCVV = "314";
transaction.amount = 1000;

try {
    transaction.charge();
} catch (PagarMeException e) {
    System.out.println("Erro: ");
    e.printStackTrace();
}
</code></pre>

Resultado:

<pre><code data-language="ruby">Erro:
com.pagarme.PagarMeValidationException: Mês de expiração inválido.
    at com.pagarme.PagarMeTransaction.validateFields(PagarMeTransaction.java:192)
    at com.pagarme.PagarMeTransaction.charge(PagarMeTransaction.java:162)
    at com.pagarme.App.main(App.java:59)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
    at java.lang.reflect.Method.invoke(Method.java:597)
    at org.codehaus.mojo.exec.ExecJavaMojo$1.run(ExecJavaMojo.java:297)
    at java.lang.Thread.run(Thread.java:680)
</code></pre>

Você pode tratar erros especificos, como um erro de conexão ou uma resposta de erro da API, através de um `catch` para cada um deles:

<pre><code data-language="python">PagarMeTransaction transaction = new PagarMeTransaction();
transaction.cardNumber = "4901720080344448";
transaction.cardHolderName = "Test User";
transaction.cardExpiracyMonth = 13; // o mês 13 é maior do que 12 (dezembro) -> parâmetro inválido!
transaction.cardExpiracyYear = 13;
transaction.cardCVV = "314";
transaction.amount = 1000;

try {
    transaction.charge();
} catch (PagarMeValidationException e) {
    System.out.println("Erro validando a requisição: ");
    e.printStackTrace();
} catch (PagarMeConnectionException e) {
    System.out.println("Erro de conexão: ");
    e.printStackTrace();
} catch (PagarMeResponseException e) {
    System.out.println("Erro na requisição: ");
    e.printStackTrace();
} catch (PagarMeException e) {
    System.out.println("Erro desconhecido: ");
    e.printStackTrace();
}
</code></pre>

Dessa vez, o tratamento do erro será específico para cada tipo deles:

<pre><code data-language="ruby">Erro validando a requisição: 
com.pagarme.PagarMeValidationException: Mês de expiração inválido.
    at com.pagarme.PagarMeTransaction.validateFields(PagarMeTransaction.java:192)
    at com.pagarme.PagarMeTransaction.charge(PagarMeTransaction.java:162)
    at com.pagarme.App.main(App.java:59)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
    at java.lang.reflect.Method.invoke(Method.java:597)
    at org.codehaus.mojo.exec.ExecJavaMojo$1.run(ExecJavaMojo.java:297)
    at java.lang.Thread.run(Thread.java:680)
</code></pre>

É nesse ponto onde o tratamento dos erros específicos deve ser feito (e respondido para o cliente adequadamente).

### Cancelando uma transação

Após a transação ser realizada com sucesso, ela terá o status `approved`, como já foi visto:

<pre><code data-language="javascript">System.out.println(transaction.status);
// "approved
</code></pre>

Caso você deseja cancelar a transação, estornando o valor pago pelo cliente:

<pre><code data-language="python">try {
    transaction.chargeback();
} catch (PagarMeException e) {
    System.out.println("Erro ao cancelar a transação: ");
    e.printStackTrace();
}
</code></pre>

Se a transação for cancelada com sucesso, seu status mudará para `chargebacked`, indicando que ela foi cancelada com sucesso.

### Buscando uma transação pelo `id`

Consultar os dados de uma transação já realizada é possível com o seu `id`, que é retornado ao realizá-la:

<pre><code data-language="python">try {
    PagarMeTransaction transaction = PagarMeTransaction.findById("22");
    System.out.println(transaction.id);
    // "22"
    System.out.println(transaction.status);
    // "approved"
} catch (PagarMeException e) {
    System.out.println("Erro ao buscar transação: ");
    e.printStackTrace();
}
</code></pre>

### Buscando as últimas transações realizadas

Para buscar as últimas transações realizadas em sua conta:

<pre><code data-language="python">try {
    List&lt;PagarMeTransaction&gt; transactions = PagarMeTransaction.all();
    for(int i = 0; i < transactions.size(); i++) {
        PagarMeTransaction transaction = transactions.get(i);
        System.out.println("status: " + transaction.status);
        System.out.println("amount: " + transaction.amount);
        System.out.println("installments: " + transaction.installments);
        System.out.println("id: " + transaction.id);
        System.out.println("live: " + transaction.live);
        System.out.println("costumerName: " + transaction.costumerName);
        System.out.println("cardLastDigits: " + transaction.cardLastDigits);
    }
} catch (PagarMeException e) {
    System.out.println("Erro ao buscar transações: ");
    e.printStackTrace();
}
</code></pre>

Também é possível especificar a página do resultado desejada, assim como o número de transações retornadas por página:

<pre><code data-language="python">try {
    List&lt;PagarMeTransaction&gt; transactions = PagarMeTransaction.all(3, 5); // página 3, com 5 transações por página
    for(int i = 0; i < transactions.size(); i++) {
        PagarMeTransaction transaction = transactions.get(i);
        System.out.println("status: " + transaction.status);
        System.out.println("amount: " + transaction.amount);
        System.out.println("installments: " + transaction.installments);
        System.out.println("id: " + transaction.id);
        System.out.println("live: " + transaction.live);
        System.out.println("costumerName: " + transaction.costumerName);
        System.out.println("cardLastDigits: " + transaction.cardLastDigits);
    }
} catch (PagarMeException e) {
    System.out.println("Erro ao buscar transações: ");
    e.printStackTrace();
}
</code></pre>
