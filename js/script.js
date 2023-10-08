const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setMove = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    return { getBoard, setMove };
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
    const gameboardElement = document.getElementById("gameboard");
    const messageElement = document.getElementById("message");

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        board.forEach((symbol, index) => {
            gameboardElement.children[index].textContent = symbol;
        });
    };

    const updateMessage = (message) => {
        messageElement.textContent = message;
    };

    const setupEventListeners = () => {
        gameboardElement.addEventListener("click", (e) => {
            if (e.target.classList.contains("cell")) {
                const index = e.target.dataset.index;
                GameController.playTurn(index);
                render();
            }
        });
    };

    const render = () => {
        renderBoard();
        updateMessage(`${GameController.getCurrentPlayer().getName()}'s turn`);
    };

    return { render, setupEventListeners };
})();

// Initialize game
DisplayController.setupEventListeners();
DisplayController.render();
