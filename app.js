let nome = prompt("Qual é o seu nome?");
let limiteTentativas = 4;
let listaDeNumerosSorteados = [];
let limiteDeNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio();
	console.log(numeroSecreto);

let tentativas = 1;

function exibirTextoNaTela(tag, texto){
	let campo = document.querySelector(tag);
	campo.innerHTML = texto;
	//responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', `${nome}, escolha um número entre 1 e 10, você tem ${limiteTentativas - 1} tentativas.`);

function verificarChute(){
	let chute = document.querySelector('input').value;
	console.log(chute == numeroSecreto);

	if (chute == numeroSecreto){
		exibirTextoNaTela('h1', 'Acertou, miserável!');
		let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
		let mensagemTentativas = `Parabéns, ${nome}! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
		exibirTextoNaTela('p', mensagemTentativas);
		document.getElementById('reiniciar').removeAttribute('disabled');

	} else {
		if (chute > numeroSecreto) {
			exibirTextoNaTela('h1', 'Tente novamente');
			exibirTextoNaTela('p', `O número secreto é MENOR que ${chute}!`);
		} else {
			exibirTextoNaTela('h1', 'Tente novamente');
			exibirTextoNaTela('p', `O número secreto é MAIOR que ${chute}!`);
		}
		tentativas++;
		limparCampo();
		pararJogo();
		}
}

function gerarNumeroAleatorio() {
	let numeroEscolhido =  parseInt(Math.random()* limiteDeNumeros + 1);
	let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

	if (quantidadeDeElementosNaLista == limiteDeNumeros) {
		listaDeNumerosSorteados = [];
	}

	if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
		return gerarNumeroAleatorio();
	} else {
		listaDeNumerosSorteados.push(numeroEscolhido);
		console.log(listaDeNumerosSorteados);
		return numeroEscolhido;
	}

}

function limparCampo() {
	chute = document.querySelector('input');
	chute.value = '';
}

function reiniciarJogo() {
	numeroSecreto = gerarNumeroAleatorio();
	console.log(numeroSecreto);
	limparCampo();
	tentativas = 1;
	exibirTextoNaTela('h1', 'Jogo do número secreto');
	exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
	document.getElementById('reiniciar').setAttribute('disabled', true);
}

function pararJogo() {
	if (tentativas >= limiteTentativas) {
		exibirTextoNaTela('h1', 'Suas tentativas acabaram.');
		exibirTextoNaTela('p', `O número secreto é ${numeroSecreto}.`);
		document.getElementById('reiniciar').removeAttribute('disabled');
		//reiniciarJogo();
	}
}