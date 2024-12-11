const boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('.restart');
const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');
const clickSound = document.getElementById('clickSound');
const tieSound = document.getElementById('tieSound');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');
let verdictText = document.querySelector('.verdict')
let occupied = 0
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('closePopup');
let conditionNumber = 0


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

const checkForWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        if (gameState[condition[0]] == gameState[condition[1]] &&
            gameState[condition[1]] == gameState[condition[2]] &&
            gameState[condition[0]] != '') {
            return condition; // Return the winning condition
        }
    }
    return null; // No winner
}


const showPopup = (message) => {
    const messageElement = popup.querySelector('p');
    if(message == 'Tie!!!')
        messageElement.textContent = message
    else
    messageElement.textContent = message + ' wins!';
    popup.style.visibility = 'visible'; // Show the popup
}

const closePopup = () => {
    popup.style.visibility = 'hidden'; // Hide the popup
}

const drawWinningLine = (condition) => {
    const winningLine = document.getElementById('winningLine');
    const boxSize = boxes[0].clientWidth; // Assuming all boxes are the same size
    const boardRect = document.querySelector('.board').getBoundingClientRect(); // Get the board's position

    if (condition[0] === 0 || condition[0] === 3 || condition[0] === 6) { // Horizontal
        winningLine.style.top = `${boardRect.top + (condition[0] < 3 ? 0 : condition[0] < 6 ? boxSize : 2 * boxSize) + boxSize / 2}px`;
        winningLine.style.transform = 'translateY(-50%)';
        winningLine.style.width = `${boxSize * 3}px`;
    } else if (condition[0] === 0 || condition[0] === 1 || condition[0] === 2) { // Vertical
        winningLine.style.left = `${boardRect.left + (condition[0] % 3) * boxSize + boxSize / 2}px`;
        winningLine.style.transform = 'translateX(-50%)';
        winningLine.style.height = `${boxSize * 3}px`;
    } else if (condition[0] === 0 || condition[0] === 4 || condition[0] === 8) { // Diagonal
        winningLine.style.left = `${boardRect.left}px`;
        winningLine.style.top = `${boardRect.top}px`;
        winningLine.style.transform = 'rotate(45deg)';
        winningLine.style.width = `${Math.sqrt(2) * boxSize * 3}px`;
    } else if (condition[0] === 2 || condition[0] === 4 || condition[0] === 6) { // Diagonal
        winningLine.style.left = `${boardRect.left + boxSize * 2}px`;
        winningLine.style.top = `${boardRect.top}px`;
        winningLine.style.transform = 'rotate(-45deg)';
        winningLine.style.width = `${Math.sqrt(2) * boxSize * 3}px`;
    }

    winningLine.style.visibility = 'visible'; // Show the line
    winningLine.style.opacity = 1; // Make it visible
}

const onClickOfBox = (event)=>{
    const clickedBox = event.target
    const boxIndex = Array.from(boxes).indexOf(clickedBox)
    if(!gameActive || gameState[boxIndex]!=='')
        return
    moveSound.play()
    gameState[boxIndex] = currentPlayer
    clickedBox.textContent = currentPlayer
    currentPlayer = currentPlayer == 'X' ? 'O':'X'
    occupied = occupied + 1
    let gameWon = checkForWin()
    if(gameWon){
        resetButton.innerHTML = 'New Game'
        gameActive = false
        const winningPlayer = currentPlayer == 'X' ? 'O':'X'
        showPopup(winningPlayer)
        drawWinningLine(gameWon)
        winSound.play()
    }
    if(occupied == 9){
        tieSound.play()
        showPopup('Tie!!!')
    }
}

const resetGame = (event) => {
    clickSound.play()
    for(let i=0;i<9;i++){
        gameState[i] = '';
        boxes[i].textContent = '';
    }
    gameActive = true
    currentPlayer = 'X'
    occupied = 0
    if(resetButton.textContent=='New Game'){
        resetButton.innerHTML = 'Reset'
    }
    verdictText.innerHTML = 'Verdict : Pending'
}

boxes.forEach(box => box.addEventListener('click', onClickOfBox))
resetButton.addEventListener('click', resetGame)
closePopupButton.addEventListener('click', closePopup); // Add event listener for closing the popup