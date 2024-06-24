const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarEpausarBt = document.querySelector('#start-pause span');
const buttonIMG = document.querySelector('.app__card-primary-butto-icon');
const tempoTela = document.querySelector('#timer');
const horaAtual = document.querySelector('.tempoAtual');

const musica = new Audio('sons/luna-rise-part-one.mp3');
const startPauseBt = document.querySelector('#start-pause');
const audioStart = new Audio('sons/play.wav');
const audioEnd = new Audio('sons/beep.mp3');
const audioPause = new Audio('sons/pause.mp3');

musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intevaloID = null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
            musica.play()
        } else {
            musica.pause()
        }
});

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco": 
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `

            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `

            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioEnd.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarEpausar)

function iniciarEpausar() {
    if(intevaloID) {
        zerar()
        audioPause.play()
        return
    }
    audioStart.play()
    intevaloID = setInterval(contagemRegressiva, 1000)
    iniciarEpausarBt.textContent = "Pausar"
    buttonIMG.setAttribute('src', `/imagens/pause.png`)
}

function zerar () {
    clearInterval(intevaloID)
    iniciarEpausarBt.textContent = "Começar"
    buttonIMG.setAttribute('src', `/imagens/play_arrow.png`)
    intevaloID = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado= tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

function horario () {
    const formatTime = (timeUnit) => (timeUnit < 10 ? `0${timeUnit}` : timeUnit);
    const currentDate = new Date();


    const horas = currentDate.getHours(); // Acessa as horas 
    const minutos = currentDate.getMinutes(); // Acessa os minutos
    
    horaAtual.innerHTML = `${formatTime(horas)} : ${formatTime(minutos)}`
    
}
horario();
mostrarTempo();
