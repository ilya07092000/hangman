import '../styles/style.scss';
import {alphabet, words} from './data.js'


let lettersBlock = document.querySelector('.alphabet'); // Block with letters (Alphabet)
let wordPlace = document.querySelector('.word'); // Place for word to guess

// CANVAS
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

window.addEventListener("resize", () => {
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
});

// MODAL WINDOW
let modalOverlay = document.querySelector('.modal__overlay');
let modal = document.querySelector('.modal');

class GameSpace {
    constructor() {
        this._word =  ''; // PLACE FOR RANDOM WORD
        this.checkInsertion = ''; // PLACE FOR CHECK LETTERS
        this.guessedLetters = ''; // PLACE FOR GUESSED LETTERS
        this.fall = 0; // BAD TRY
    }

    randomWord() {
        this.setRandomWord = words[Math.floor(Math.random() * 30)].split(''); // FIND RADOM WORD

        this.checkInsertion = [...this.getRandomWord];
        this.guessedLetters = new Array(this.getRandomWord.length); // MAKE ARRAY FOR GUESSED LETTERS
    }

    initAlphabet() {
        lettersBlock.textContent = ''; // CLEAR ALPHABET
        alphabet.forEach(item => lettersBlock.insertAdjacentHTML( // insert aplphabet
            'beforeend',
            `<div class="alphabet__letter" data-letter="${item}">
                ${item}
                <div class="cross"></div>
            </div>`
        ))
    }

    initWordPlace() {
        wordPlace.textContent = ''; // CLEAR CONTENT IN LETTERS FIELD
        let word = this.getRandomWord;
        word.forEach(item => wordPlace.insertAdjacentHTML(
            'beforeend',
            '<div class="word-place"></div>'
        ))
    }

    fillRandomLetter(n) {
        let lettersToGuess = [...document.querySelectorAll('.word-place')]; // LETTERS TO GUESS
        
        for(let i = 0; i < n; i++) {
                let randomIndex = Math.floor(Math.random() * this.checkInsertion.length);

                while(lettersToGuess[randomIndex].textContent) { // PREVENT SAME RANDOM INDEX
                    randomIndex = Math.floor(Math.random() * this.checkInsertion.length);
                }

                let randomLetter = this.checkInsertion[randomIndex];
                lettersToGuess[randomIndex].textContent = this.checkInsertion[randomIndex]; // INSERT RANDOM LETTER

                this.checkInsertion[randomIndex] = null; // REMOVE RANDOM LETTER FROM WORD

                this.guessedLetters[randomIndex] = randomLetter; // ADD RANDOM LETTER AS GUESSED

                if(!this.checkInsertion.includes(randomLetter)) { // CHECK IF THIS RANDOM LETTER IS IN THE WORD
                    closeLetter(lettersToGuess[randomIndex].textContent); // REMOVE LETTER FROM APLPABET
                }
        }
    }

    get getRandomWord() { // GETTER FOR WORD
        return this._word; 
    }

    set setRandomWord(value) { // SETTER FOR WORD
        this._word = value;
    }
}


class App {
    static init() { // TO INIT OR RE-INIT GAME
        let game = new GameSpace();
        this.game = game;

        game.initAlphabet();
        game.randomWord();
        game.initWordPlace();

        if(game.getRandomWord.length <= 3) { // HOW MANY LETTER FORESEEN
            game.fillRandomLetter(1);
        } else if(game.getRandomWord.length > 3) {
            game.fillRandomLetter(2);
        } 

        this.lettersToGuess = [...document.querySelectorAll('.word-place')]; // LETTERS TO GUESS

        ctx.clearRect(0, 0, 500, 480); // CLEAR CANVAS PICTURE
    }
}
App.init();

lettersBlock.addEventListener('click', guesLetter);

