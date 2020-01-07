var cards = new Array(16);
var k;

function create_cards (){
    for (k = 0 ; k < 16 ; k++){
        cards[k] = {
            div: document.createElement('div'),
            background: 'white',
            value: 0};//value 0, a carta está virada, value 1, a carta está desvirada
        cards[k].div.setAttribute('class', 'cards');
        cards[k].div.style.transform = 'rotateY(180deg)';
        document.getElementById('game-field').appendChild(cards[k].div);

        cards[k].div.setAttribute('onclick', 'turn_card(' + k + ')');
    }
    define_background_cards();
}

var par = 0;
var cont = 0;
var card;

function define_background_cards (){
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
    // set_colors();
}

function set_colors (){
    for (k = 0 ; k < 16 ; k++){
        cards[k].div.style.background = cards[k].background;
        cards[k].div.style.backgroundSize = 'cover';
        cards[k].div.style.backgroundPosition = 'center';
    }
}

function turn_card (i){
    cards[i].div.style.transform = 'rotateY(0deg)';
    cards[i].div.style.background = cards[i].background;
    cards[i].div.style.backgroundSize = 'cover';
    cards[i].div.style.backgroundPosition = 'center';
}