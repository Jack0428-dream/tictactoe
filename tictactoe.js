function Gameboard() {
    const grid = 3;
    const gameboard =[];
    const players = {};

    const savingName = (name1, name2) => {
       players["player1"] = name1;
       players["player2"] = name2;
    };

    // making 3x3 grid
    for(let i = 0; i < grid; i++) {
        gameboard[i] = [];
        for (let j = 0; j < grid; j++) {
            gameboard[i].push(null);
        }
    }

    // the method of getting the entire board
    const getBoard = () => gameboard;

    // function that how for player to choose a cell
    const chooseCell = function (index, player) {
        let row = 0;
        let col = 0;
    
        if ( index == 1 || index == 2 || index == 3 ) {
            row = 0;
            col = index - 1;
        } else if ( index == 4 || index == 5 || index == 6) {
            row = 1;
            col = index - 4;
        } else if ( index == 7 || index == 8 || index == 9) {
            row = 2;
            col = index - 7;
        };


        if ( gameboard[row][col] !== null ){
            console.log("It's Taken!");
            return false;
        } else {
            gameboard[row][col] = player;
            console.log(`Player ${player} chooses cell ${index}`);
        }
    }
    
    return { gameboard, players, getBoard, chooseCell, savingName };
}

function playGame (board) {
    // winning logic
    // start and return
    // switch turn

    let turn = 0;
    const switchTurn = (number) => {
        if( turn === 0 ) {
            temp = board.chooseCell(number, "X");
            if (temp === false ) {
                turn = 0;
            } else {
                turn = 1;
                return true;
            }
            return true;            
        } else if ( turn === 1 )  {
            temp = board.chooseCell(number, "O");
            if (temp === false) {
                turn = 1;
            } else {
                turn = 0;
                return false 
            }
        }
    }

    const playerWin = () => {
        const B = board.getBoard();
        let winner = null;
        let gameover = false;

        const winConditions = [
            [[0, 0],[0, 1],[0, 2]],[[1, 0],[1, 1],[1, 2]],[[2, 0],[2, 1],[2, 2]],
            [[0, 0],[1, 0],[2, 0]],[[0, 1],[1, 1],[2, 1]],[[0, 2],[1, 2],[2, 2]],
            [[0, 0],[1, 1],[2, 2]],[[0, 2],[1, 1],[2, 0]]
        ];
        
        // destructuring exercise
        for ( const condition of winConditions ) {
            const [a, b, c] = condition;
            const cell1 = B[a[0]][a[1]];
            const cell2 = B[b[0]][b[1]];
            const cell3 = B[c[0]][c[1]];

            if (cell1 === cell2 && cell2 === cell3 && cell1 !== null) {
                winner = `${cell1 === "X" ? `${board.players.player1}` : `${board.players.player2}`} wins`;
                gameover = true;
                return {winner, gameover};
            } 
        }
        
        let filledCells = 0;
        for (let row of B) {
            for (let cell of row) {
                if (cell !== null) filledCells++;
            }
        }

        if (filledCells === 9) {
            winner = "Draw!";
            gameover = true;
        }
        return { winner, gameover };
    }

   return { switchTurn, playerWin };
}

function screenController() {
    let gameboard;
    let boardRef;

    const gBoard = document.querySelector("#gameboard");
    const h2 = document.querySelector("h2");
    const body = document.querySelector("body");
    const resetBtn = document.querySelector(".reset");
    const nameBtn = document.querySelector(".name");
    const p1input = document.querySelector("#p1name");
    const p2input = document.querySelector("#p2name");

    const setBoard = (newBoard, newLogic) => {
        gameboard = newBoard;
        boardRef = newLogic;
    };

    for (let i = 1; i <= 9; i++) {
        const div = document.createElement("div");
        div.classList = "cell";
        gBoard.append(div);
        div.dataset.index = i;
    }

    const cells = document.querySelectorAll(".cell");

    const cellBox = () => {
        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                let play = boardRef.switchTurn(cell.dataset.index);

                if (cell.textContent === "" && play === true) {
                    cell.textContent = "X";
                } else if (cell.textContent === "" && play === false) {
                    cell.textContent = "O";
                } else {
                    alert("It's taken. Choose another cell!");
                }

                winAnnounce();
            })
        })
    }

    const winAnnounce = () => {
        const result = boardRef.playerWin();
        if (result.gameover === true) {
            h2.textContent = `${result.winner}`;
        }
    };

    const resetGame = () => {
        cells.forEach((cell) => {
            cell.textContent = "";
        });

        const newGameboard = Gameboard();
        const newLogic = playGame(newGameboard);

        setBoard(newGameboard, newLogic);

        h2.textContent = "Winner is ...";
        namep1.textContent = "";
        namep2.textContent = "";
    };

    resetBtn.addEventListener("click", resetGame);

    const saveName = () => {
        nameBtn.addEventListener("click", () => {
            gameboard.savingName(p1input.value, p2input.value);
            p1input.value = "";
            p2input.value = "";
        })
    }

    return { cellBox, setBoard, saveName };
}

const controller = screenController();

const game = Gameboard();
const logic = playGame(game);

controller.setBoard(game, logic);
controller.cellBox();
controller.saveName();