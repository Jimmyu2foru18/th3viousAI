// Initialize game engine
const gameEngine = new WordPuzzleEngine();

// DOM elements
const puzzleDisplay = document.getElementById('puzzle-display');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const streakDisplay = document.getElementById('streak');
const difficultySelect = document.getElementById('difficulty-select');
const startButton = document.getElementById('start-btn');
const endButton = document.getElementById('end-btn');

// Initialize end button display
endButton.style.display = 'none';

// Initialize clear button functionality
const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', () => {
    userInput.value = '';
    userInput.focus();
});

// Create found words display
const foundWordsContainer = document.createElement('div');
foundWordsContainer.id = 'found-words';
foundWordsContainer.className = 'found-words';
document.querySelector('.game-container').appendChild(foundWordsContainer);

// Game state management
function updateGameDisplay() {
    const gameState = gameEngine.getGameState();
    scoreDisplay.textContent = gameState.score;
    // Format timer to show minutes and seconds
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = gameState.timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update timer appearance based on time left
    timerDisplay.classList.remove('warning', 'danger');
    if (gameState.timeLeft <= 30) {
        timerDisplay.classList.add('danger');
    } else if (gameState.timeLeft <= 60) {
        timerDisplay.classList.add('warning');
    }
    
    streakDisplay.textContent = gameState.streak;
    updateFoundWords(gameState.foundWords);
}

function updateFoundWords(foundWords) {
    foundWordsContainer.innerHTML = `
        <h3>Found Words: ${foundWords.length}</h3>
        <div class="word-list">${foundWords.map(word => `<span class="found-word">${word}</span>`).join(' ')}</div>
    `;
}

function generateNewPuzzle() {
    const scrambledLetters = gameEngine.generatePuzzle();
    // Create letter tiles
    puzzleDisplay.innerHTML = '';
    scrambledLetters.split('').forEach(letter => {
        const tile = document.createElement('div');
        tile.className = 'letter-tile';
        tile.textContent = letter;
        // Add click event listener to insert letter into input box
        tile.addEventListener('click', () => {
            if (!userInput.disabled) {
                const cursorPos = userInput.selectionStart;
                const currentValue = userInput.value;
                userInput.value = currentValue.slice(0, cursorPos) + letter + currentValue.slice(cursorPos);
                userInput.focus();
                userInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
            }
        });
        puzzleDisplay.appendChild(tile);
    });
    userInput.value = '';
    updateGameDisplay();
    updateFoundWords([]);
}

function checkAnswer() {
    const result = gameEngine.checkAnswer(userInput.value);
    if (result.correct) {
        // Show success feedback
        puzzleDisplay.classList.add('correct');
        setTimeout(() => {
            puzzleDisplay.classList.remove('correct');
            if (result.completed) {
                generateNewPuzzle();
            }
        }, 500);
        
        // Clear input after successful submission
        if (result.clearInput) {
            userInput.value = '';
            userInput.focus();
        }

        // Show points animation
        const pointsAnimation = document.createElement('div');
        pointsAnimation.className = 'points-animation';
        pointsAnimation.textContent = `+${result.points}`;
        puzzleDisplay.appendChild(pointsAnimation);
        setTimeout(() => pointsAnimation.remove(), 1000);
    } else {
        // Show error feedback
        puzzleDisplay.classList.add('error');
        setTimeout(() => puzzleDisplay.classList.remove('error'), 500);
    }
    updateGameDisplay();
}

function showGameOver() {
    const finalState = gameEngine.getGameState();
    const message = `Game Over!\n\nFinal Score: ${finalState.score}\nStreak Bonus: ${finalState.streak}\nHints Used: ${finalState.hintsUsed}`;
    alert(message);
    
    // Add restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.className = 'restart-btn';
    restartButton.onclick = () => {
        restartButton.remove();
        startButton.click();
    };
    puzzleDisplay.appendChild(restartButton);
}

// Event listeners
document.getElementById('submit-btn').addEventListener('click', checkAnswer);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

document.getElementById('hint-btn').addEventListener('click', () => {
    const hint = gameEngine.getHint();
    alert(`Hint: ${hint}`);
    updateGameDisplay();
});

difficultySelect.addEventListener('change', (e) => {
    gameEngine.setDifficulty(e.target.value);
    generateNewPuzzle();
});

// Game state
let isGameActive = false;

// Start button click handler
startButton.addEventListener('click', () => {
    if (!isGameActive) {
        isGameActive = true;
        startButton.style.display = 'none';
        endButton.style.display = 'inline-block';
        userInput.disabled = false;
        gameEngine.timeLeft = 120; // Reset timer
        generateNewPuzzle();
        gameEngine.startTimer(() => {
            const minutes = Math.floor(gameEngine.timeLeft / 60);
            const seconds = gameEngine.timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            if (gameEngine.timeLeft <= 0) {
                endGame();
            }
        });
    }
});

// End button click handler
endButton.addEventListener('click', () => {
    endGame();
});

function endGame() {
    isGameActive = false;
    startButton.style.display = 'inline-block';
    endButton.style.display = 'none';
    userInput.disabled = true;
    gameEngine.stopTimer();
    showGameOver();
    puzzleDisplay.innerHTML = '<div class="game-message">Click Start to play!</div>';
}

// Initialize game state
userInput.disabled = true;
puzzleDisplay.innerHTML = '<div class="game-message">Click Start to play!</div>';
puzzleDisplay.style.display = 'block';