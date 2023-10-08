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

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, setMove, resetBoard };
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
};

const GameController = (() => {
    let player1, player2, currentPlayer;

    const startGame = (player1Name, player2Name) => {
        player1 = Player(player1Name, "X");
        player2 = Player(player2Name, "O");
        currentPlayer = player1;
        Gameboard.resetBoard();
        DisplayController.updateMessage(`${currentPlayer.getName()}'s turn`);
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const isWinner = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return board[index] === currentPlayer.getSymbol();
            });
        });
    };

    const isTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    const playTurn = (index) => {
        if (Gameboard.setMove(index, currentPlayer.getSymbol())) {
            if (isWinner()) {
                DisplayController.showWinner(currentPlayer.getName());
                return;
            } else if (isTie()) {
                DisplayController.showTie();
                return;
            }
            switchPlayer();
            DisplayController.updateMessage(`${currentPlayer.getName()}'s turn`);
        }
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        DisplayController.updateMessage(`${currentPlayer.getName()}'s turn`);
    };

    return { playTurn, getCurrentPlayer, startGame, restartGame };
})();

const DisplayController = (() => {
    const gameboardElement = document.getElementById("gameboard");
    const messageElement = document.getElementById("message");
    const startButton = document.getElementById("startButton");
    const retryButton = document.getElementById("retryButton");
    const player1NameInput = document.getElementById("player1Name");
    const player2NameInput = document.getElementById("player2Name");

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

        startButton.addEventListener("click", () => {
            const player1Name = player1NameInput.value || "Player 1";
            const player2Name = player2NameInput.value || "Player 2";
            GameController.startGame(player1Name, player2Name);
            render();
            retryButton.style.display = "none"; // Hide the retry button
        });

        retryButton.addEventListener("click", () => {
            GameController.restartGame();
            render();
            retryButton.style.display = "none"; // Hide the retry button
        });
    };

    const render = () => {
        renderBoard();
        updateMessage(`${GameController.getCurrentPlayer().getName()}'s turn`);
    };

    const showWinner = (winnerName) => {
        updateMessage(`${winnerName} Wins!`);
        retryButton.style.display = "block"; // Show the retry button
    };

    const showTie = () => {
        updateMessage("It's a Tie!");
        retryButton.style.display = "block"; // Show the retry button
    };

    return { render, setupEventListeners, updateMessage, showWinner, showTie };
})();

// Initialize game
DisplayController.setupEventListeners();
