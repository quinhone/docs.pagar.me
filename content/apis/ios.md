---
title: Guia de integração para iOS
---

<script>
Rainbow.extend('objective-c', [
	{
		'name': 'string',
		'pattern': /@"[^"]*"/g
	},
	{
		'name': 'keyword',
		'pattern': /sharedInstance|alloc|init|NSError|NSString|[a-zA-Z0-9]*:/g
	}
]);
</script>

# Guia de integração para iOS

A biblioteca para iOS do PagarMe permite que o [`card_hash`](/docs/restful-api/card-hash) seja gerado no seu aplicativo para iOS e, portanto, que os dados de cartão de crédito sejam transmitidos de forma segura do seu aplicativo para o seu servidor, e do seu servidor para o servidor do PagarMe.

Ela funciona de forma análoga a [biblioteca em Javascript](/docs/apis/javascript) num browser.

## Instalando a biblioteca

Para instalar a biblioteca, siga os seguintes passos:

- [Baixe a biblioca para iOS no GitHub do Pagar.me.](https://github.com/PagarMe/pagarme-ios/archive/master.zip)
- Copie a pasta `PagarMeAPI` para o seu projeto do Xcode.
- Adicione o framework `Security.framework` ao seu projeto:

![](/docs/assets/images/screenshots/xcode_add_framework.png)
(clique no botão `+` em vermelho e selecione o framework `Security.framework`)

## Usando a biblioteca

Primeiro, é necessário importar os headers da biblioteca:

<pre><code data-language="css">#import "PagarMe.h"</code></pre>

Depois, configurar sua `encryption_key`, disponível em seu [dashboard](http://dashboard.pagar.me/):

<pre><code data-language="objective-c">[PagarMe sharedInstance].encryptionKey = @"9741a03ea3a4f15f6fa8d9fe9d2c47c8";
</code></pre>

### Encriptando dados de cartão

Para encriptar dados de cartão de crédito:

<pre><code data-language="objective-c">PagarMeCreditCard *creditCard = [[PagarMeCreditCard alloc] init];
creditCard.cardNumber = @"4901720080344448";
creditCard.cardHolderName = @"Test User";
creditCard.cardExpiracyMonth = 12;
creditCard.cardExpiracyYear = 13;
creditCard.cardCvv = @"315";

// Valida os dados do cartão de crédito antes de
// gerar o card_hash com eles.
NSDictionary *errors = [creditCard fieldErrors];

if([errors count] != 0) {
    NSLog(@"Foram encontrados erros nos dados do cartão de crédito: ");
    NSLog(@"%@", errors);
} else {
    [creditCard generateHash:^(NSError *error, NSString *cardHash) {
        if(error) {
            NSLog(@"Erro gerando o card_hash: %@", error);
            return;
        }

        NSLog(@"card_hash gerado: %@", cardHash);
        // Agora envie a string cardHash para o seu servidor e realize
        // a transação com o PagarMe usando-a.
    }];
}
</code></pre>
