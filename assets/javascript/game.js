/**
 * Word Search Game
 * 
 * By: Esar Behlum
 */

/*  List of potential words to use */
var potentialWords = ["Alpha", "Beta", "Theta", "Kappa", "Omega"];

/* Wins variable */
var winCount = 0;
/* Number of guesses remaining */
var guessCount;
/* Letters of keys guessed [User should not be punished twice] */
var usedKeys;
/* Get a random word from the potentials list */
var randomWord;

function initializer() {
    //Get new Random Word
    randomWord = potentialWords[Math.floor(Math.random() * potentialWords.length)].toLowerCase();
    //Reset hiddenWord letters to zero
    hiddenWord = [];
    //Reset used keys to none
    usedKeys = [];
    //Initial counter for amount of tries
    guessCount = 12;
    /* Initialize new hidden Word underscores */
    for (var i = 0; i < randomWord.length; i++) { hiddenWord.push("_") }
}

function updateElements() {
    document.getElementById("Wins").innerHTML = "Wins: " + winCount;
    document.getElementById("Guesses").innerHTML = "Guesses Left: " + guessCount;
    document.getElementById("Used").innerHTML = "Keys Used: " + usedKeys.join(" ");
    document.getElementById("WORD").innerHTML = hiddenWord.join(" ");
}

initializer();
updateElements();


/* Load in key logger*/
document.onkeypress = function(pressed){
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
                    document.getElementById("WORD").innerHTML = hiddenWord; //Update found letters
                }
            }
        }


        /** Incorrect key hit, decrement tries left */ 
        else { 
            if (guessCount > 1) guessCount--; 
            else {
                /*User Lost the round! Reset variables (except wins) and play again*/
                initializer();
            }
        }

        /** Update used keys bank after every keypress */
        usedKeys.push(pressed);

        /** User found all the letters: increment wins, reset, and update. */
        if (!hiddenWord.includes("_")) {
            winCount++;
            alert("You Win!");
            initializer();
        } 
        updateElements();
    }
};