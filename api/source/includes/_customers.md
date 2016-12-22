# Clientes

## Criando um cliente

> POST https://api.pagar.me/1/customers/:id

```shell
curl -X POST https://api.pagar.me/1/customers \
-d "api_key=ak_test_T12378asdgyug234DoGKgN234897dsf98" \
-d "document_number=18152564000105" \
-d "name=nome do cliente" \
-d "email=eee@email.com" \
-d "born_at=13121988" \
-d "gender=M" \
-d "address[street]=rua qualquer" \
-d "address[complementary]=apto" \
-d "address[street_number]=13" \
-d "address[neighborhood]=pinheiros" \
-d "address[city]=sao paulo" \
-d "address[state]=SP" \
-d "address[zipcode]=05444040" \
-d "address[country]=Brasil" \
-d "phone[ddi]=55" \
-d "phone[ddd]=11" \
-d "phone[number]=999887766"
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

customer = PagarMe::Card.new({
	:document_number => "18152564000105",
	:name => "nome do cliente",
	:email => "eee@email.com",
	:born_at => 13121988,
	:gender => "M",
	:address => {
		:street => "rua qualquer",
		:complementary => "apto",
		:street_number => 13,
		:neighborhood => "pinheiros",
		:city => "sao paulo",
		:state => "SP",
		:zipcode => "05444040",
		:country => "Brasil"
	},
	:phone => {
		:ddi => 55,
		:ddd => 11,
		:number => 999887766
	}
})

customer.create
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$customer = new PagarMe_Customer(array(
	  "document_number" => "18152564000105",
	  "name" => "nome do cliente",
	  "email" => "eee@email.com",
	  "born_at" => 13121988,
	  "gender" => "M",
	  "address" => array(
		"street" => "rua qualquer",
		"complementary" => "apto",
		"street_number" => 13,
		"neighborhood" => "pinheiros",
		"city" => "sao paulo",
		"state" => "SP",
		"zipcode" => "05444040",
		"country" => "Brasil"
	  ),
	  "phone" => array(
		"ddi" => 55,
		"ddd" => 11,
		"number" => 999887766
	  )
	));

	$customer->create();
```

```cs
```

Através dessa rota você pode salvar os dados de um cliente no nosso banco de dados.

> JSON Retornado (Exemplo)

```json
{
    "object": "customer",
    "document_number": "18152564000105",
    "document_type": "cnpj",
    "name": "nome do cliente",
    "email": "eee@email.com",
    "born_at": "1970-01-01T03:38:41.988Z",
    "gender": "M",
    "date_created": "2015-04-10T18:38:19.000Z",
    "id": 253591,
    "phones": [{
        "object": "phone",
        "ddi": "55",
        "ddd": "11",
        "number": "999887766",
        "id": 148590
    }],
    "addresses": [{
        "object": "address",
        "street": "rua qualquer",
        "complementary": "apto",
        "street_number": "13",
        "neighborhood": "pinheiros",
        "city": "sao paulo",
        "state": "SP",
        "zipcode": "05444040",
        "country": "Brasil",
        "id": 153809
    }]
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **document_number** <br> <span class="required">obrigatório</span>| Número do CPF ou CNPJ do cliente |
| **name**<br> <span class="required">obrigatório</span> | Nome ou razão social do comprador |
| **email**<br> <span class="required">obrigatório</span> | E-mail do comprador |
| **born_at** | Data de nascimento |
| **gender** | Gênero |
| **address[street]**<br> <span class="required">obrigatório</span> | Nome da rua |
| **address[complementary]** | Complemento do endereço |
| **address[street_number]**<br> <span class="required">obrigatório</span> | Número do imóvel |
| **address[neighborhood]**<br> <span class="required">obrigatório</span> | Bairro |
| **address[city]** | Cidade |
| **address[state]** | Estado |
| **address[zipcode]**<br> <span class="required">obrigatório</span> | Código postal (CEP) |
| **address[country]** | País |
| **phone[ddi]** | DDI (Discagem Direta Internacional) |
| **phone[ddd]**<br> <span class="required">obrigatório</span> | DDD (Discagem Direta à Distância) |
| **phone[number]**<br> <span class="required">obrigatório</span> | Número do telefone (máximo de 9 dígitos, apenas números) |

## Retornando dados do cliente

> GET https://api.pagar.me/1/customers/:id

```shell
curl -X GET https://api.pagar.me/1/customers/11222 \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' 
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

