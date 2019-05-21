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
/* Letters of keys guessed [User hould not be punished twice] */
var usedKeys;
/* Get a random word from the potentials list */
var randomWord;

function initializer() {
    randomWord = potentialWords[Math.floor(Math.random() * potentialWords.length)].toLowerCase();
    hiddenWord = [];
    usedKeys = [];
    guessCount = 12;
    /* Initialize Word underscores */
    for (var i = 0; i < randomWord.length; i++) { hiddenWord.push("_") }
}

function updateElements() {
    document.getElementById("Wins").innerHTML = "Wins: " + winCount;
    document.getElementById("Guesses").innerHTML = "Guesses Left: " + guessCount;
    document.getElementById("Used").innerHTML = "Keys Used: " + usedKeys;
    document.getElementById("WORD").innerHTML = hiddenWord.join(" ");
}

initializer();
updateElements();


/* Load in key logger*/
document.onkeypress = function(pressed){
    // pressed = String.fromCharCode(event.keyCode).toLowerCase();
    pressed = pressed.key;
    console.log(pressed);
    
    if (randomWord.includes(pressed) && !usedKeys.includes(pressed)) {
        console.log("TRUE");
        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord.charAt(i) === pressed) {
                hiddenWord[i] = pressed;
                document.getElementById("WORD").innerHTML = hiddenWord;
            }
        }
    }
    else {
        console.log("FALSE");
        if (guessCount > 1) guessCount--;
        else {
            /*User Lost! Reset variables (except win) and play again*/
            alert("You lost :c")
            initializer();
        }
    }
    usedKeys.push(pressed);
    if (!hiddenWord.includes("_")) {
        winCount++;
        alert("You Win!");
        initializer();
    } 
    updateElements();
    
};

/**
 * Remaining pseudocode
 */


//WHILE WORD-Boolean.includes("_")

    // Record keys pressed,
    // Check if it is correct
        /*
            Array of false values, change to true if correct.
            Change string if correct.

            If incorrect, decrement tries, insert key into USED
        */


//End of Game: 
    //If won: increment win       //else do nothing
    //Reset Game (dont reset wins)



