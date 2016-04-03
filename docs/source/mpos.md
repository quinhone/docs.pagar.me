---
title: Integração com maquininha de cartão

language_tabs:
  - objective_c
  - swift
  - java
  - cs
  - cpp

search: true
---

# Integrando com maquininha de cartão

Com o Pagar.me, é possível realizar uma integração extremamente simples e direta com maquininhas de cartão de crédito (pinpads) para capturar dados do cartão para que eles possam ser [enviados à API Pagar.me](/transactions) para processamento.

A comunicação entre um pinpad é feita de forma serial, geralmente por Bluetooth. Assim, cada plataforma terá sua própria interface para lidar com essa comunicação.

Nossas bibliotecas irão realizar a geração do `card_hash`, que é uma representação segura dos dados do cartão e o único dado de cartão que deverá ser enviado ao servidor.

## Download do SDK

### SDK Android (Java)

O SDK Android pode ser encontrado em duas distribuições, dependentes do sistema de build sendo usado:

* Gradle: [Download](https://db.tt/pVCOZmsA)
* Ant: [Download](https://db.tt/XqHgq3Iq)

### SDK .NET (Windows)

O SDK .NET pode ser instalado através do pacote [**PagarMe.Mpos**](https://www.nuget.org/packages/PagarMe.Mpos/) no nuget.

## Processando uma transação

Para processar uma transação de cartão de crédito/débito por intermédio do pinpad e obter a card hash que deverá ser enviada à API Pagar.me para que a transação seja completada, o seguinte código poderá ser utilizado:

```java
import me.pagar.mposandroid.Mpos;
import me.pagar.mposandroid.MposListener;
import static me.pagar.mposandroid.MposPaymentFlags.*;
import android.bluetooth.BluetoothDevice;
import android.util.Log;

// Obtenha um objeto BluetoothDevice do Android, que representa um aparelho Bluetooth pareado
BluetoothDevice device = ...;

final Mpos mpos = new Mpos(device, "{ENCRYPTION_KEY}");
mpos.addListener(new MposListener() {
	public void bluetoothConnected() {
		/* Inicializar operações no pinpad */
		mpos.initialize();
	}
	public void bluetoothDisconnected() {
		/* Lidar com desconexão Bluetooth */
	}
	
	public void receiveInitialization() {
		mpos.payAmount(100, MPF_DEFAULT);
	}
	public void receiveClose() {
		/* Fechar conexão com Bluetooth */
		mpos.closeConnection();
	}

	public void receiveCardHash(String cardHash) {
		Log.d("ExemploMpos", "card_hash gerado = " + cardHash);
		
		/* Gerar transação com a API Pagar.me... */
		mpos.finishTransaction(...);
	}

	public void receiveFinishTransaction() {
		/* Finalizar sessão com o pinpad com mensagem. */
		mpos.close("Operação Finalizada.");
	}

	public void bluetoothErrored(int error) {
		/* Lidar com Erro de conexão Bluetooth */
	}
	public void receiveError(int error) {
		/* Lidar com Erro na interação com o pinpad */
	}
});

/* Abrir conexão Bluetooth com o pinpad */
mpos.openConnection();
```

```objective_c
#import <ExternalAccessory/ExternalAccessory.h>
#import "mpos-ios.h"

// Obtém um objeto EAAccessory, que representa um aparelho Bluetooth pareado.
EAAccessory *accessory = [[[EAAccessoryManager sharedAccessoryManager] connectedAccessories] firstObject];

PMMposController *controller = [[PMMposController alloc] initWithAccessory:accessory encryptionKey:@"{ENCRYPTION_KEY}"];
[controller openConnectionWithCallback:^(NSError *error){
	if (error != nil) { /* Lidar com Erro */ return; }
	[controller payAmount:100 withCardOptions:MPF_DEFAULT withCallback:^(NSString *cardHash, NSError *error){
		if (error != nil) { /* Lidar com Erro */ return; }
		NSLog(@"card_hash gerado = %@", cardHash);
		
		/* Gerar transação com a API Pagar.me... */
		[controller finishTransactionWithSuccess:... withCallback:^(NSError *error){
			if (error != nil) { /* Lidar com Erro */ return; }
			[controller closeConnection];
		}];
	}];
}];
```

```swift
import ExternalAccessory

// Obtém um objeto EAAccessory, que representa um aparelho Bluetooth pareado.
let accessory = EAAccessoryManager.sharedAccessoryManager().connectedAccessories.first

let controller = PMMposController(accessory: accessory, encryptionKey: "{ENCRYPTION_KEY}")
controller.openConnectionWithCallback({ (error: NSError!) -> Void in
	if error != nil {
		/* Lidar com Erro */
		return
	}
	controller.payAmount(100, withCardOptions: MPF_DEFAULT, withCallback: { (cardHash: String!, error: NSError!) -> Void in
		if error != nil {
			/* Lidar com Erro */
			return
		}
		NSLog("card_hash gerado = %@", cardHash);
		
		/* Gerar transação com a API Pagar.me... */		
		controller.finishTransactionWithSuccess(..., withCallback: { error: NSError! -> Void in
			if error != nil {
				/* Lidar com Erro */
				return
			}
			
			controller.closeConnection()
		})
	})
});
```

```cs
using System;
using System.IO.Ports;
using PagarMe.Mpos;

// Obtenha um objeto SerialPort do .NET, que representa uma conexão serial
// ao aparelho Bluetooth pareado
SerialPort port = new SerialPort(...);
port.Open();

Mpos mpos = new Mpos(port.BaseStream, "{ENCRYPTION_KEY}");
mpos.Errored += (sender, e) => { /* Lidar com Erro */ };

await mpos.Initialize();
var result = await mpos.ProcessPayment(100, PaymentFlags.Default);

Console.WriteLine("card_hash gerado = " + result.CardHash);

/* Gerar transação com a API Pagar.me... */
await mpos.FinishTransaction(...);

await mpos.Close();
```

```cpp
#include "mposcxx.h"

static void Initialized(pagarme::mpos &mpos) {
	mpos.pay(100, MPF_DEFAULT);
}

static void ProcessedPayment(pagarme::mpos &mpos, pagarme::mpos_payment_result &result) {
	std::cout << "card_hash gerado = " << result.card_hash << std::endl;
	
	/* Gerar transação com a API Pagar.me... */	
	mpos.finish_transaction(...);
}

static void FinishedTransaction(pagarme::mpos &mpos) {
	mpos.close("Operação Finalizada");
}

static void Errored(pagarme::mpos &mpos, abecs_stat_t error) {
	/* Lidar com Erro */
}

// Obtenha uma classe derivada de std::streambuf
// que se comunique com o pinpad dependendo da plataforma
// utilizada pelo SDK
std::streambuf streambuffer;

pagarme::mpos mpos(streambuffer, "{ENCRYPTION_KEY}");
mpos.initialized.connect(boost::bind(&Initialized, _1));
mpos.errored.connect(boost::bind(&Errored, _1, _2));
mpos.processed_payment.connect(boost::bind(&ProcessedPayment, _1, _2));
mpos.finished_transaction.connected(boost::bind(&FinishedTransaction, _1));

mpos.open();
mpos.wait();
```

> Não se esqueça de substituir `{ENCRYPTION_KEY}` pela
> sua chave de encriptação disponível no seu
> [Dashboard](https://dashboard.pagar.me/).

Todas as plataformas apresentam uma função de processamento de pagamento com dois parâmetros: `amount` e `options`. O primeiro é um inteiro representando a quantia a ser cobrada em centavos (no caso dos exemplos, `100` = R$1,00). As opções possíveis são as seguintes, que podem ser juntadas com o operador bitwise-OR (`|`):

Opção | Significado
----- | -----------
MPF\_NONE | Não aceita nenhuma bandeira ou modalidade de pagamento.
MPF\_CREDIT\_CARD | Aceita somente cartão de crédio. Não especifica bandeira.
MPF\_DEBIT\_CARD | Aceita somente cartão de débito. Não especifica bandeira.
MPF\_ALL\_APPLICATIONS | Aceita crédito e débito. Não especifica bandeira.
MPF\_VISA\_CARD | Aceita a bandeira Visa. Não especifica modalidade de pagamento.
MPF\_MASTER\_CARD | Aceita a bandeira MasterCard. Não especifica modalidade de pagamento.
MPF\_ALL\_CARDS | Aceita Visa e Master. Não especifica modalidade de pagamento.
MPF\_ALL\_VISA | Aceita crédito e débito com a bandeira Visa.
MPF\_ALL\_MASTER | Aceita crédito e débito com a bandeira MasterCard.
MPF\_ALL\_CREDIT | Aceita todas as bandeiras com método de pagamento crédito.
MPF\_ALL\_DEBIT | Aceita todas as bandeiras com método de pagamento débito.
MPF\_DEFAULT | Aceita todas as bandeiras e métodos de pagamento.

Deve ser notado que opções que não especificam bandeiras ou modalidade de pagamento não podem ser usadas sozinhas. `MPF_CREDIT_CARD`, por exemplo, não deve ser usado por si só. Já `MPF_CREDIT_CARD | MPF_VISA_CARD` especifica que somente cartões Visa Crédito serão aceitos.

<aside class="notice">É **imprescindível** que uma transação seja *finalizada* ao ser realizada. Para mais informações, leia mais abaixo.</aside>

Transações com maquininha de cartão de crédito não precisam de dados de antifraude.


## Atualizando tabelas EMV

Para as diferentes aplicações de cartão de crédito (diferentes bandeiras, crédito/débito) existe um conjunto de especificações de como o pinpad deve lidar com as diferentes aplicações, e certificados que permitem ao pinpad lidar com elas. Este conjunto é denominado tabelas EMV e pode ser obtido junto ao adquirente.

Para baixar as tabelas EMV, as seguintes operações são realizadas:

1. Download das tabelas EMV pela API Pagar.me
2. Transferência das tabelas baixadas para o pinpad

A API Pagar.me fornece as tabelas EMV e as bibliotecas, no exemplo abaixo, instalam as tabelas no pinpad:

```java
import me.pagar.mposandroid.Mpos;
import me.pagar.mposandroid.MposListener;
import static me.pagar.mposandroid.MposPaymentFlags.*;
import android.bluetooth.BluetoothDevice;
import android.util.Log;

// Obtenha um objeto BluetoothDevice do Android, que representa um aparelho Bluetooth pareado
BluetoothDevice device = ...;

final Mpos mpos = new Mpos(device, "{ENCRYPTION_KEY}");
mpos.addListener(new MposListener() {
	public void bluetoothConnected() {
		/* Inicializar operações no pinpad */
		mpos.initialize();
	}
	public void bluetoothDisconnected() {
		/* Lidar com desconexão Bluetooth */
	}	
	
	public void receiveInitialization() {
		boolean force = false; // Define o comportamento da atualização de tabelas
		mpos.downloadEMVTablesToDevice(force);
	}
	public void receiveClose() {
		/* Fechar conexão com Bluetooth */
		mpos.closeConnection();
	}

	public void receiveTableUpdated(boolean loaded) {
		Log.d("ExemploMpos", "Tabelas carregadas: " + loaded);
		mpos.close("Operação Finalizada.");
	}

	public void bluetoothErrored(int error) {
		/* Lidar com Erro de conexão Bluetooth */
	}
	public void receiveError(int error) {
		/* Lidar com Erro na interação com o pinpad */
	}	
});
mpos.openConnection();
```

```objective_c
#import <ExternalAccessory/ExternalAccessory.h>
#import "mpos-ios.h"

// Obtém um objeto EAAccessory, que representa um aparelho Bluetooth pareado.
EAAccessory *accessory = [[[EAAccessoryManager sharedAccessoryManager] connectedAccessories] firstObject];

PMMposController *controller = [[PMMposController alloc] initWithAccessory:accessory encryptionKey:@"{ENCRYPTION_KEY}"];
BOOL force = NO; // Define o comportamento da atualização de tabelas
[controller openConnectionWithCallback:^(NSError *error){
	if (error != nil) { /* Lidar com Erro */ return; }
	[controller downloadEMVTablesToDeviceWithCallback:^(BOOL loaded, NSError *error){
		if (error != nil) { /* Lidar com Erro */ return; }
		NSLog(@"Tabelas Carregadas: %d", loaded);
		[controller closeConnection];
	} forceUpdate:force];
}];
```

```swift
import ExternalAccessory

// Obtém um objeto EAAccessory, que representa um aparelho Bluetooth pareado.
let accessory = EAAccessoryManager.sharedAccessoryManager().connectedAccessories.first

let controller = PMMposController(accessory: accessory, encryptionKey: "{ENCRYPTION_KEY}")
let force = false // Define o comportamento da atualização de tabelas
controller.openConnectionWithCallback({ (error: NSError!) -> Void in
	if error != nil {
		/* Lidar com Erro */
		return
	}
	controller.downloadEMVTablesToDeviceWithCallback({ (loaded: Bool, error: NSError!) -> Void in
		if error != nil {
			/* Lidar com Erro */
			return;
		}
		
		NSLog("Tabelas Carregadas: %d", loaded);
		controller.closeConnection();
	}, forceUpdate: force)
});
```

```cs
using System;
using System.IO.Ports;
using PagarMe.Mpos;

// Obtenha um objeto SerialPort do .NET, que representa uma conexão serial
// ao aparelho Bluetooth pareado
SerialPort port = new SerialPort(...);
port.Open();

Mpos mpos = new Mpos(port.BaseStream, "{ENCRYPTION_KEY}");
mpos.Errored += (sender, e) => { /* Lidar com Erro */ };

await mpos.Initialize();

bool force = false; // Define o comportamento da atualização de tabelas
await mpos.SynchronizeTables(force);

await mpos.Close();
```

```cpp
#include "mposcxx.h"

static void Initialized(pagarme::mpos &mpos) {
	bool force = false; // Define o comportamento da atualização de tabelas
	mpos.download_emv_tables(force);
}

static void UpdatedTables(pagarme::mpos &mpos, bool loaded) {
	std::cout << "Tabelas carregadas: " << loaded << std::endl;
	mpos.close("Operação Finalizada");
}

static void Errored(pagarme::mpos &mpos, abecs_stat_t error) {
	/* Lidar com Erro */
}

// Obtenha uma classe derivada de std::streambuf
// que se comunique com o pinpad dependendo da plataforma
// utilizada pelo SDK
std::streambuf streambuffer;

pagarme::mpos mpos(streambuffer, "{ENCRYPTION_KEY}");
mpos.initialized.connect(boost::bind(&Initialized, _1));
mpos.errored.connect(boost::bind(&Errored, _1, _2));
mpos.updated_tables.connect(boost::bind(&UpdatedTables, _1, _2));

mpos.open();
mpos.wait();
```

> Não se esqueça de substituir `{ENCRYPTION_KEY}` pela
> sua chave de encriptação disponível no seu
> [Dashboard](https://dashboard.pagar.me/).

O booleano `force` dos exemplos especifica o comportamento de atualização de tabelas no pinpad. Caso `true`, instala sempre as tabelas baixadas no pinpad. Caso `false`, instala as tabelas no pinpad **somente** se a versão instalada no pinpad for diferente da versão das tabelas baixadas, evitando instalações de tabelas de forma redundante.

O parâmetro `loaded` nos eventos lançados por ocasião do término de atualização de tabelas indica, se `true`, que foram instaladas tabelas no pinpad; se `false`, que essa instalação não foi necessária.

## Finalizando uma Transação

Após a obtenção da `card_hash` por meio do processamento de transação e seu envio à API Pagar.me para criação de uma transação, faz-se necessário finalizar o processamento da transação. Para tal, o seguinte código deve ser usado:

```java
import me.pagar.mposandroid.Mpos;
boolean connected = true; /* Define se foi possível se conectar à API Pagar.me para processar a transação */
 
mpos.finishTransaction(connected, Integer.parse(responseCode), emvData);
```

```objective_c
#import "mpos-ios.h"

BOOL connected = YES; /* Define se foi possível se conectar à API Pagar.me para processar a transação */

[controller finishTransactionWithSuccess:connected withResponseCode:[responseCode integerValue] emvData:emvData withCallback:^(NSError *error){}];
```

```swift
let connected = true; /* Define se foi possível se conectar à API Pagar.me para processar a transação */

controller.finishTransactionWithSuccess(connected, withResponseCode: Int(responseCode), emvData: emvData, withCallback: { error: NSError! }) -> Void in });
```

```cs
using PagarMe.Mpos;

bool connected = true; /* Define se foi possível se conectar à API Pagar.me para processar a transação */
await mpos.FinishTransaction(connected, Int32.Parse(responseCode), emvData);
```

```cpp
#include "mposcxx.h"

bool connected = true; /* Define se foi possível se conectar à API Pagar.me para processar a transação */
mpos.finish_transaction(connected, atoi(responseCode.c_str()), emvData);
```

Os parâmetros `responseCode` e `emvData` devem ser retirados do objeto `transaction` retornado pela API Pagar.me com a seguinte correspondência:

Parâmetro | Correspondência no objeto `transaction`
--------- | ---------------------------------------
responseCode | Integer dentro da propriedade `acquirer_response_code` do objeto `transaction`
emvData | String dentro da propriedade `card_emv_response` do objeto `transaction`

Caso não tenha sido possível conexão com a API Pagar.me para inicializar uma transação (e o parâmetro `connected` seja `false`), `responseCode` deve ser `0` e `emvData` deve ser `null`.

## Erros

O callback de erros reporta, com um número, um erro que ocorreu na comunicação com o pinpad. Entre as possibilidades estão os seguintes:

Erro | Significado
----- | -----------
-1 | Houve um erro de conexão de Internet da biblioteca Pagar.me ao executar a operação requisitada.
10 | O fluxo correto de execução de operações não está sendo seguido (ex. tentativa de processar pagamento sem inicialização)
11 | Houve um erro da biblioteca Pagar.me ao executar a operação requisitada.
12 | Houve um timeout para a execução da operação requisitada.
13 | A operação foi cancelada (por meio de uma função na biblioteca de cancelamento ou por meio do botão de cancelamento do pinpad).
15 | Houve um erro na inicialização da sessão com o pinpad.
20 | Tabelas EMV não foram baixadas corretamente.
42 | As chaves do pinpad não foram carregadas corretamente.
60 | O cartão passado no pinpad não está funcionando propriamente.
70 | Não há aplicação disponível no pinpad para processamento do cartão (por conta de tabelas EMV inconsistentes, bandeira não suportada pela Pagar.me ou cartão que não obedece aos filtros das opções de cartão ao processar um pagamento).


## Próximos passos

Com o `card_hash` em mãos no seu servidor, você pode [realizar uma transação](/transactions), [criar uma assinatura](/plans-subscriptions) ou [armazenar esse cartão e cobrá-lo posteriormente](/cards).

## Referência completa

Uma referência completa das funções e do setup das bibliotecas de maquininha de cartão pode ser encontrada junto à distribuição de cada uma.
