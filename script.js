// Holds the players -- using factories
const playerFactory = (name, mark) => {
    const playTurn = (board, cell) => {
        const index = board.cells.findIndex(position => position === cell); // Cannot .findIndex of undefined
        if (board.boardArray[index] === "") {
            board.render();
            return index;
        }
        return null;
    };
    return {
        name,
        mark,
        playTurn
    };
};


// Holds the gameboard array -- using modules
const gameBoardModule = (() => {
    const boardArray = ["", "", "", "", "", "", "", "", ""];
    const gameBoard = document.querySelector(".board");
    const cells = Array.from(document.querySelectorAll(".cell"));
    const winner = null;

    // what is mark for?
    const render = () => {
        boardArray.forEach((mark, index) => {
            cells[index].textContent = boardArray[index];
        })
    }

    const reset = () => {
        boardArray = ["", "", "", "", "", "", "", "", ""];
    }

    const checkWin = () => {
        const winArrays = [
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
    };
})();


// Controls the flow of the game -- using modules
const gamePlay = (() => {
    const playerOneName = document.querySelector("#player-1");
    const playerTwoName = document.querySelector("#player-2");
    const form = document.querySelector(".player-names");
    const resetButton = document.querySelector("#reset");
    let currentPlayer;
    let playerOne;
    let playerTwo;
    
    //Review this
    const switchTurn = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const gameRound = () => {
        const board = gameBoardModule;
        const gameStatus = document.querySelector(".game-status");
        if (currentPlayer.name !== "") {
            gameStatus.textContent = `${currentPlayer.name}'s Turn`;
        } 
        // else {
        //     gameStatus.textContent = 'Board: ';
        // }

        board.gameBoard.addEventListener("click", (event) => {
            //What is preventDefault?
            event.preventDefault();
            const play = currentPlayer.playTurn(board, event.target); // Cannot .findIndex of undefined
            if (play !== null) {
                board.boardArray[play] = `${currentPlayer.mark}`;
                board.render();
                const winStatus = board.checkWin();
                if (winStatus === "Tie") {
                    gameStatus.textContent = "Tie!";
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

    const gameInit = () => {
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
            document.querySelector(".game-status").textContent = "";
            document.querySelector("#player-1").value = "";
            document.querySelector("#player-2").value = "";
            window.location.reload();
    });

    return {
        gameInit
    };

})();

gamePlay.gameInit();