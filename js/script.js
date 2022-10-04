const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
    //remaining guesses span
const span = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuessesNumber = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};


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

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, pick another!"
    } else {
        guessedLetters.push(guess);
        showGuessedLetters();
        updateWordProgress(guessedLetters);
        countGuessesRemaining(guess);
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

const countGuessesRemaining = function (guess){
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guess)) {
        message.innerText = `Good guess!`;
    } else {
        remainingGuessesNumber -= 1;
        message.innerText = `Sorry, the word has no ${guess}`;
    };
   
    if (remainingGuessesNumber === 0) {
        message.innerText = `Sorry, there are no guesses remaining. The word is ${word}.`;
        span.innerText = `${remainingGuessesNumber} guesses`;
        startOver();
    } else if (remainingGuessesNumber === 1) {
        span.innerText = `${remainingGuessesNumber} guess`;
    } else {
        span.innerText = `${remainingGuessesNumber} guesses`;
    }
};

//not working
const checkIfWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        
        startOver();
    }

};

const startOver = function (){
    guessButton.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    wordProgress.classList.add("hide");

    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    wordProgress = [];
    remainingGuessesNumber = 8;
    guessedLetters = [];
    span.innerText = `${remainingGuessesNumber} guesses`;

    getWord();

    guessButton.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    wordProgress.classList.remove("hide");
    playAgainButton.classList.add("hide");
});