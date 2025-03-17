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

function checkAnswer() {
    if (currentPuzzleIndex >= puzzles.length || lives <= 0) return;

    const userResponse = userAnswer.value.trim();
    const correctAnswer = puzzles[currentPuzzleIndex].solution;

    resetTimer(); // Stop the timer when answer is checked

    if (userResponse === correctAnswer) {
        score += 10;
        message.textContent = "Correct! 🎉";
    } else {
        lives--;
        message.textContent = "Wrong! ❌";
    }

    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;

    if (lives <= 0) {
        gameOver();
    } else {
        nextPuzzle();
    }
}

function nextPuzzle() {
    currentPuzzleIndex++;
    setTimeout(loadPuzzle, 1000);
}

function gameOver() {
    message.textContent = `Game Over! Final Score: ${score}`;
    submitBtn.style.display = "none";
    retryBtn.style.display = "block";
    clearTimeout(timer);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    highScoreDisplay.textContent = `High Score: ${highScore}`;
}

function restartGame() {
    currentPuzzleIndex = 0;
    score = 0;
    lives = 3;
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;
    message.textContent = "";
    submitBtn.style.display = "block";
    retryBtn.style.display = "none";
    loadPuzzle();
}

highScoreDisplay.textContent = `High Score: ${highScore}`;
loadPuzzle();
