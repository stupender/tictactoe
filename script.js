// Holds the players -- using factories
let playerFactory = (name, mark) => {
    let playTurn = (board, cell) => {
        let index = board.cell.findIndex(position => position === cell);
        if (board.boardArray[index] = "") {
            board.render();
            return index;
        }
        return null
    };

    return {
        name,
        mark,
        playTurn
    }
};

// Holds the gameboard array -- using modules
let gameBoardModule = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];
    let gameBoard = document.querySelector(".board");
    let cells = Array.from(document.querySelectorAll(".cell"));
    let winner = null;

    let render = () => {
        boardArray.forEach((mark, index) => {
            cells[index].textContent = boardArray[index];
        })
    }

    let reset = () => {
        boardArray = ["", "", "", "", "", "", "", "", ""];
    }

    let checkWin = () => {
        let winArrays = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Look over this for a stronger understanding
        winArrays.forEach((combo) => {
            if (boardArray[combo[0]]
            && boardArray[combo[0]] === boardArray[combo[1]]
            && boardArray[combo[0]] === boardArray[combo[2]]) {
                winner = "current";
            }
        });
        return winner || (boardArray.includes("") ? null : "Tie");
    };

    return {
        render,
        gameBoard,
        cells,
        boardArray,
        checkWin,
        reset
    }
})();


// Controls the flow of the game -- using modules
let gamePlay = (() => {
    let playerOneName = document.querySelector("#player-1");
    let playerTwoName = document.querySelector("#player-2");
    let form = document.querySelector(".player-names");
    let resetButton = document.querySelector("#reset");
    let currentPlayer;
    let playerOne;
    let playerTwo;
    
    //Review this
    let switchTurn = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    let gameRound = () => {
        let board = gameBoardModule;
        let gameStatus = document.querySelector(".game-status");
        if (currentPlayer.name !== "") {
            gameStatus.textContent = `${currentPlayer.name}'s Turn`
        }
        else {
            return;        
        }

        board.gameBoard.addEventListener("click", (event) => {
            event.preventDefault();
            let play = currentPlayer.playTurn(board, event.target);
            if (play !== null) {
                board.boardArray[play] = `${currentPlayer.mark}`;
                board.render();
                let winStatus = board.checkWin();
                if (winStatus == "Tie") {
                    gameStatus.textContent = "Tie!"
                } else if (winStatus === null) {
                    switchTurn();
                    gameStatus.textContent = `${currentPlayer.name}'s Turn`;
                } else {
                    gameStatus.textContent = `${currentPlayer.name} Wins!`;
                    board.reset();
                    board.render();
                }
            }
        });
    };

    let gameInit = () => {
        if (playerOneName !== "" && playerTwoName !== "") {
            playerOne = playerFactory(playerOneName.value, "X")
            playerTwo = playerFactory(playerTwoName.value, "O")
            currentPlayer = playerOne;
            gameRound();
        }
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (playerOneName !== "" && playerTwoName !== "") {
            gameInit();
            form.classList.add("hidden");
            document.querySelector(".place").classList.remove("hidden");
        } else {
            window.location.reload();
        }
    });

    resetButton.addEventListener("click", () => {
        if (playerOneName !== "" && playerTwoName !== "") {
            document.querySelector(".game-status").textContent = "";
            document.querySelector("#player1").value = "";
            document.querySelector("#player2").value = "";
            window.location.reload();
        } else {
            return;
        }
    });

    return {
        gameInit
    };

})();