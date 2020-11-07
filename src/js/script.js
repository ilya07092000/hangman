import '../styles/style.scss';
import {alphabet, words} from './data.js'


let lettersBlock = document.querySelector('.alphabet'); // Block with letters (Alphabet)
let wordPlace = document.querySelector('.word'); // Place for word to guess

class GameSpace {
    constructor() {
        this._word =  '';
        this.firstLetterIndex = '';
        this.lettersToGuess = '';
    }

    randomWord() {
        this._word = words[Math.floor(Math.random() * 30)];
    }

    initAlphabet() {
        lettersBlock.textContent = '';
        alphabet.forEach(item => lettersBlock.insertAdjacentHTML( // insert aplphabet
            'beforeend',
            `<div class="alphabet__letter" data-letter="${item}">
                ${item}
                <div class="cross"></div>
            </div>`
        ))
    }

    initWordPlace() {
        wordPlace.textContent = '';
        let word = this.getRandomWord.split('');
        word.forEach(item => wordPlace.insertAdjacentHTML(
            'beforeend',
            '<div class="word-place"></div>'
        ))
    }

    fillRandomLetter() {
        let lettersToGuess = [...document.querySelectorAll('.word-place')]; // LETTERS TO GUESS
        let randomLetterIndex = Math.floor(Math.random() * lettersToGuess.length);
        lettersToGuess[randomLetterIndex].textContent = this.getRandomWord[randomLetterIndex];
        this.firstLetterIndex = randomLetterIndex;

        let nWord = this._word.split('');
        nWord[randomLetterIndex] = null;
        this.setRandomWord = nWord;

        if(!this.getRandomWord.includes(lettersToGuess[randomLetterIndex].textContent)) {
            closeLetter(lettersToGuess[randomLetterIndex].textContent);
        }
    }

    get getRandomWord() {
        return this._word;
    }

    set setRandomWord(value) {
        this._word = value;
    }

    set letterToGuessSetter(arr) {
        this.lettersToGuess = arr;
    }
}


class App {
    static init() {
        let game = new GameSpace();
        this.game = game;

        game.initAlphabet();
        game.randomWord();
        game.initWordPlace();
        game.fillRandomLetter();
        game.letterToGuessSetter = [...document.querySelectorAll('.word-place')];
        this.randomWord = game.getRandomWord;
    }
}
App.init();

lettersBlock.addEventListener('click', guesLetter);

function guesLetter(event) {
    let letter = event.target.dataset.letter;
    if(!letter) return;

    if(App.randomWord.includes(letter)) {
        let letterIndex = App.randomWord.findIndex(item => item == letter);
        App.game.lettersToGuess[letterIndex].textContent = letter;
        App.randomWord[letterIndex] = null;

        if(!App.randomWord.includes(letter)) {
            closeLetter(letter);
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
