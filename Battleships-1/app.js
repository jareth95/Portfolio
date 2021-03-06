// add that all ships need to be deployed before starting game

document.addEventListener('DOMContentLoaded', () => {

    const userGrid = document.querySelector('.user-gameBoard')
    const computerGrid = document.querySelector('.computer-gameBoard')
    const displayGrid = document.querySelector('.display-ships')
    const ships = document.querySelectorAll('.ship')
    const destroyer = document.querySelector('.destroyer-container')
    const submarine = document.querySelector('.submarine-container')
    const cruiser = document.querySelector('.cruiser-container')
    const battleship = document.querySelector('.battleship-container')
    const carrier = document.querySelector('.carrier-container')
    const startButton = document.querySelector('#start')
    const rotateButton = document.querySelector('#rotate')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')
    const resetButton = document.querySelector('#reset')
    const setupButtons = document.querySelector('.setup-buttons')
    const battleshipImage = document.querySelector('#battleship-image')
    const battleshipTitle = document.querySelector('#battleship-title')
    
    let userSquares = []
    let computerSquares = []
    let isHorizontal = true
    let isGameOver = false
    let currentPlayer = 'user'

    const width = 10

    // create board
    function createBoard(grid, squares) {
        for(let i = 0; i < width*width; i++){
            const square = document.createElement('div')
            square.dataset.id = i
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard(userGrid, userSquares)
    createBoard(computerGrid, computerSquares)
    // ships
    const shipArray = [
        { 
            name: 'destroyer',
            directions: [
                [0, 1],
                [0, width]
            ]
        },
        {
            name: 'cruiser',
            directions: [
                [0, 1, 2],
                [0, width, width*2]
            ]
        },
        {
            name: 'submarine',
            directions: [
                [0, 1, 2],
                [0, width, width*2]
            ]
        },
        {
            name: 'battleship',
            directions: [
                [0, 1, 2, 3],
                [0, width, width*2, width*3]
            ]
        },
        {
            name: 'carrier',
            directions: [
                [0, 1, 2, 3, 4],
                [0, width, width*2, width*3, width*4]
            ]
        },

    ]
    // Draw the computers ships
    function generate(ship) {
        let direction
        let randomDirection = Math.floor(Math.random() * ship.directions.length)
        let current = ship.directions[randomDirection]
        if (randomDirection === 0) direction = 1
        if (randomDirection === 1) direction = 10
        let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))

        const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
        const isAtRightEdge = current.some(index => (randomStart + index) % width === width -1)
        const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

        if(!isTaken && !isAtLeftEdge && !isAtRightEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))

        else generate(ship)
    }
    for (let i = 0; i < shipArray.length; i++){
        generate(shipArray[i])
    }
    //  Rotate ships
    function rotate() {
        if (isHorizontal) {
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = false
        } else {
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = true
        }
    }
    rotateButton.addEventListener('click', rotate)
    
    ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragover', dragOver))
    userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
    userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
    userSquares.forEach(square => square.addEventListener('drop', dragDrop))
    userSquares.forEach(square => square.addEventListener('dragend', dragEnd))

    let selectedShipNameWithIndex
    let draggedShip
    let draggedShipLength

    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
        selectedShipNameWithIndex = e.target.id
    }))

    function dragStart() {
        draggedShip = this
        draggedShipLength = this.childNodes.length
    }
    function dragOver(e) {
        e.preventDefault()
    }
    function dragEnter(e) {
        e.preventDefault()
    }
    function dragLeave(e) {
        e.preventDefault()
    }
    function dragEnd(e) {
        e.preventDefault()
    }
    function dragDrop() {
        let shipNameWithLastId = draggedShip.lastChild.id
        let shipClass = shipNameWithLastId.slice(0, -2)
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
        let shipLastId = lastShipIndex + parseInt(this.dataset.id)
        const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 12, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93]
        const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60]

        let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
        let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)
        let takenSquare = false

        selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
        shipLastId = shipLastId - selectedShipIndex
        
        if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
            
            for (let i = 0; i < draggedShipLength; i++) {
                if (userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.contains('taken', shipClass)){
                    takenSquare = true
                }
            }
            for (let i = 0; i < draggedShipLength; i++) {
                if(!takenSquare) {
                    let directionClass
                    if (i === 0) directionClass = 'start'
                    if (i === draggedShipLength -1) directionClass = 'end'
                    userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass)
                }
            }
        } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId) ) {
            for (let i = 0; i < draggedShipLength; i++) {
                if (userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.contains('taken', shipClass)) {
                    takenSquare = true
                }
            }
            for (let i = 0; i < draggedShipLength; i++) {
                if (!takenSquare) {
                    let directionClass
                    if (i === 0) directionClass = 'start'
                    if (i === draggedShipLength -1) directionClass = 'end'
                    userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', 'vertical', directionClass, shipClass)
                }
            } 
        } else return
        if (!takenSquare) {
            displayGrid.removeChild(draggedShip)
        }
    }
    
    // Game logic
    function playGame() {
        if (isGameOver) return
        if (currentPlayer === 'user') {
            turnDisplay.innerHTML = 'Your Go'
            computerSquares.forEach(square => square.addEventListener('click', function(e) {
                revealSquare(square)
            }))
        }
        if (currentPlayer === 'computer') {
            turnDisplay.innerHTML = 'Computers Go'
            setTimeout (computerGo, 1000)
        }
    }
    startButton.addEventListener('click', () => {

        battleshipImage.classList.remove('splash-battleship-image')
        battleshipImage.classList.add('splash-battleship-image-game-start')
        battleshipTitle.classList.remove('splash-title')
        battleshipTitle.classList.add('splash-title-game-start')
        
        let containsDestroyer = false
        let containsSubmarine = false
        let containsCruiser = false
        let containsBattleship = false
        let containsCarrier = false
        
        for (let i = 0; i < userSquares.length; i++) {

             let searchDestroyer = userSquares[i].classList.contains('destroyer')
             let searchSubmarine = userSquares[i].classList.contains('submarine')
             let searchCruiser = userSquares[i].classList.contains('cruiser')
             let searchBattleship = userSquares[i].classList.contains('battleship')
             let searchCarrier = userSquares[i].classList.contains('carrier')
             if (searchDestroyer) containsDestroyer = true
             if (searchSubmarine) containsSubmarine = true
             if (searchCruiser) containsCruiser = true
             if (searchBattleship) containsBattleship = true
             if (searchCarrier) containsCarrier = true 
        }
        if (containsDestroyer && containsSubmarine && containsCruiser && containsBattleship && containsCarrier) {
            setupButtons.style.display = 'none'
            playGame()
        } else {
            alert('Please deploy all ships to play')
        }  
    })

    let destroyerCount = 0
    let submarineCount = 0
    let cruiserCount = 0
    let battleshipCount = 0
    let carrierCount = 0

    function revealSquare(square) {
        if (!square.classList.contains('boom') && !square.classList.contains('miss')) {
            if (square.classList.contains('destroyer')) destroyerCount++
            if (square.classList.contains('submarine')) submarineCount++
            if (square.classList.contains('cruiser')) cruiserCount++
            if (square.classList.contains('battleship')) battleshipCount++
            if (square.classList.contains('carrier')) carrierCount++
            checkForWins()
            if(square.classList.contains('taken')) {
                square.classList.add('boom')
                square.classList.remove('noDisplay')
            } else {
                square.classList.add('miss')
            }
            currentPlayer = 'computer'
            playGame()
        }
       
        
    }

    let cpuDestroyerCount = 0
    let cpuSubmarineCount = 0
    let cpuCruiserCount = 0
    let cpuBattleshipCount = 0
    let cpuCarrierCount = 0

    function computerGo() {
        let random = Math.floor(Math.random() * userSquares.length)
        if (!userSquares[random].classList.contains('boom')) {
            if (userSquares[random].classList.contains('taken')) {
                userSquares[random].classList.add('boom')
            } else {
                userSquares[random].classList.add('miss')
            }
            if (userSquares[random].classList.contains('destroyer')) cpuDestroyerCount++
            if (userSquares[random].classList.contains('submarine')) cpuSubmarineCount++
            if (userSquares[random].classList.contains('cruiser')) cpuCruiserCount++
            if (userSquares[random].classList.contains('battleship')) cpuBattleshipCount++
            if (userSquares[random].classList.contains('carrier')) cpuCarrierCount++
            checkForWins()
        } else computerGo()
        currentPlayer = 'user'
        turnDisplay.innerHTML = 'Your Go'
    }
    function checkForWins() {
        if (destroyerCount === 2) {
            infoDisplay.innerHTML = 'You sunk the computers destroyer'
            destroyerCount = 10
        }
        if (cruiserCount === 3) {
            infoDisplay.innerHTML = 'You sunk the computers cruiser'
            cruiserCount = 10
        }
        if (submarineCount === 3) {
            infoDisplay.innerHTML = 'You sunk the computers submarine'
            submarineCount = 10
        }
        if (battleshipCount === 4) {
            infoDisplay.innerHTML = 'You sunk the computers battleship'
            battleshipCount = 10
        }
        if (carrierCount === 5) {
            infoDisplay.innerHTML = 'You sunk the computers carrier'
            carrierCount = 10
        }
        if (cpuDestroyerCount === 2) {
            infoDisplay.innerHTML = 'They sunk your destroyer'
            cpuDestroyerCount = 10
        }
        if (cpuCruiserCount === 3) {
            infoDisplay.innerHTML = 'They sunk your cruiser'
            cpuCruiserCount = 10
        }
        if (cpuSubmarineCount === 3) {
            infoDisplay.innerHTML = 'They sunk your submarine'
            cpuSubmarineCount = 10
        }
        if (cpuBattleshipCount === 4) {
            infoDisplay.innerHTML = 'They sunk your battleship'
            cpuBattleshipCount = 10
        }
        if (cpuCarrierCount === 5) {
            infoDisplay.innerHTML = 'They sunk your carrier'
            cpuCarrierCount = 10
        }
        if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
            infoDisplay.innerHTML = 'YOU WIN!'
            gameOver()
        }
        if ((cpuDestroyerCount + cpuCruiserCount + cpuSubmarineCount + cpuBattleshipCount + cpuCarrierCount) === 50) {
            infoDisplay.innerHTML = 'YOU LOST!'
            gameOver()
        }
    }
    function gameOver() {
        isGameOver = true
        startButton.removeEventListener('click', playGame)
    }
    // Reset game
    function gameReset() {
        location.reload()
    }
    resetButton.addEventListener('click', gameReset)
})
