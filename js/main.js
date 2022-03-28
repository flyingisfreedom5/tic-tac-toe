/*----- constants -----*/
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

/*----- app's state (variables) -----*/
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

function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
   
}

function resultValidation() {
    let roundWin = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let x = gameState[winCondition[0]];
        let y = gameState[winCondition[1]];
        let z = gameState[winCondition[2]];
        if (x === '' || y === '' || z === '') {
            continue;
        }
        if (x === y && y === z) {
            roundWin = true;
            break
        }
    }

    if (roundWin) {
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



