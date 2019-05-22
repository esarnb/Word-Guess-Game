/**
 * Word Search Game
 * 
 * By: Esar Behlum
 */


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
var chem;
var infoPrompt;

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
        // randomWord = potentialWords[Math.floor(Math.random() * potentialWords.length)].toLowerCase();
        chem = getChemical();
        randomWord = chem.name.toLowerCase();
        infoPrompt = ` The word was ${randomWord}. It's symbol is ${chem.symbol} with an atomic mass of ${chem.id}`;
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
        wordUpdate.textContent = hiddenWord.join(" ") /*+ "\n" + randomWord*/;
    }
    
}

/**
 * Enable gate to prevent overflow of keys,
 * Inform the user for 3s win/loss,
 * then reset and update the visual for a new game
 */
function endGame() {
    //Enable keypress block
    awaiting = true;
    //Disable all visuals, display win/loss
    for (let element of document.querySelectorAll('.hidden')) element.style.visibility = 'hidden';
    
    //Reset and re-enable everything
    setTimeout(function () {
        awaiting = false;
        initializer();
        updateElements();
        for (let element of document.querySelectorAll('.hidden')) element.style.visibility = 'visible';
    }, 6000)
}

/**
 *  
 * @param str 
 *      str is the input to check
 * 
 * The function checks whether a character is a letter
 */
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

//Begin the game and show the user a fresh start
initializer();
updateElements();


/* Load in key logger*/
document.onkeypress = function (pressed) {
    //Filter out excess data, only use letter pressed
    pressed = pressed.key.toLowerCase();
    if (!isLetter(pressed)) return;
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
            endPrompt.textContent = "You Win!" + infoPrompt;
            endGame();
        }
        else if (guessCount < 1 && !awaiting) {
            /*User Lost the round! Tell user for 3s, then reset variables (except wins) and play again*/
            endPrompt.textContent = "You Lost :c" + infoPrompt;
            endGame();
        }
    }
};


/**
 * List of potential words to use.
 * When called, function returns
 * a random object.
 *  */
