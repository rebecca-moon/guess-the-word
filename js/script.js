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
    letter = letter.toUpperCase();
    
    if (guessedLetters.includes(letter)) {
        message.innerText = "You already guessed that letter, pick another!"
    } else {
        guessedLetters.push(letter);
        showGuessedLetters();
        updateWordProgress(guessedLetters);
    };
    console.log(guessedLetters);
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        guessedLettersElement.append(li);
        li.innerText = letter;
    };
};

const updateWordProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray)
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordProgress.innerText = revealWord.join("");
    checkIfWin();
};

const checkIfWin = function () {
    if (wordProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};