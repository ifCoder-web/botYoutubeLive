//document.addEventListener('DOMContentLoaded', function(){
	var idMsgAnteriorS = "inicio";
	var idMsgAnterior = "inicio";
	//var valorTotalRS = 0;
	//var valorTotalVariado = "\n";
	var listaValoresFull = [["Moeda", "Valor", "id"]];
	var listaDeValoresDoados = [["Moeda", "Valor", "id"]];
	var listaValoresString = "Lista DOAÇÕES \n"
	var verifcAdd = false;
	console.log("Start BOT")

	function exibeValores(){  //Mostra as listas com os valores

		var i, j, tabelaValoresPrincipal = "\n\n***** VALORES DOADOS: *****\n\n";
		for(i = 1; i < listaDeValoresDoados.length; i++){
			//var valArredondado = Number(listaDeValoresDoados[i][1]);
			tabelaValoresPrincipal += `${listaDeValoresDoados[i][0]} ${Number(listaDeValoresDoados[i][1]).toFixed(2)} \n`;
		}
		tabelaValoresPrincipal += "\n***************************\n\n\n"
		
		console.log(tabelaValoresPrincipal);

		//console.log(listaValoresFull.length);
		//console.log(listaValoresString);
	}

	//Prepara o array com os tres parametros e com o valor formatado
	function prepareValor(valor, id){
		var valorString = valor.replace("&nbsp;"," ");
		var arrayValor = valorString.split(" ");
		var doacaoPrepar = `${String(arrayValor[0])} ${String(arrayValor[1])}`;
		arrayValor[1] = arrayValor[1].replace(",",".");
		arrayValor.push(id);
		//debugger; //###################
		listaVerificAdd(arrayValor, doacaoPrepar);
	}

	//Verifica se o valor atual ja esta cadastrado na lista total, se não, cadastra
	function listaVerificAdd(valorPreparado, doacao){
		var i, control = false;
		var iteracoesItensLista;
		var numItensLista = listaValoresFull.length;
		var doacao = doacao; //Recebe o valor da doação para adicionar na lista

		//Configuração para verificar somente os ultimos 40 itens da lista total
		if(numItensLista <= 60){
			iteracoesItensLista = 0;
		}else{
			iteracoesItensLista = numItensLista - 60;
		}

		if(numItensLista != 0){
			for(i = iteracoesItensLista; i < numItensLista; i++){
				if(listaValoresFull[i][2] == valorPreparado[2]){
					control = true;
				}
			}
			if(control == false){
				addValorLista(valorPreparado);
				//verifica a quantidade de itens na lista array listaValoresFull e limita
				if(listaValoresFull.length > 60){
					listaValoresFull.shift();
				}
				verifcAdd = true;
				listaValoresFull.push(valorPreparado);
				//Adiciona na lista string
				listaValoresString = `${listaValoresString} ${doacao} \n`;
			}else if(control == true){
				//console.log("Valor já cadastrado")
			}

			control = false;
		}else if(numItensLista == 0){
			addValorLista(valorPreparado);
		}
	}

	//Adiciona os valores na lista de valores doados
	function addValorLista(valorPAdd){
		var i, control2 = false;
		var numItensList = listaDeValoresDoados.length;
		for(i = 0; i < numItensList; i++){
			if(valorPAdd[0] == listaDeValoresDoados[i][0]){	
		 		listaDeValoresDoados[i][1] = Number(listaDeValoresDoados[i][1]) + Number(valorPAdd[1]);
		 		control2 = true;
		 	}
		}
		if(control2 == false){	
			listaDeValoresDoados.push(valorPAdd);
		}
	}

	//LOOP principal
	setInterval(function(){
		if(document.querySelectorAll("ytd-app #content ytd-page-manager ytd-watch-flexy #columns #secondary #secondary-inner ytd-live-chat-frame #chatframe")[0].contentDocument.querySelectorAll("yt-live-chat-app #item-scroller #item-offset #items yt-live-chat-paid-message-renderer")){
			var iframeDocument = document.querySelector("ytd-app #content ytd-page-manager ytd-watch-flexy #columns #secondary #secondary-inner ytd-live-chat-frame iframe").contentDocument;
			var box = iframeDocument.querySelectorAll("yt-live-chat-app #item-scroller #item-offset #items yt-live-chat-paid-message-renderer");
			var numItens = box.length;
			//console.log(numItens)
		}
		if(document.querySelectorAll("ytd-app #content ytd-page-manager ytd-watch-flexy #columns #secondary #secondary-inner ytd-live-chat-frame #chatframe")[0].contentDocument.querySelectorAll("yt-live-chat-app #item-scroller #item-offset #items yt-live-chat-paid-sticker-renderer")){
			var iframeDocument2 = document.querySelector("ytd-app #content ytd-page-manager ytd-watch-flexy #columns #secondary #secondary-inner ytd-live-chat-frame iframe").contentDocument;
			var boxSticker = iframeDocument2.querySelectorAll("yt-live-chat-app #item-scroller #item-offset #items yt-live-chat-paid-sticker-renderer");
			var numItensSticker = boxSticker.length;
			//console.log(numItensSticker)
		}

		if(numItens != 0 || numItensSticker != 0){
			if(box[numItens - 1] != undefined){

				//controla quantas iterações irá realizar
				var numIteracoes1;
				if(numItens <= 40){
					numIteracoes1 = numItens;
				}else{
					numIteracoes1 = 40;
				}
				var i;
				
				for(i = 1; i <= numIteracoes1; i++){
					var idUltimaMsg = box[numItens - i].getAttribute("id"); //pegando o id da ultima mensagem
					var itemSelect = box[numItens - i].querySelector("#card");
					var itemValor = itemSelect.querySelector("#purchase-amount");
					var valorFull = itemValor.innerHTML;
					prepareValor(valorFull, idUltimaMsg);
				}
				
			}if(boxSticker[numItensSticker - 1] != undefined){
				//controla quantas iterações irá realizar
				var numIteracoes2;
				if(numItensSticker <= 40){
					numIteracoes2 = numItensSticker;
				}else{
					numIteracoes2 = 40;
				}
				var i;
				
				for(i = 1; i <= numIteracoes2; i++){
					var idUltimaMsgS = boxSticker[numItensSticker - 1].getAttribute("id");
					var itemSelectS = boxSticker[numItensSticker - 1].querySelector("#card");
					var itemValorS = itemSelectS.querySelector("#purchase-amount-chip");
					var valorFullS = itemValorS.innerHTML;
					prepareValor(valorFullS, idUltimaMsgS);
				}
			}
		}
		else{
			console.log("Aguardando doações");
		}

		//Exibição dos valores para o cliente
		if(verifcAdd == true){
			exibeValores();
			verifcAdd = false;
		}

	}, 4000);

//})	