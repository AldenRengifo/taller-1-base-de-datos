// Guess Game - Browser Version

const GAME_CONFIG = {
  minValue: 1,
  maxValue: 100
};

let secretNumber = null;
let attemptCount = 0;

initializeGame();

function initializeGame() {
  try {
    secretNumber = generateRandomNumber(GAME_CONFIG.minValue, GAME_CONFIG.maxValue);
    attemptCount = 0;
    showWelcomeMessage();
    requestGuess();
  } catch (error) {
    alert("Unexpected error starting the game.");
    console.error(error);
  }
}

function showWelcomeMessage() {
  alert(
    "Welcome to the Guess Game.\n" +
    "Try to guess the secret number between " +
    GAME_CONFIG.minValue +
    " and " +
    GAME_CONFIG.maxValue +
    "."
  );
}

function requestGuess() {
  try {
    const userInput = prompt(
      "Enter a number between " +
      GAME_CONFIG.minValue +
      " and " +
      GAME_CONFIG.maxValue +
      ":"
    );

    if (userInput === null) {
      endGame();
      return;
    }

    const guess = parseUserInput(userInput);

    if (!isValidGuess(guess)) {
      alert("Invalid number. Please try again.");
      requestGuess();
      return;
    }

    processGuess(guess);
  } catch (error) {
    alert("An error occurred while processing your guess.");
    console.error(error);
  }
}

function parseUserInput(input) {
  const parsedValue = parseInt(input, 10);
  return parsedValue;
}

function isValidGuess(value) {
  if (Number.isNaN(value)) return false;
  if (value < GAME_CONFIG.minValue) return false;
  if (value > GAME_CONFIG.maxValue) return false;
  return true;
}

function processGuess(guess) {
  attemptCount++;

  if (guess === secretNumber) {
    showWinMessage();
    return;
  }

  const hint = calculateHint(guess, secretNumber);
  alert(hint);
  requestGuess();
}

function showWinMessage() {
  alert(
    "You guessed the number.\n" +
    "Total attempts: " +
    attemptCount
  );
}

function calculateHint(playerGuess, targetNumber) {
  const distance = Math.abs(playerGuess - targetNumber);

  if (distance <= 5) return "Very hot";
  if (distance <= 15) return "Hot";
  if (distance <= 30) return "Warm";
  return "Cold"
}

function generateRandomNumber(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function endGame() {
  alert("Game ended.");
}
