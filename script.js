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
            return condition; 
        }
    }
    return null; 
}

const showWinCombination = ()=>{
    const winCombination = checkForWin();
    if (winCombination) {
        const winBox1 = document.querySelector(`.box${winCombination[0]+1}`);
        const winBox2 = document.querySelector(`.box${winCombination[1]+1}`);
        const winBox3 = document.querySelector(`.box${winCombination[2]+1}`);
        winBox1.classList.replace('bg-color4', 'bg-color3')
        winBox2.classList.replace('bg-color4', 'bg-color3')
        winBox3.classList.replace('bg-color4', 'bg-color3')
    }
}

const restoreBgColor = ()=>{
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box =>{
        box.classList.replace('bg-color3', 'bg-color4')
    })
}

const showPopup = (message) => {
    const messageElement = popup.querySelector('p');
    if(message == 'Tie!!!')
        messageElement.textContent = message
    else
    messageElement.textContent = message + ' wins!';
    popup.style.visibility = 'visible';
}

const closePopup = () => {
    popup.style.visibility = 'hidden'; 
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
        showWinCombination()
        winSound.play()
    }
    else{
        if(occupied == 9){
            tieSound.play()
            showPopup('Tie!!!')
        }
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
    restoreBgColor()
}

boxes.forEach(box => box.addEventListener('click', onClickOfBox))
resetButton.addEventListener('click', resetGame)
closePopupButton.addEventListener('click', closePopup);