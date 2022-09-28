const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
    //remaining guesses span
const span = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e){
    e.preventDefault();
    const inputValue = input.value;
    console.log(inputValue);
    input.value = "";
    message.innerText = "";

    const goodGuess = checkInput(inputValue);
    console.log(goodGuess);

    if (goodGuess) {
        makeGuess(inputValue);
    }

});

const checkInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please guess one letter";    
    } else if (input.length > 1) {
        message.innerText = "Please guess only one letter";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please guess letters only";
    } else {
        return input;
    }
};

const makeGuess = function (letter) {
    letter.toUpperCase();
    
    if (guessedLetters.includes(letter)) {
        message.innerText = "You already guessed that letter, pick another!"
    } else {
        guessedLetters.push(letter);
    };
    console.log(guessedLetters);
};