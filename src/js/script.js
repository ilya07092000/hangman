import '../styles/style.scss';
import {alphabet, words} from './data.js'


let lettersBlock = document.querySelector('.alphabet'); // Block with letters (Alphabet)
let wordPlace = document.querySelector('.word'); // Place for word to guess

class GameSpace {
    constructor() {
        this._word =  ''; // PLACE FOR RANDOM WORD
        this.checkInsertion = ''; // PLACE FOR CHECK LETTERS
        this.guessedLetters = ''; // PLACE FOR GUESSED LETTERS
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

                while(lettersToGuess[randomIndex].textContent) {
                    randomIndex = Math.floor(Math.random() * this.checkInsertion.length);
                }

                let randomLetter = this.checkInsertion[randomIndex];
                lettersToGuess[randomIndex].textContent = this.checkInsertion[randomIndex];

                this.checkInsertion[randomIndex] = null;

                this.guessedLetters[randomIndex] = randomLetter;

                if(!this.checkInsertion.includes(randomLetter)) {
                    closeLetter(lettersToGuess[randomIndex].textContent);
                }
        }
    }

    get getRandomWord() {
        return this._word;
    }

    set setRandomWord(value) {
        this._word = value;
    }
}


class App {
    static init() {
        let game = new GameSpace();
        this.game = game;

        game.initAlphabet();
        game.randomWord();
        game.initWordPlace();

        if(game.getRandomWord.length <= 3) {
            game.fillRandomLetter(1);
        } else if(game.getRandomWord.length > 3) {
            game.fillRandomLetter(2);
        } 

        this.lettersToGuess = [...document.querySelectorAll('.word-place')]; // LETTERS TO GUESS
    }
}
App.init();


lettersBlock.addEventListener('click', guesLetter);

function guesLetter(event) {
    let letter = event.target.dataset.letter;
    if(!letter) return;

    if(App.game.checkInsertion.includes(letter)) {
        let letterIndex = App.game.checkInsertion.findIndex(item => item == letter);

        App.game.guessedLetters[letterIndex] = letter;

        App.lettersToGuess[letterIndex].textContent = letter;
        App.game.checkInsertion[letterIndex] = null;

        if(!App.game.checkInsertion.includes(letter)) {
            closeLetter(letter);
        }

        if(App.game.guessedLetters.join('') == App.game.getRandomWord.join('')) {
           setTimeout(() => {
            alert('GG')
            App.init()
           }, 0)
        }
    }
}

function closeLetter(letter) {
    let alphabet = [...document.querySelectorAll('.alphabet__letter')];
    let currentLetter = alphabet.find(item => item.dataset.letter == letter);
    currentLetter.classList.add('disabled');
}

let reloadBtn = document.querySelector('.reload');
reloadBtn.addEventListener('click', () => {
    App.init();
})

// PICTURE

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

ctx.lineWidth = 4;

//Нижняя дуга
ctx.beginPath();
ctx.bezierCurveTo(200, 400, 320, 380, 420, 400); 
ctx.stroke()

//Основа ( палка )
ctx.beginPath();
ctx.bezierCurveTo(310, 385, 320, 200, 310, 100); 
ctx.stroke();

// Верхняя палка
ctx.beginPath();
ctx.bezierCurveTo(312, 100, 250, 90, 130, 100); 
ctx.stroke();

ctx.lineWidth = 1;

//Основа ( палка )
ctx.beginPath();
ctx.bezierCurveTo(150, 100, 148, 130, 150, 160); 
ctx.stroke();

// Голова
ctx.beginPath();
ctx.arc(150,185,26,0,Math.PI*2,true);
// Левый глаз (крест)
ctx.moveTo(138, 175);
ctx.lineTo(145, 180);
ctx.moveTo(145, 175);
ctx.lineTo(138, 180);

// Правый глаз (крест)
ctx.moveTo(160, 175);
ctx.lineTo(153, 180);
ctx.moveTo(153, 175);
ctx.lineTo(160, 180);
ctx.stroke();

// Рот
ctx.moveTo(0, 0);
ctx.beginPath();
ctx.bezierCurveTo(136, 195, 150, 185, 165, 195); 
ctx.stroke();

// Туловище
ctx.beginPath();
ctx.moveTo(150, 210)
ctx.lineTo(150, 280)
ctx.stroke();

// Левая рука
ctx.beginPath();
ctx.moveTo(150, 212)
ctx.lineTo(120, 240)
ctx.stroke();

// Правая рука
ctx.beginPath();
ctx.moveTo(150, 212)
ctx.lineTo(180, 240)
ctx.stroke();

// Левая нога
ctx.beginPath();
ctx.moveTo(150, 280)
ctx.lineTo(130, 350)
ctx.stroke();

// Правая нога
ctx.beginPath();
ctx.moveTo(150, 280)
ctx.lineTo(180, 350)
ctx.stroke();

