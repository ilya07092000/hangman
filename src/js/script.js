import '../styles/style.scss';
import {alphabet, words} from './data.js'


let lettersBlock = document.querySelector('.alphabet'); // Block with letters (Alphabet)
let wordPlace = document.querySelector('.word'); // Place for word to guess

class GameSpace {
    constructor() {
        this._word =  '';
    }

    randomWord() {
        this._word = words[Math.floor(Math.random() * 30)];
    }

    initAlphabet() {
        alphabet.forEach(item => lettersBlock.insertAdjacentHTML( // insert aplphabet
            'beforeend',
            `<div class="alphabet__letter" data-letter="${item}">${item}</div>`
        ))
    }

    initWordPlace() {
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
    }

    get getRandomWord() {
        return this._word;
    }
}

class App {
    static init() {
        let game = new GameSpace();
        game.initAlphabet();
        game.randomWord();
        game.initWordPlace();
        game.fillRandomLetter();
        this.randomWord = game.getRandomWord;
    }
}

App.init();




// lettersBlock.addEventListener('click', guesLetter);
// function guesLetter(event) {
//     let letter = event.target.dataset.letter;
//     if(!letter) return;
// }


