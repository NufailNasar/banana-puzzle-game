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
        setTimeout(startTimer, 50); // Delay to allow smooth transition
    } else {
        gameOver();
    }
}

function startTimer() {
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#4CAF50';

    setTimeout(() => {
        progressBar.style.transition = 'width 10s linear';
        progressBar.style.width = '0%';
    }, 10); // Tiny delay to enable smooth transition

    timer = setTimeout(() => {
        lives--;
        livesDisplay.textContent = `Lives: ${lives}`;
        message.textContent = "Time's up! ❌";
        nextPuzzle();
    }, 10000);
}