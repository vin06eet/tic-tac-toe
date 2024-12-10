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
    for(let i=0;i<8;i++){
        const condition = winningConditions[i];
        if( gameState[condition[0]]==gameState[condition[1]] && 
            gameState[condition[1]]==gameState[condition[2]] &&
            gameState[condition[0]]!=''){
                return true
    }
    }
    return false
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
        verdictText.innerHTML = 'Verdict : ' + winningPlayer + ' wins!'
        winSound.play()
    }
    if(occupied == 9){
        tieSound.play()
        verdictText.innerHTML = 'Verdict : Tie'
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