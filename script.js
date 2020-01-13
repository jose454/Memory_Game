var cards = [];

var gameField = document.getElementById('game-field');
gameField.onload = create_cards();

function CardsInfo(div,background,value) {
    this.div = div;
    this.background = background;
    this.value = value;
}

function create_cards() {
    for (var k=0;k<16;k++) {
        cards[k] = new CardsInfo(document.createElement('div'),'white',0);
        cards[k].div.setAttribute('class','cards');
        gameField.appendChild(cards[k].div);

        cards[k].div.setAttribute('onclick','ativaClasse(' + k + '); controlarMovimento('+k+')');
    }
    define_background_cards();
    setTimeout(showAllCards,1000);
    setTimeout(hideCards,2000);

}

function define_background_cards (){
    var par = 0;
    var cont = 0;
    var card;

    for (k = 0 ; k < 16 ; k++){
        cont++;
        //Math.floor(Math.random() * (max - min + 1) + min)
        card = Math.floor(Math.random() * (15 - 0 + 1) + 0);
        if (cards[card].background === 'white'){
            switch (par){
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
            if (cont == 2){
                par++;
                cont = 0;
            }
        }
        else {
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

function showAllCards() {
    for (var k=0;k<16;k++) {
        ativaClasse(k);
    }
}

function hideCards() {
    for (var k=0;k<16;k++) {
        cards[k].div.classList.remove('active');
    }
}

//Váriaveis de controle para funções abaixo

var count = 0;
var arr = [];
var ind;

//Funções Auxiliares

function controlarMovimento(i) {

    if (document.querySelector('.active') !== null && ind!==i) {
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

function setIDsToCards(cards){

    let checkedCards = [];

    cards.forEach(card=>{

        let equal = checkedCards.find(el=>{
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

function verificarIgualdade(arr) {
    if(arr[0].id === arr[1].id) {
        console.log('acertou');
        arr[0].div.removeAttribute('onclick');
        arr[1].div.removeAttribute('onclick');
    }
    else {
        setTimeout(function(){
            arr[0].div.classList.remove('active');
            arr[1].div.classList.remove('active');
        },500);
    }
}