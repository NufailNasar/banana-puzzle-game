let currentPuzzle = null;
let score = 0;
let lives = 3;
let timer;
let highScore = localStorage.getItem('highScore') || 0;
let puzzles = []; // Ensure puzzles array is defined

const puzzleImage = document.getElementById('puzzleImage');
const userAnswer = document.getElementById('userAnswer');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const retryBtn = document.getElementById('retryBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');
const gameOverSound = new Audio('Sound/game-over.mp3');
const backgroundMusic = new Audio('Sound/Homeandrank.mp3');

// Restart music when it ends
backgroundMusic.addEventListener('ended', () => {
    backgroundMusic.play();
});

// Fetching a new puzzle from the PHP backend
async function fetchPuzzle() {
    try {
        const response = await fetch('proxy.php'); // Fetch from PHP proxy
        const data = await response.json();

        console.log("Response Data:", data);

        if (!data.question || !data.solution) {
            throw new Error("Invalid puzzle data received");
        }

        puzzles.push({ image: data.question, solution: data.solution }); // Push the puzzle data into the array
        loadPuzzle(); // Load the new puzzle
    } catch (error) {
        console.error('Error fetching puzzle:', error);
    }
}

// Load the current puzzle and start the timer
function loadPuzzle() {
    if (puzzles.length === 0) {
        console.error("No puzzle data available.");
        return;
    }

    // Clear any previous "Time's up!" message
    message.textContent = ""; // Reset the message

    const puzzle = puzzles[puzzles.length - 1]; // Get the latest puzzle

    const puzzleImg = document.getElementById('puzzleImage');
    if (puzzleImg) {
        puzzleImg.src = puzzle.image;
        puzzleImg.alt = "Puzzle Image";
    } else {
        console.error("Image element not found in DOM.");
    }

    currentPuzzle = puzzle;
    resetTimer(); // Reset and start a fresh timer for the new puzzle
    startTimer(); // Start the timer for the new puzzle
}

// Start the timer for each puzzle
function startTimer() {
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        progressBar.style.transition = 'width 30s linear';
        progressBar.style.width = '0%';
    }, 10);

    // Timer ends after 30 seconds
    timer = setTimeout(() => {
        if (lives > 0) {
            lives--;
            livesDisplay.textContent = `Lives: ${lives}`;
            message.textContent = "Time's up! ❌";

            if (lives > 0) {
                nextPuzzle(); // Load next puzzle automatically
            } else {
                gameOver(); // Game over if no lives are left
            }
        }
    }, 30000); // 30 seconds time limit
}

// Reset the timer (called after user answers or time is up)
function resetTimer() {
    clearTimeout(timer); // Clears the previous timer
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';
}

// Check the user's answer and update score, lives, etc.
function checkAnswer() {
    if (!currentPuzzle || lives <= 0) return;

    const userResponse = parseInt(userAnswer.value.trim(), 10);
    const correctAnswer = parseInt(currentPuzzle.solution, 10);

    resetTimer();

    if (userResponse === correctAnswer) {
        score += 10;
        lives++;
        message.textContent = "Correct! 🎉";
    } else {
        lives--;
        message.textContent = "Wrong! ❌";
    }

    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;

    if (lives <= 0) {
        gameOver(); // Game over when lives reach 0
    } else {
        nextPuzzle();
    }
}

// Load the next puzzle after a short delay
function nextPuzzle() {
    setTimeout(() => {
        fetchPuzzle();
    }, 1000);
}

// End the game when lives are 0
function gameOver() {
    message.textContent = `Game Over! Final Score: ${score}`;
    submitBtn.style.display = "none";
    retryBtn.style.display = "block";
    clearTimeout(timer); // Stop the timer

    // Game-over sound
    gameOverSound.play();

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    highScoreDisplay.textContent = `High Score: ${highScore}`;

    // Stop the background music when the game is over
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

// Restart the game when the user clicks 'Retry'
function restartGame() {
    score = 0;
    lives = 3;
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;
    message.textContent = "";
    submitBtn.style.display = "block";
    retryBtn.style.display = "none";

    // Play the background music when the game restarts
    backgroundMusic.play();

    fetchPuzzle(); // Start a new puzzle
}

highScoreDisplay.textContent = `High Score: ${highScore}`;
fetchPuzzle(); // Fetch the first puzzle when the page loads
