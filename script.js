var cards = [];

let vezJogador = 1; //1 para o primeiro, 2 para o segundo
let vez = document.querySelector('strong#jogador');
vez.innerHTML = vezJogador;

let jogador1 = 0; //Pontuação dos jogadores
let jogador2 = 0;

var numero_de_jogadas = 16;

var pares_nao_encontrados = 8;

var info_jogadas_restantes = document.getElementById('jogadas-restantes');
info_jogadas_restantes.innerText = numero_de_jogadas;

var gameField = document.getElementById('game-field');
gameField.onload = create_cards();

function CardsInfo(div, background, value) {
    this.div = div;
    this.background = background;
    this.value = value;
}

function create_cards() {
    for (var k = 0; k < 16; k++) {
        cards[k] = new CardsInfo(document.createElement('div'), 'white', 0);
        cards[k].div.setAttribute('class', 'cards');
        gameField.appendChild(cards[k].div);

        cards[k].div.setAttribute('onclick', 'ativaClasse(' + k + '); controlarMovimento(' + k + ')');
    }
    define_background_cards();
    setTimeout(showAllCards, 1000);
    setTimeout(hideCards, 2000);

}

function define_background_cards() {
    var par = 0;
    var cont = 0;
    var card;

    for (k = 0; k < 16; k++) {
        cont++;
        //Math.floor(Math.random() * (max - min + 1) + min)
        card = Math.floor(Math.random() * (15 - 0 + 1) + 0);
        if (cards[card].background === 'white') {
            switch (par) {
                case 0:
                    cards[card].background = 'url(./img/angular.png)';
                    break;
                case 1:
                    cards[card].background = 'url(./img/java.png)';
                    break;
                case 2:
                    cards[card].background = 'url(./img/javascript.png)';
                    break;
                case 3:
                    cards[card].background = 'url(./img/c.png)';
                    break;
                case 4:
                    cards[card].background = 'url(./img/python.png)';
                    break;
                case 5:
                    cards[card].background = 'url(./img/node.png)';
                    break;
                case 6:
                    cards[card].background = 'url(./img/vue.png)';
                    break;
                case 7:
                    cards[card].background = 'url(./img/react.png)';
                    break;
            }
            if (cont == 2) {
                par++;
                cont = 0;
            }
        } else {
            k--;
            cont--;
        }
    }

    setIDsToCards(cards);

}

//Função para virar e desvirar card

function ativaClasse(i) {
    cards[i].div.style.backgroundImage = cards[i].background;
    cards[i].div.classList.toggle('active');
}

function desativaClasse(i) {
    cards[i].div.style.background = 'url(./img/back.png)';
    cards[i].div.style.backgroundSize = 'cover';
}

function showAllCards() {
    for (var k = 0; k < 16; k++) {
        ativaClasse(k);
    }
}

function hideCards() {
    for (var k = 0; k < 16; k++) {
        cards[k].div.classList.remove('active');
        desativaClasse(k);
    }
}

//Váriaveis de controle para funções abaixo

var count = 0;
var arr = [];
var ind;

//Funções Auxiliares

function controlarMovimento(i) {

    if (document.querySelector('.active') !== null && ind !== i) {
        count++;
        arr.push(cards[i]);
        ind = i;
        if (count === 2) {
            verificarIgualdade(arr);
            count = 0;
            arr = [];
        }
    }

}

function setIDsToCards(cards) {

    let checkedCards = [];

    cards.forEach(card => {

        let equal = checkedCards.find(el => {
            if (el.background == card.background) return el;
        });

        if (equal) {
            card.id = equal.id;
        } else {

            let id = Math.floor(Math.random() * (100 - 1)) + 1;
            checkedCards.push({
                background: card.background,
                id
            });

            card.id = id;

        }

    });

}

function atualizaVez() {
    if (vezJogador === 1) {
        vezJogador++; //Atualiza pra vez do jogador 2
        vez.innerHTML = vezJogador;
    } else {
        vezJogador--; //Atualiza pra vez do jogador 1
        vez.innerHTML = vezJogador;
    }
}

function verificarIgualdade(arr) {
    if (arr[0].id === arr[1].id) {
        console.log('acertou');

        if (vezJogador === 1)
            jogador1++;
        else
            jogador2++;

        arr[0].div.removeAttribute('onclick');
        arr[0].value = 1;
        arr[1].div.removeAttribute('onclick');
        arr[1].value = 1;
        pares_nao_encontrados--;
    } else {
        atualizaVez();
        setTimeout(function () {
            arr[0].div.classList.remove('active');
            arr[0].div.style.background = 'url(./img/back.png)';
            arr[0].div.style.backgroundSize = 'cover';
            arr[1].div.classList.remove('active');
            arr[1].div.style.background = 'url(./img/back.png)';
            arr[1].div.style.backgroundSize = 'cover';
        }, 500);
    }
    if (numero_de_jogadas > 0) {
        numero_de_jogadas--;
    }
    if (numero_de_jogadas == 0) {
        end_game();
    }
    if (pares_nao_encontrados == 0) {
        end_game();
    }
    info_jogadas_restantes.innerText = numero_de_jogadas;
}

function end_game() {
    let cartas_nao_descobertas = 0;
    for (k = 0; k < 16; k++) {
        if (cards[k].value == 0) {
            cards[k].div.removeAttribute('onclick');
            cartas_nao_descobertas++;
        }
    }
    if (cartas_nao_descobertas == 0) {
        alert('Você ganhou!, conseguiu encontrar todos os pares');
    } else {
        alert('Você perdeu!, não conseguiu encontrar todos os pares');
    }
    alert(`Jogador1: ${jogador1} pontos.\nJogador2: ${jogador2} pontos.`)
    if (jogador1 > jogador2)
        alert('O vencedor foi o jogador 1.');
    else if(jogador2 > jogador1)
        alert('O vencedor foi o jogador 2.');
    else
        alert('Empate.');
}

function reload() {
    window.location.reload();
}