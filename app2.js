
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");
    let turnO = true;

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

    let playerX = 'X';
    let playerO = 'O';
    let currentPlayer = playerX; // Assuming 'X' starts the game

    const resetGame = () => {
        turnO = true;
        enableBoxes();
        msgContainer.classList.add("hide");
        msg.innerText = "";
        turnO = false;
        removeGlow(); // Remove glow effect from all boxes
        boxes.forEach(box => box.classList.add("blue-glow"));

        let startWithX = confirm("Player 1, do you want to start again with 'X'?");
        currentPlayer = startWithX ? playerX : playerO;
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

    const showDraw = () => {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        turnO = true;
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        updateScore(winner);
        disableBoxes();
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerText === "") {
                box.innerText = currentPlayer;
                currentPlayer = currentPlayer === playerX ? playerO : playerX; // Switch player
                checkWinner();
            }
        });
    });

    const updateScore = (winner) => {
        if (winner === playerX) {
            scoreX++;
        } else if (winner === playerO) {
            scoreO++;
        }
        document.getElementById("OWins").innerText = scoreO;
        document.getElementById("XWins").innerText = scoreX;
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                    return;
                }
            }
        }
        if (Array.from(boxes).every(box => box.innerText !== "")) {
            showDraw();
        }
    };

    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);

    document.getElementById("one-player-btn").addEventListener("click", function() {
        loadScript("app1.js");
    });

    document.getElementById("two-player-btn").addEventListener("click", function() {
        loadScript("app2.js");
    });

    function loadScript(src) {
        var script = document.createElement("script");
        script.src = src;
        document.head.appendChild(script);
    }

    function speak() {
        var text = document.getElementById('textbox').value;
        var speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }
