const puzzles = [
    { image: 'https://www.sanfoh.com/uob/banana/data/tce25c4945f7e898920620665can68.png', solution: '8' },
    { image: 'https://www.sanfoh.com/uob/banana/data/tcf78297aed7ad12fd47a985607n76.png', solution: '6' },
    { image: 'https://www.sanfoh.com/uob/banana/data/td34b97440e19a5a12be585150fn80.png', solution: '0' },
    { image: 'https://www.sanfoh.com/uob/banana/data/td395b9299083da2761ad6bde27n117.png', solution: '7'},
	{ image: 'https://www.sanfoh.com/uob/banana/data/tce25c4945f7e898920620665can68.png', solution: '8' },
    { image: 'https://www.sanfoh.com/uob/banana/data/tcf78297aed7ad12fd47a985607n76.png', solution: '6' },
    { image: 'https://www.sanfoh.com/uob/banana/data/td34b97440e19a5a12be585150fn80.png', solution: '0' },
    { image: 'https://www.sanfoh.com/uob/banana/data/td395b9299083da2761ad6bde27n117.png', solution: '7'},
	{ image: 'https://www.sanfoh.com/uob/banana/data/tce25c4945f7e898920620665can68.png', solution: '8' },
    { image: 'https://www.sanfoh.com/uob/banana/data/tcf78297aed7ad12fd47a985607n76.png', solution: '6' },
    { image: 'https://www.sanfoh.com/uob/banana/data/td34b97440e19a5a12be585150fn80.png', solution: '0' },
    { image: 'https://www.sanfoh.com/uob/banana/data/td395b9299083da2761ad6bde27n117.png', solution: '7'}
];

let currentPuzzleIndex = 0;
let score = 0;
let lives = 3;
let timer;
let highScore = localStorage.getItem('highScore') || 0;

const puzzleImage = document.getElementById('puzzleImage');
const userAnswer = document.getElementById('userAnswer');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const retryBtn = document.getElementById('retryBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');


function loadPuzzle() {
    if (currentPuzzleIndex < puzzles.length) {
        puzzleImage.src = puzzles[currentPuzzleIndex].image;
        userAnswer.value = '';
        message.textContent = '';
        resetTimer();
        setTimeout(startTimer, 50);
    } else {
        gameOver();
    }
}

function startTimer() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';

    setTimeout(() => {
        progressBar.style.transition = 'width 10s linear';
        progressBar.style.width = '0%';
    }, 50);

    timer = setTimeout(() => {
        if (lives > 0) {
            lives--;
        }
        livesDisplay.textContent = `Lives: ${lives}`;
        message.textContent = "Time's up! ❌";

        if (lives <= 0) {
            gameOver();
        } else {
            nextPuzzle();
        }
    }, 10000);
}

function resetTimer() {
    clearTimeout(timer);
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';
}

function checkAnswer() {
    if (currentPuzzleIndex >= puzzles.length || lives <= 0) return;

    const userResponse = userAnswer.value.trim();
    const correctAnswer = puzzles[currentPuzzleIndex].solution;

    resetTimer();

    if (userResponse === correctAnswer) {
        score += 10;
        message.textContent = "Correct! 🎉";
    } else {
        if (lives > 0) {
            lives--;
        }
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
    livesDisplay.textContent = `Lives: 0`;
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


document.addEventListener("DOMContentLoaded", function () {
    fetch("getUser.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("username").textContent = data.username;
            } else {
                document.getElementById("username").textContent = "Guest";
            }
        })
        .catch(error => console.error("Error fetching user:", error));
});