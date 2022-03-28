/*----- constants -----*/
const statusDisplay = document.querySelector('.status');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
/*----- cached element references -----*/
const winningMessage = () => `Player ${currentPlayer} has win!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/*----- event listeners -----*/
document.querySelectorAll('.box').forEach(box => box.addEventListener('click', boxClick));
document.querySelector('.restart').addEventListener('click', restartGame);


/*----- functions -----*/
function boxPlayed(clickedBox, clickedBoxIndex) {
    gameState[clickedBoxIndex] = currentPlayer;
    clickedBox.innerHTML = currentPlayer;
}
s
function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
   
}

function resultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
}

function boxClick(clickedBoxEvent) {
    const clickedBox = clickedBoxEvent.target;
    const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-cell-index'));

    if (gameState[clickedBoxIndex] !== "" || !gameActive) {
        return;
    }

    boxPlayed(clickedBox, clickedBoxIndex);
    resultValidation();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box').forEach(box => box.innerHTML = "");
}