customer = PagarMe::Customer.find_by_id(11222)
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$customer = PagarMe_Customer::findById(11222);
```

```cs
```

Através da rota `/customers/:id` você recebe todos os dados do seu cliente, previamente cadastrado na realização de uma transação, quando os dados deste é passado pelos parâmetros `customer[nomeDaPropriedade]`.

> JSON Retornado (Exemplo)

```json
{
    "object": "customer",
    "document_number": "31442053332",
    "document_type": "cpf",
    "name": "api customer fullname",
    "email": "api@customer.com.br",
    "born_at": null,
    "gender": null,
    "date_created": "2014-10-13T10:51:38.000Z",
    "id": 11222,
    "phones": [{
        "object": "phone",
        "ddi": "55",
        "ddd": "22",
        "number": "99887766",
        "id": 12345
    }],
    "addresses": [{
        "object": "address",
        "street": "Rua Veneza",
        "complementary": null,
        "street_number": "31",
        "neighborhood": "São Paulo",
        "city": "Av API",
        "state": "SP",
        "zipcode": "15078731",
        "country": "Brasil",
        "id": 13743
    }]
}
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **:id**<br> <span class="required">obrigatório</span> | Id do cliente desejado |

## Retornando dados de clientes

> GET https://api.pagar.me/1/customers

```shell
curl -X GET https://api.pagar.me/1/customers \
-d 'api_key=ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0' \
-d 'page=1' \
-d 'count=2'
```

```ruby
require 'pagarme'

PagarMe.api_key = "ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0"

card = PagarMe::Card.all(1, 2)
```

```php
<?php
    require("pagarme-php/Pagarme.php");

    Pagarme::setApiKey("ak_test_grXijQ4GicOa2BLGZrDRTR5qNQxJW0");

	$customers = PagarMe_Customer::all(1, 2);
```

```cs
```

Retorna todos os clientes cadastrados em sua conta.

> JSON Retornado (Exemplo)

```json
[{
    "object": "customer",
    "document_number": "18152564000105",
    "document_type": "cnpj",
    "name": "nome do cliente",
    "born_at": "1970-01-01T03:38:41.988Z",
    "gender": "M",
    "date_created": "2015-04-10T22:04:18.000Z",
    "id": 15132,
    "phones": [{
        "object": "phone",
        "ddi": "55",
        "ddd": "11",
        "number": "999887766",
        "id": 13746
    }],
    "addresses": [{
        "object": "address",
        "street": "rua qualquer",
        "complementary": "apto",
        "street_number": "13",
        "neighborhood": "pinheiros",
        "city": "sao paulo",
        "state": "SP",
        "zipcode": "05444040",
        "country": "Brasil",
        "id": 13958
    }]
}, {
    "object": "customer",
    "document_number": "18152564000105",
    "document_type": "cnpj",
    "email": "eee@email.com",
    "born_at": "1970-01-01T03:38:41.988Z",
    "gender": "M",
    "date_created": "2015-04-10T22:03:49.000Z",
    "id": 15131,
    "phones": [{
        "object": "phone",
        "ddi": "55",
        "ddd": "11",
        "number": "999887766",
        "id": 13745
    }],
    "addresses": [{
        "object": "address",
        "street": "rua qualquer",
        "complementary": "apto",
        "street_number": "13",
        "neighborhood": "pinheiros",
        "city": "sao paulo",
        "state": "SP",
        "zipcode": "05444040",
        "country": "Brasil",
        "id": 13957
    }]
}]
```

| Parâmetro | Descrição |
|--:|:--|
| **api_key**<br> <span class="required">obrigatório</span> | Chave da API (disponível no seu dashboard) |
| **count**<br> default: `10` | Retorna `n` objetos `customer` |
| **page**<br> default: `1` | Útil para implementação de uma paginação de resultados | 