function guesLetter(event) {
    let letter = event.target.dataset.letter;
    if(!letter) return;

    if(App.game.checkInsertion.includes(letter)) {
        let letterIndex = App.game.checkInsertion.findIndex(item => item == letter); // FIND LETTER IN WORD

        App.game.guessedLetters[letterIndex] = letter; // ADD LETTER IN GUESSED LETTERS

        App.lettersToGuess[letterIndex].textContent = letter;
        App.game.checkInsertion[letterIndex] = null;

        if(!App.game.checkInsertion.includes(letter)) { // CHECK IF WE HAVE THE SAME LETTER IN WORD
            closeLetter(letter);
        }

        if(App.game.guessedLetters.join('') == App.game.getRandomWord.join('')) { // CHECK IF WE GUESS THE WORD
            modalShow('win')
        }
        return
    }
    else {
        App.game.fall++; // +1 TO BAD ATTEMPT

        event.target.classList.add('false');
        
        switch(App.game.fall) {
            case 1:
                ctx.lineWidth = 4;
                //Нижняя дуга
                ctx.beginPath();
                ctx.bezierCurveTo(
                    canvasWidth / 2.4, 
                    canvasHeight / 1.25, 
                    canvasWidth / 1.5, 
                    canvasHeight / 1.31, 
                    canvasWidth / 1.14, 
                    canvasHeight / 1.25
                    ); 
                ctx.stroke()

                //Основа ( палка )
                ctx.beginPath();
                ctx.bezierCurveTo(
                    canvasWidth / 1.54, 
                    canvasHeight / 1.29, 
                    canvasWidth / 1.5, 
                    canvasHeight / 2.5, 
                    canvasWidth / 1.54, 
                    canvasHeight / 5
                    ); 
                ctx.stroke();
                break;
            case 2:
                // Верхняя палка
                ctx.beginPath();
                ctx.bezierCurveTo(
                    canvasWidth / 1.53, 
                    canvasHeight / 5, 
                    canvasWidth / 1.92,
                    canvasHeight / 5.5, 
                    canvasWidth / 3.69, 
                    canvasHeight / 5
                    ); 
                ctx.stroke();
                break;
            case 3:
                ctx.lineWidth = 1;

                //Веревка
                ctx.beginPath();
                ctx.bezierCurveTo(
                    canvasWidth / 3.2, 
                    canvasHeight / 5, 
                    canvasWidth / 3.243, 
                    canvasHeight / 3.84, 
                    canvasWidth / 3.2, 
                    canvasHeight / 3.125
                    ); 
                ctx.stroke();
                break;
            case 4:
                // Голова
                ctx.beginPath();
                ctx.arc(
                    canvasWidth / 3.2,
                    canvasHeight / 2.7,
                    canvasWidth / 19.2,
                    0,
                    Math.PI*2,
                    true);

                // Левый глаз (крест)
                ctx.moveTo(canvasWidth / 3.47, canvasHeight / 2.85);
                ctx.lineTo(canvasWidth / 3.31, canvasHeight / 2.77);
                ctx.moveTo(canvasWidth / 3.31, canvasHeight / 2.85);
                ctx.lineTo(canvasWidth / 3.47, canvasHeight / 2.77);

                // Правый глаз (крест)
                ctx.moveTo(canvasWidth / 3, canvasHeight / 2.85);
                ctx.lineTo(canvasWidth / 3.13, canvasHeight / 2.77);
                ctx.moveTo(canvasWidth / 3.13, canvasHeight / 2.85);
                ctx.lineTo(canvasWidth / 3, canvasHeight / 2.77);
                ctx.stroke();

                // Рот
                ctx.moveTo(0, 0);
                ctx.beginPath();
                ctx.bezierCurveTo(
                    canvasWidth / 3.52, 
                    canvasHeight / 2.56, 
                    canvasWidth / 3.2, 
                    canvasHeight / 2.7, 
                    canvasWidth / 2.9, 
                    canvasHeight / 2.56
                    ); 
                ctx.stroke();
                break;
            case 5: 
                // Туловище
                ctx.beginPath();
                ctx.moveTo(canvasWidth / 3.2, canvasHeight / 2.38)
                ctx.lineTo(canvasWidth / 3.2, canvasHeight / 1.78)
                ctx.stroke();

                // Левая рука
                ctx.beginPath();
                ctx.moveTo(canvasWidth / 3.2, canvasHeight / 2.35)
                ctx.lineTo(canvasWidth / 4, canvasHeight / 2.083)
                ctx.stroke();

                // Правая рука
                ctx.beginPath();
                ctx.moveTo(canvasWidth / 3.2, canvasHeight / 2.35)
                ctx.lineTo(canvasWidth / 2.66, canvasHeight / 2.083)
                ctx.stroke();
                break;
            case 6:
                // Левая нога
                ctx.beginPath();
                ctx.moveTo(canvasWidth / 3.2, canvasHeight / 1.78)
                ctx.lineTo(canvasWidth / 3.69, canvasHeight / 1.42)
                ctx.stroke();

                // Правая нога
                ctx.beginPath();
                ctx.moveTo(canvasWidth / 3.2, canvasHeight / 1.78)
                ctx.lineTo(canvasWidth / 2.66, canvasHeight / 1.42)
                ctx.stroke();
                modalShow('lose');
                break;
        }
    }
}

function closeLetter(letter) {
    let alphabet = [...document.querySelectorAll('.alphabet__letter')];
    let currentLetter = alphabet.find(item => item.dataset.letter == letter);
    currentLetter.classList.add('disabled');
}

function modalShow(result) {
    let content = ``;
    if(result == 'win') {
        content = `
            <h2 class="win">You win</h2>
            <p>It was ${App.game.getRandomWord.join('')}</p>
        `
        modal.innerHTML  = content;
        modalOverlay.classList.add('active')
    } else {
        content = `
            <h2 class="lose">You lose</h2>
            <p>It was ${App.game.getRandomWord.join('')}</p>
        `
        modal.innerHTML  = content;
        modalOverlay.classList.add('active')
    }
    setTimeout(() => {
        modalOverlay.classList.remove('active');
        App.init();
    }, 2000)
}



