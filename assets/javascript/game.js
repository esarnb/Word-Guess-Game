/**
 * Word Search Game
 * 
 * By: Esar Behlum
 */

/*  List of potential words to use */
var potentialWords = ["Alpha", "Beta", "Theta", "Kappa", "Omega"];

/** 
 * Gate to stop key listener during a game's end
 * 
 * So that it does not continue updating, incrementing, 
 * and repeatedly reset the game every key press 
 */
var awaiting = false;

/* Array of key-letters guessed*/
var usedKeys;

/**
 * Single declaration to update when getting 
 * a random word from the array potentialWords
 */
var randomWord;

/* Stat counters */
var winCount = 0;
var guessCount = 12;

//Pointers to html tags for updating visuals
var endPrompt = document.getElementById("end");
var wins = document.getElementById("Wins");
var guesses = document.getElementById("Guesses");
var used = document.getElementById("Used");
var wordUpdate = document.getElementById("WORD");
var endPrompt = document.getElementById("endPrompt");

/**
 * Function ran during every new game to reset game
 */
function initializer() {
    if (!awaiting) {
        //Get new Random Word
        randomWord = potentialWords[Math.floor(Math.random() * potentialWords.length)].toLowerCase();
        //Reset used keys to none
        usedKeys = [];
        //Reset counter for amount of tries
        guessCount = 12;
        //Reset hiddenWord letters to zero
        hiddenWord = [];
        /* Initialize array of new hidden Word underscores */
        for (var i = 0; i < randomWord.length; i++) { hiddenWord.push("_") }
        /* Reset win/loss prompt*/
        endPrompt.textContent = "";
    }
}

/**
 * Function ran everytime a key is pressed and ending game,
 * to update the user after every move
 */
function updateElements() {
    if (!awaiting) {
        wins.textContent = "Wins: " + winCount;
        guesses.textContent = "Guesses Left: " + guessCount;
        used.textContent = "Keys Used: " + usedKeys.join(" ");
        wordUpdate.textContent = hiddenWord.join(" ");
    }
    
}

/**
 * Enable gate to prevent overflow of keys,
 * Inform the user for 3s win/loss,
 * then reset and update the visual for a new game
 */
function endGame() {
    awaiting = true;
    setTimeout(function () {
        awaiting = false;
        initializer();
        updateElements();
    }, 3000)
}

//Begin the game and show the user a fresh start
initializer();
updateElements();


/* Load in key logger*/
document.onkeypress = function (pressed) {
    //Filter out excess data, only use letter pressed
    pressed = pressed.key;

    //If the letter has not been pressed yet
    if (!usedKeys.includes(pressed)) {

        //If the letter is in the hidden word (randomWord)
        if (randomWord.includes(pressed)) {

            //Iterate through the random/hidden to uncover the letter
            for (var i = 0; i < randomWord.length; i++) {

                if (randomWord.charAt(i) === pressed) {
                    hiddenWord[i] = pressed;
                    wordUpdate.textContent = hiddenWord;
                }
            }
        }


        /** Incorrect key hit, decrement tries left */
        else {
            if (guessCount > 0) {
                guessCount--;
            }
        }

        //Update list so user doesn't use the key again. Update visual to user.
        usedKeys.push(pressed);
        updateElements();

        
        /** User found all the letters: increment wins, tell user, wait 3s to reset game and update. */
        if (!hiddenWord.includes("_") && !awaiting) {
            winCount++;
            endPrompt.textContent = "You Win!";
            endGame();
        }
        else if (guessCount < 1 && !awaiting) {
            /*User Lost the round! Tell user for 3s, then reset variables (except wins) and play again*/
            endPrompt.textContent = "You Lost :c";
            endGame();
        }
    }
};