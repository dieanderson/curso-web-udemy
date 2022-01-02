var largura = 0
var altura  = 0
var vidas   = 1
var tempo   = 15

var criaMosquitoTempo = 1500

//recebe o nivel da url, usa o metodo search para pegar apenas o parametro
//usa o replace para trocar ? por ''
var nivel = window.location.search
nivel = nivel.replace('?', '')

//define a velocidade do jogo de acordo com o nivel selecionado
if(nivel === 'mariana'){
    criaMosquitoTempo = 2000
}else if(nivel === 'normal'){
    criaMosquitoTempo = 1500
}else if(nivel === 'dificil'){
    criaMosquitoTempo = 1000
}else if(nivel === 'chucknorris'){
    criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo(){
    largura = window.innerWidth
    altura  = window.innerHeight
}

ajustaTamanhoPalcoJogo()

//cria cronometro
var cronometro = setInterval(function(){
    tempo -= 1
    //se o tempo acabar é declarada vitoria
    if(tempo < 0){
        //limpa os interval para nao continuar com o cronometro nem criar mais mosquitos
        //redireciona para a pagina vitoria
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo    
    }
}, 1000)

function posicaoRandomica(){
    //remover o mosquito anterior(caso exista)
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        
        //se vidas chegou a 3 fim de jogo
        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html'
        }else{
            //se o objeto nao foi clicado a tempo, exibe coração vazio
            //e incrementa vidas
            document.getElementById('v'+vidas).src="imagens/coracao_vazio.png"
            vidas++
        }
    }

    //cria posições randomicas de acordo com coordenadas limites
    //estamos subtraindo 90 para dar uma folga por conta do tamanho da img do mosquito
    var posicaoX = Math.floor( Math.random() * largura ) - 90
    var posicaoY = Math.floor( Math.random() * altura ) - 90
    
    //se posicao menor que zero, posicao recebe zero, senao recebe posicao
    //necessario para evitar valores negativos
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY
    
    //criar elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio()+' '+ladoAleatorio()
    mosquito.style.left = posicaoX+'px'
    mosquito.style.top = posicaoY+'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    //se clica no mosquito a tempo, remove o elemento
    mosquito.onclick = function(){
        this.remove()
    }
    
    //adicionar elemento criado
    document.body.appendChild(mosquito)
}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3) 
    
    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2) 
    
    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'        
    }    
}

function iniciarJogo(){
    var nivel = document.getElementById('nivel').value

    if(nivel === ''){
        alert('Selecione um nível para iniciar o jogo')
        return false    
    }
    //concatena o nivel na url de chamada da pagina do jogo
    window.location.href='app.html?'+nivel     
}






