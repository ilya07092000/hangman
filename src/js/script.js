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