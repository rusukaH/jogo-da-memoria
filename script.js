const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"


//--------------------------------------------------------------//

startGame();

//Função para iniciar o jogo
function startGame() {

    initializeCards(game.createCardsFromTechs());
}

//Iniciando as cartas no site
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerText = ''; //Limpar o tabuleiro
    game.cards.forEach(card => {

        //Colocando um icone em cada carta
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })

}

//Definindo o que tem na frente e atrás da carta
function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);


}

//Colocando o ícone na frente da carta, se não tiver entrega o lt = lower then, gt = greater then
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imgs/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

//Função que filppa as cartas.
function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if(game.secondCard){
        if (game.checkMatch()) {
            game.clearCards();

            //Setando o game over
            if(game.checkGameOver()){
                let gameOverLayer = document.getElementById("gameOver");
                gameOverLayer.style.display = "flex";
            }
        } else {
            setTimeout(() => {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');

                game.unflipCards();
            }, 1000);
            };
        }
    }
};


function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";


}
