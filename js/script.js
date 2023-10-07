const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const setMove = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    return { getBoard, resetBoard, setMove };
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
};

const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const playTurn = (index) => {
        if (Gameboard.setMove(index, currentPlayer.getSymbol())) {
            // Check for win or draw
            // Switch player if no win or draw
            switchPlayer();
        }
    };

    return { playTurn, getCurrentPlayer };
})();

const DisplayController = (() => {
    const renderBoard = () => {
        const board = Gameboard.getBoard();
        // Code to display the board on the UI
    };

    const updateMessage = (message) => {
        // Code to update UI message
    };

    return { renderBoard, updateMessage };
})();

// Player makes a move at index 0
GameController.playTurn(0);

// Render the board
DisplayController.renderBoard();

// Update UI message
DisplayController.updateMessage(`${GameController.getCurrentPlayer().getName()}'s turn`);
