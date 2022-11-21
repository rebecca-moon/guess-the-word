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
let guessedLetters = [];
let remainingGuessesNumber = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
// pull word and kickoff game
getWord();
// display symbols as placeholder for each letter
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};

// pull and validate guess input
guessButton.addEventListener("click", function (e){
    e.preventDefault();
    message.innerText = "";
    const inputValue = input.value;

    const goodGuess = checkInput(inputValue);

    if (goodGuess) {
        makeGuess(inputValue);
    }

    input.value="";

});

//validate guess input
const checkInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please guess a letter.";    
    } else if (input.length > 1) {
        message.innerText = "Please guess only one letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please guess a letter from A to Z.";
    } else {
        return input;
    }
};

//check for letter in word
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, pick another!"
    } else {
        guessedLetters.push(guess);
        countGuessesRemaining(guess);
        showGuessedLetters();
        updateWordProgress(guessedLetters);
    };
};

//show list of guessed letters
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        guessedLettersElement.append(li);
        li.innerText = letter;
    };
};

//update word in progress with guessed letters
const updateWordProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
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

//update guess counter
const countGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guess)) {
        message.innerText = `Good guess!`;
    } else {
        remainingGuessesNumber -= 1;
        message.innerText = `Sorry, the word has no ${guess}`;
    };
   
    if (remainingGuessesNumber === 0) {
        message.innerHTML = `Sorry, there are no guesses remaining. The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuessesNumber === 1) {
        span.innerText = `${remainingGuessesNumber} guess`;
    } else {
        span.innerText = `${remainingGuessesNumber} guesses`;
    }
};

//check for win
const checkIfWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        
        startOver();
    }

};

//start the game over
const startOver = function (){
    //hide Guess button
    guessButton.classList.add("hide");
    //hide ul where guessed letters appear
    guessedLettersElement.classList.add("hide");
    //hide paragraph where remaining guesses displays
    remainingGuesses.classList.add("hide");
    //show button to play again
    playAgainButton.classList.remove("hide");
};

//reset all original values
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters = [];
    guessedLettersElement.innerHTML = "";
    remainingGuessesNumber = 8;
    span.innerText = `${remainingGuessesNumber} guesses`;

//pull new word
    getWord();

//reset UI
    guessButton.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuesses.classList.remove("hide");
});