let game = {
    
    
    //Criando as cartas
    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: null,


    lockMode: false, //Não travando as cartas inicialmente
    firstCard: null, //Não virar a primeira carta inicialmente
    secondCard: null, //Não virar a segunda carta inicialmente


    //Verificando se está certo
    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);
        if (card.flipped || this.lockMode) {
            return false;
        }
        //Sempre que ocorrer uma verificação será alterado de falso para verdadeiro
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }


    },

    //Checagem das cartas, conferindo se os cards são iguais
    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            returnfalse;
        }
        return this.firstCard.icon === this.secondCard.icon;

    },

    //Limpar as cartas quando viradas
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    //Desvirar as cartas (estava ocorrendo um bug que deixavam as cartas viradas)
    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },


    checkGameOver(){
       return this.cards.filter(card=>!card.flipped).length == 0;
    },


    // Criando as cartas a partir das tecnologias
    createCardsFromTechs: function () {

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })
        //Flatmap serve para desmembrar as strings, fazendo com que tenha 20 cartas.
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;

    },

    //Criando um par de cartas
    createPairFromTech: function (tech) {

        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    //Criando um ID aleatório para cada carta
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },


    //Embaralhando as cartas
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;


        while (currentIndex !== 0) {

            //Criar um número aleatório, embaralhando de acordo com a quantidade de cartas
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            //Embaralhando de trás para frente
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];


        }
    }


}