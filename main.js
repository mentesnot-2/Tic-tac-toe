const X_CLASS= 'x'
const O_CLASS= 'circle'
const winning_combinations=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements=document.querySelectorAll('[data-cell]')
const winningMessageTextElement = document.querySelector('[data-winning-message-text')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton=document.getElementById('restartButton')
let OTurn
startGame()
restartButton.addEventListener('click', startGame)
function startGame() {
    OTurn=false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.addEventListener('click', handleClick, { once: true})
        winningMessageElement.classList.remove('show')
    })
}
cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true})
})
function handleClick(e) {
    const cell=e.target
    const currentClass = OTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
    }
    
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${OTurn ? "O's" : "X's"} Wins`
    }
    winningMessageElement.classList.add('show')
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns() {
    OTurn=!OTurn
}
function checkWin(currentClass) {
    return winning_combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}