function getChemical() {
    return {elements: [
        {id: 1, symbol: "H", name: "Hydrogen"},
        {id: 2, symbol: "He", name: "Helium"},
        {id: 3, symbol: "Li", name: "Lithium"},
        {id: 4, symbol: "Be", name: "Beryllium"},
        {id: 5, symbol: "B", name: "Boron"},
        {id: 6, symbol: "C", name: "Carbon"},
        {id: 7, symbol: "N", name: "Nitrogen"},
        {id: 8, symbol: "O", name: "Oxygen"},
        {id: 9, symbol: "F", name: "Fluorine"},
        {id: 10, symbol: "Ne", name: "Neon"},
        {id: 11, symbol: "Na", name: "Sodium"},
        {id: 12, symbol: "Mg", name: "Magnesium"},
        {id: 13, symbol: "Al", name: "Aluminum, Aluminium"},
        {id: 14, symbol: "Si", name: "Silicon"},
        {id: 15, symbol: "P", name: "Phosphorus"},
        {id: 16, symbol: "S", name: "Sulfur"},
        {id: 17, symbol: "Cl", name: "Chlorine"},
        {id: 18, symbol: "Ar", name: "Argon"},
        {id: 19, symbol: "K", name: "Potassium"},
        {id: 20, symbol: "Ca", name: "Calcium"},
        {id: 21, symbol: "Sc", name: "Scandium"},
        {id: 22, symbol: "Ti", name: "Titanium"},
        {id: 23, symbol: "V", name: "Vanadium"},
        {id: 24, symbol: "Cr", name: "Chromium"},
        {id: 25, symbol: "Mn", name: "Manganese"},
        {id: 26, symbol: "Fe", name: "Iron"},
        {id: 27, symbol: "Co", name: "Cobalt"},
        {id: 28, symbol: "Ni", name: "Nickel"},
        {id: 29, symbol: "Cu", name: "Copper"},
        {id: 30, symbol: "Zn", name: "Zinc"},
        {id: 31, symbol: "Ga", name: "Gallium"},
        {id: 32, symbol: "Ge", name: "Germanium"},
        {id: 33, symbol: "As", name: "Arsenic"},
        {id: 34, symbol: "Se", name: "Selenium"},
        {id: 35, symbol: "Br", name: "Bromine"},
        {id: 36, symbol: "Kr", name: "Krypton"},
        {id: 37, symbol: "Rb", name: "Rubidium"},
        {id: 38, symbol: "Sr", name: "Strontium"},
        {id: 39, symbol: "Y", name: "Yttrium"},
        {id: 40, symbol: "Zr", name: "Zirconium"},
        {id: 41, symbol: "Nb", name: "Niobium"},
        {id: 42, symbol: "Mo", name: "Molybdenum"},
        {id: 43, symbol: "Tc", name: "Technetium"},
        {id: 44, symbol: "Ru", name: "Ruthenium"},
        {id: 45, symbol: "Rh", name: "Rhodium"},
        {id: 46, symbol: "Pd", name: "Palladium"},
        {id: 47, symbol: "Ag", name: "Silver"},
        {id: 48, symbol: "Cd", name: "Cadmium"},
        {id: 49, symbol: "In", name: "Indium"},
        {id: 50, symbol: "Sn", name: "Tin"},
        {id: 51, symbol: "Sb", name: "Antimony"},
        {id: 52, symbol: "Te", name: "Tellurium"},
        {id: 53, symbol: "I", name: "Iodine"},
        {id: 54, symbol: "Xe", name: "Xenon"},
        {id: 55, symbol: "Cs", name: "Cesium"},
        {id: 56, symbol: "Ba", name: "Barium"},
        {id: 57, symbol: "La", name: "Lanthanum"},
        {id: 58, symbol: "Ce", name: "Cerium"},
        {id: 59, symbol: "Pr", name: "Praseodymium"},
        {id: 60, symbol: "Nd", name: "Neodymium"},
        {id: 61, symbol: "Pm", name: "Promethium"},
        {id: 62, symbol: "Sm", name: "Samarium"},
        {id: 63, symbol: "Eu", name: "Europium"},
        {id: 64, symbol: "Gd", name: "Gadolinium"},
        {id: 65, symbol: "Tb", name: "Terbium"},
        {id: 66, symbol: "Dy", name: "Dysprosium"},
        {id: 67, symbol: "Ho", name: "Holmium"},
        {id: 68, symbol: "Er", name: "Erbium"},
        {id: 69, symbol: "Tm", name: "Thulium"},
        {id: 70, symbol: "Yb", name: "Ytterbium"},
        {id: 71, symbol: "Lu", name: "Lutetium"},
        {id: 72, symbol: "Hf", name: "Hafnium"},
        {id: 73, symbol: "Ta", name: "Tantalum"},
        {id: 74, symbol: "W", name: "Tungsten"},
        {id: 75, symbol: "Re", name: "Rhenium"},
        {id: 76, symbol: "Os", name: "Osmium"},
        {id: 77, symbol: "Ir", name: "Iridium"},
        {id: 78, symbol: "Pt", name: "Platinum"},
        {id: 79, symbol: "Au", name: "Gold"},
        {id: 80, symbol: "Hg", name: "Mercury"},
        {id: 81, symbol: "Tl", name: "Thallium"},
        {id: 82, symbol: "Pb", name: "Lead"},
        {id: 83, symbol: "Bi", name: "Bismuth"},
        {id: 84, symbol: "Po", name: "Polonium"},
        {id: 85, symbol: "At", name: "Astatine"},
        {id: 86, symbol: "Rn", name: "Radon"},
        {id: 87, symbol: "Fr", name: "Francium"},
        {id: 88, symbol: "Ra", name: "Radium"},
        {id: 89, symbol: "Ac", name: "Actinium"},
        {id: 90, symbol: "Th", name: "Thorium"},
        {id: 91, symbol: "Pa", name: "Protactinium"},
        {id: 92, symbol: "U", name: "Uranium"},
        {id: 93, symbol: "Np", name: "Neptunium"},
        {id: 94, symbol: "Pu", name: "Plutonium"},
        {id: 95, symbol: "Am", name: "Americium"},
        {id: 96, symbol: "Cm", name: "Curium"},
        {id: 97, symbol: "Bk", name: "Berkelium"},
        {id: 98, symbol: "Cf", name: "Californium"},
        {id: 99, symbol: "Es", name: "Einsteinium"},
        {id: 100, symbol: "Fm", name: "Fermium"},
        {id: 101, symbol: "Md", name: "Mendelevium"},
        {id: 102, symbol: "No", name: "Nobelium"},
        {id: 103, symbol: "Lr", name: "Lawrencium"},
        {id: 104, symbol: "Rf", name: "Rutherfordium"},
        {id: 105, symbol: "Db", name: "Dubnium"},
        {id: 106, symbol: "Sg", name: "Seaborgium"},
        {id: 107, symbol: "Bh", name: "Bohrium"},
        {id: 108, symbol: "Hs", name: "Hassium"},
        {id: 109, symbol: "Mt", name: "Meitnerium"},
        {id: 110, symbol: "Ds", name: "Darmstadtium"},
        {id: 111, symbol: "Rg", name: "Roentgenium"},
        {id: 112, symbol: "Cn", name: "Copernicium"},
        {id: 113, symbol: "Nh", name: "Nihonium"},
        {id: 114, symbol: "Fl", name: "Flerovium"},
        {id: 115, symbol: "Mc", name: "Moscovium"},
        {id: 116, symbol: "Lv", name: "Livermorium"},
        {id: 117, symbol: "Ts", name: "Tennessine"},
        {id: 118, symbol: "Og",name: "Oganesson"}
    ]}.elements[Math.floor(Math.random() * 118)];
}