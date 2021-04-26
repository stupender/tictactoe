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
let gamePlay = {
    
};

// Holds the players -- using factories
let playerFactory = (name, selection) => {
    let playTurn = (board, cell) => {
        let index = board.box.findIndex(position => position === cell);
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

// REVEALING MODULE PATTERN
// let displayController = (function(){
//     function render() {
//     }
//     return {
//         render: render
//     }
// })()
