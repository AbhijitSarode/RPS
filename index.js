const elements = {
    gameBox: document.querySelector('.game-box'),
    resultBox: document.querySelector('.result-box'),

    playerScore: document.querySelector('#player-score-value'),
    computerScore: document.querySelector('#computer-score-value'),

    playerContainer: document.querySelector('.player-picked-container'),
    computerContainer: document.querySelector('.computer-picked-container'),
    winnerContainer: document.querySelector('.winner-container'),
    
    playerSelection: document.querySelector('.player-selection'),
    computerSelection: document.querySelector('.computer-selection'),

    pulseAnimation: document.querySelector('#pulse-animation'),

    resultText: document.querySelector('#result-text'),

    nextButton: document.querySelector('#next'),
    playAgainBtn: document.querySelector('#play-again'),

    shifLeftAnimation: document.querySelector('.shift-left'),
    shiftRightAnimation: document.querySelector('.shift-right'),

    modal: document.querySelector('.modal')
}

// STORE SCORES IN LOCAL STORAGE TO RETAIN SCORES ON PAGE REFRESH
let pScore = Number(localStorage.getItem("playerScore")) || 0;
let cScore = Number(localStorage.getItem("computerScore")) || 0;

const rps = ["rock", "paper", "scissors"];

const startGame = (choice) => {
    elements.gameBox.style.display = 'none';
    elements.resultBox.style.display = 'flex';
    elements.computerContainer.style.display = 'block';
    
    elements.playerSelection.classList.add(`${choice.name}`);
    
    let computerChoice = rps[Math.floor(Math.random() * rps.length)];
    elements.computerSelection.classList.add(`${computerChoice}`);
    elements.pulseAnimation.style.display = 'block';
    
    setTimeout(() => {
        elements.computerSelection.style.display = 'block';
        elements.pulseAnimation.style.display = 'none';
        
        setTimeout(() => {
            elements.playerContainer.classList.add('shift-left');
            elements.computerContainer.classList.add('shift-right');
            elements.winnerContainer.style.display = 'flex';
            elements.resultText.style.display = 'block';
            elements.playAgainBtn.style.display = 'block';
            elements.nextButton.style.display = 'block';
        }, 500);
    }, 2000);

    let winner = result(choice.name, computerChoice);
    console.log(`${choice.name} vs ${computerChoice} \n winner: ${winner}`);

    if (winner == 'player') {
        elements.playerSelection.classList.add('winner');
        elements.resultText.innerHTML = '<span>YOU WIN</span> <br> AGAINST PC';
        elements.playerScore.innerHTML = ++pScore;
        localStorage.setItem("playerScore", pScore);
        console.log('here');
    } else if (winner == 'computer') {
        elements.computerSelection.classList.add('winner');
        elements.resultText.innerHTML = '<span>YOU LOSE</span> <br> AGAINST PC';
        console.log('there');
        elements.computerScore.innerHTML = ++cScore;
        localStorage.setItem("computerScore", cScore)
    }
    else {
        elements.resultText.innerHTML = '<span>TIE UP</span>';
        // elements.playAgainBtn.textContent = 'REPLAY';
    }

}

// COMPUTE RESULT
const result = (player, computer) => {
    let winner = "computer"

    if (player === computer) {
        winner = "draw";
    } else if (player === 'rock' && computer === 'scissors' 
        || player === 'paper' && computer === 'rock' 
        || player === 'scissors' && computer === 'paper') {
        winner = 'player';
    }
    return winner;
}

const playAgain = () => {
    elements.gameBox.style.display = 'block';
    elements.pulseAnimation.style.display = 'block';
    hide()
}

const showModal = () => {
    elements.modal.style.display = 'block';
}

const closeModal = () => {
    elements.modal.style.display = 'none';
}

const hide = () => {
    elements.resultBox.style.display = 'none';
    elements.resultText.style.display = 'none';
    elements.computerContainer.style.display = 'none';
    elements.pulseAnimation.style.display = 'none';
    elements.computerSelection.style.display = 'none';
    elements.winnerContainer.style.display = 'none';
}

const reset = () => {
    elements.playerScore.textContent = 0;
    elements.computerScore.textContent = 0;
    cScore = 0;
    pScore = 0;
    playerScore = 0;
    computerScore = 0;
    localStorage.setItem("playerScore", pScore);
    localStorage.setItem("computerScore", cScore);

}

window.onload = () => {
    reset();
}