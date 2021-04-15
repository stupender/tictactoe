// Holds the gameboard array -- using modules
let gameBoard = {
    gameboard: [X, X, X, O, O, O, X, X, X],
};

// Controls the flow of the game -- using modules
let displayController = {
    init: function() {
    },
    cacheDOM: function() {
    },
    bindEvents: function() {
    },
    render: function() {
    }
};

// Holds the players -- using factories
let player = (selection) => {
    let currentPlayer = selection;
    return {
        currentPlayer: currentPlayer
    };
}

let playerOne = new Player();

// REVEALING MODULE PATTERN
// let displayController = (function(){
//     function render() {
//     }
//     return {
//         render: render
//     }
// })()
