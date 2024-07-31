let playerX = "X";
let playerO = "O";
let currentPlayer = playerX; // Always start with player X
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let gameOver = false;

let scoreX = 0;
let scoreO = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    currentPlayer = playerX; // Reset to player X for each new game
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
    gameOver = false;
    removeGlow(); // Remove glow effect from all boxes
    boxes.forEach(box => box.classList.add("blue-glow"));

    // Prompt player 1 if they want to start again with "O"
    if (currentPlayer === playerO) {
        let startWithO = confirm("Player 1, do you want to start again with 'O'?");
        if (startWithO) {
            currentPlayer = playerO;
        }
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }

    // Check for draw
    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        showDraw();
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameOver = true;
    updateScore(winner);
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    gameOver = true;
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const updateScore = (winner) => {
    if (winner === playerX) {
        scoreX++;
    } else if (winner === playerO) {
        scoreO++;
    }
    document.getElementById("OWins").innerText = scoreO;
    document.getElementById("XWins").innerText = scoreX;
};

const computerMove = () => {
    // Simulate computer's move by randomly choosing an empty box
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        emptyBoxes[randomIndex].innerText = currentPlayer;
        currentPlayer = currentPlayer === playerX ? playerO : playerX; // Switch player
        checkWinner();
    }
};
let player1=true;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(!gameOver && box.innerText==="" && player1)
            {
                 box.innerText = currentPlayer;
                    currentPlayer = currentPlayer === playerX ? playerO : playerX; // Switch player
                    checkWinner();
                    computerMove();
        
            } 
        else if (!gameOver && box.innerText === "") {
                    box.innerText = currentPlayer;
                    currentPlayer = currentPlayer === playerX ? playerO : playerX; // Switch player
                    checkWinner();
            }
    });
});

resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", resetGame); // Just reset the game when new game button is clicked

function speak() {
    let synth = window.speechSynthesis;
    let voice = new SpeechSynthesisUtterance(textbox.value);
    synth.speak(voice);
}

/* if(!gameOver) && box.innerText==="" && 1player)
    {
         box.innerText = currentPlayer;
            currentPlayer = currentPlayer === playerX ? playerO : playerX; // Switch player
            checkWinner();
            computerMove();

    } 
    else if (!gameOver && box.innerText === "") {
            box.innerText = currentPlayer;
            currentPlayer = currentPlayer === playerX ? playerO : playerX; // Switch player
            checkWinner();
        }*/