let timer = document.querySelector('.timer');
let countDown_timer;
let holes = document.querySelectorAll('.hole');
let lastNum;
let popUp_timer;
let score = document.querySelector('.score');
let moles = document.querySelectorAll('.mole');
let timeOver = false;
let button = document.querySelector('button');
let gameTimer;

//let's first set the timer countdown
function countDown() {

    countDown_timer = setInterval(() => {
        if (timer.textContent == 0) {
            clearInterval(countDown_timer);
            return;
        }
        timer.textContent--
    }, 1000);
}

//now let's make the moles pop-up on the screen
function molePopUp() {
    let holeNum = randomPopUp();
    const randomTime = randomTimer();
    holes[holeNum].classList.add('up');
    //we now need the moles to drop back to the hole after sometime using the setTimeout
    popUp_timer = setTimeout(() => {
        holes[holeNum].classList.remove('up');
        if (!timeOver) return molePopUp();
    }, randomTime);
}

function randomPopUp() {
    //math.random will return a number between 0 and 1. 
    //When we multiply this by 6, they will be rounded to random numbers between 0 and 6

    let num = Math.floor(Math.random() * holes.length);
    //now let's control for the randomness
    if (num === lastNum) {
        return randomPopUp();
    }
    lastNum = num;
    return num;
}

//we now want the mole to pop-up at random times and not at fixed times
// to make the game more exciting
function randomTimer(maximum = 1000, minimum = 100) {
    const timeNum = Math.floor(Math.random() * (maximum - minimum) + minimum);
    return timeNum;
}

//every time we whack the mole the score has to be recorded
function playPop() {
    const audio = new Audio('pop.mp3');
    audio.currentTime = 0;
    audio.play();
}

function whackScore(event) {
    //we also need to ensure that the game is not being played by a bot (AI)
    if (!event.isTrusted) return;
    playPop();
    score.textContent++
    this.parentNode.classList.remove('up');
}

moles.forEach(mole => {
    mole.addEventListener('click', whackScore)
});

//now to start the game where all the functions above will be invoked
function startGame() {
    holes.forEach(hole => hole.classList.remove('up'));
    score.textContent = 0;
    timer.textContent = 10;
    timeOver = false;
    clearInterval(countDown);
    clearTimeout(molePopUp);
    clearTimeout(gameTimer);

    countDown();
    molePopUp();

    gameTimer = setTimeout(() => {
        timeOver = true;
    }, 10000);
}

button.addEventListener('click', startGame);