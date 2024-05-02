// Initialize game variables
let board = [];
let tiles = [];
let pairCount = 0;
let chanceCount = 0;
let startTime = null;
let elapsedTime = 0;
let timeRunning = false;
let parity = null;
let gameOver = false;

// Colors and contrasting colors
const colors = {
    1: "red",
    2: "blue",
    3: "green",
    4: "yellow",
    5: "orange",
    6: "purple",
    7: "pink",
    8: "brown",
    9: "cyan"
};

const contrastingColors = {
    "red": "white",
    "blue": "white",
    "green": "white",
    "yellow": "black",
    "orange": "black",
    "purple": "white",
    "pink": "black",
    "brown": "white",
    "cyan": "black"
};

// Function to create the game board
function createBoard() {
    generateNumbers();
    shuffleBoard();
    for (let i = 0; i < 4; i++) {
        let row = [];
        let matRow = document.createElement('div');
        matRow.id='ROWS';
        for (let j = 0; j < 4; j++) {
            let tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = '';
            tile.style.backgroundColor = 'gray';
            tile.style.color = 'gray';
            tile.style.width='50px';
            tile.style.height='50px';
            tile.addEventListener('click', function() {
                clickTile(i, j);
            });
            matRow.appendChild(tile);
            // document.getElementById('board').appendChild(tile);
            row.push(tile);
        }
        document.getElementById('board').appendChild(matRow)
        tiles.push(row);
    }
    console.log("Board create : Success");
}

// Function to generate numbers in pairs
function generateNumbers() {
    const halfBoard = 8;
    const halfOdd = 4;
    const halfEven = 4;
    const oddNumbers = Array.from({ length: halfOdd }, (_, i) => 2 * i + 1);
    const evenNumbers = Array.from({ length: halfEven }, (_, i) => 2 * (i + 1));
    const shuffledNumbers = shuffle([...oddNumbers, ...evenNumbers]);
    board = [...shuffledNumbers.slice(0, halfBoard), ...shuffledNumbers.slice(0, halfBoard)];
    console.log("generateNumber : success");
}

// Function to shuffle the board
function shuffleBoard() {
    for (let i = board.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [board[i], board[j]] = [board[j], board[i]];
    }
    console.log("Shuffle Board : Success");
    console.log(board);
}

// Function to update info labels
function updateInfoLabels() {
    if (timeRunning) {
        elapsedTime += 1;
        document.getElementById('time').textContent = `Time: ${elapsedTime}s`;
        setTimeout(updateInfoLabels, 1000); // Update every second
    }
}

// Function to handle tile click
function clickTile(i, j) {
    if (startTime === null) {
        startTime = Date.now();
        updateInfoLabels();
        timeRunning = true;
    }

    let value = board[i * 4 + j];
    let bgColor = colors[value];
    let fgColor = contrastingColors[bgColor];
    tiles[i][j].textContent = value;
    tiles[i][j].style.backgroundColor = bgColor;
    tiles[i][j].style.color = fgColor;
    tiles[i][j].style.pointerEvents = 'none';

    console.log("pair Count : ",pairCount);
    if (pairCount % 2 === 0) {
        parity = value % 2;
        console.log("pairty : ",parity);
    } else {
        if (value % 2 !== parity) {
            chanceCount++;
            document.getElementById('chances').textContent = `Chances left: ${2 - chanceCount}`;
            if (chanceCount >= 2) {
                gameOver = true;
                endGame();
            } else if (chanceCount === 1) {
                alert("You have one chance left!");
            }
        }
    }

    pairCount++;
}

// Function to end the game
function endGame() {
    timeRunning = false;
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            tiles[i][j].style.pointerEvents = 'none';
        }
    }
    let gameOverDiv = document.getElementById('game-over');
    gameOverDiv.textContent = `Game Over!\nTime taken: ${elapsed} seconds`;
    gameOverDiv.style.display = 'block';
}

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    createBoard(); // Call the function to create the game board
}

function restartGame() {
    // Reset game variables
    board = [];
    tiles = [];
    pairCount = 0;
    chanceCount = 0;
    startTime = null;
    elapsedTime = 0;
    timeRunning = false;
    parity = null;
    gameOver = false;
    
    // Clear the existing board
    document.getElementById('board').innerHTML = '';
    document.getElementById('game-over').style.display = 'none';
}

function exitGame() {
    // Redirect the user back to the main menu or another page
    window.location.href = 'index.html';
}
