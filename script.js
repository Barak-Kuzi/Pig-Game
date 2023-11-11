'use strict';

const playerActiveBackground_1 = document.querySelector(`.player_1`);
const playerActiveBackground_2 = document.querySelector(`.player_2`);
const playerScoreText_1 = document.querySelector(`#playerScore_1`);
const playerScoreText_2 = document.querySelector(`#playerScore_2`);
const currentScoreText_1 = document.querySelector(`#currentScore_1`);
const currentScoreText_2 = document.querySelector(`#currentScore_2`);
const btnRoll = document.querySelector('.btnRollDice');
const btnHold = document.querySelector('.btnHold');
const btnRestart = document.querySelector('.btnNewGame');
const dice = document.querySelector(`.dice`);
const optionsOfCube = 6;
const minNumber = 1;
let scoreGame, currentScore, currentPlayer, gameRunning;

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", saveCurrentScore);
btnRestart.addEventListener("click", initializingGame);

initializingGame();
function initializingGame(){
    scoreGame = [0, 0];
    currentScore = 0;
    currentPlayer = 1;
    gameRunning = true;
    playerScoreText_1.textContent = 0;
    playerScoreText_2.textContent = 0;
    currentScoreText_1.textContent = 0;
    currentScoreText_2.textContent = 0;
    dice.classList.add('hidden');
    playerActiveBackground_1.classList.remove(`playerWinner`);
    playerActiveBackground_2.classList.remove(`playerWinner`);
    playerActiveBackground_2.classList.remove(`playerActive`);
    playerActiveBackground_1.classList.add(`playerActive`);
}

function rollDice(){
    if (gameRunning){
        const numberOnCube =  Math.trunc((Math.random() * optionsOfCube) + minNumber);
        dice.src = `img/dice-${numberOnCube}.png`;
        dice.classList.remove(`hidden`);
        if (numberOnCube !== 1){
            currentScore += numberOnCube;
            document.getElementById(`currentScore_${currentPlayer}`).textContent = currentScore;
        }
        else{
            currentScore = 0;
            document.getElementById(`currentScore_${currentPlayer}`).textContent = currentScore;
            changePlayer();
        }
    }
}

function saveCurrentScore(){
    if (gameRunning){
        switch (currentPlayer){
            case 1:
                scoreGame[0] += currentScore;
                playerScoreText_1.textContent = scoreGame[0];
                checkWinner();
                changePlayer();
                break;
            case 2:
                scoreGame[1] += currentScore;
                playerScoreText_2.textContent = scoreGame[1];
                checkWinner();
                changePlayer();
                break;
        }
    }
}

function changePlayer(){
    currentScore = 0;
    document.querySelector(`#currentScore_${currentPlayer}`).textContent = currentScore;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerActiveBackground_1.classList.toggle(`playerActive`);
    playerActiveBackground_2.classList.toggle(`playerActive`);
}

function checkWinner(){
    if (scoreGame[0] >= 25){
        dice.classList.add(`hidden`);
        playerScoreText_1.textContent = `${scoreGame[0]}\nWinner`;
        playerScoreText_1.style.textAlign = `center`;
        playerActiveBackground_1.classList.add(`playerWinner`);
        gameRunning = false;
    }
    else if (scoreGame[1] >= 25){
        dice.classList.add(`hidden`);
        playerScoreText_2.textContent = `${scoreGame[1]}\nWinner`;
        playerScoreText_2.style.textAlign = `center`;
        playerActiveBackground_2.classList.add(`playerWinner`);
        gameRunning = false;
    }
}