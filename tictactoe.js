function Gameboard() {
    const grid = 3;
    const gameboard =[];
    const players = { player1: "X", player2: "O"};

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
        }

        gameboard[row][col] = player;
        console.log(`Player ${player} chose cell ${index}`);
        return true;
    }
    
    return { gameboard, players, getBoard, chooseCell };
}

function playGame (board) {
    // winning logic
    // start and return
    // switch turn

    let turn = 0;
    const switchTurn = (number) => {
            if( turn === 0 ) {
                board.chooseCell(number, board.players.player1);
                turn = 1;
            } else if ( turn === 1 )  {
                board.chooseCell(number, board.players.player2);
                turn = 0;
            }
    }

    const playerWin = () => {
        const B = board.getBoard();
        let gameover = false;

        const winConditions = [
            [[0, 0],[0, 1],[0, 2]],[[1, 0],[1, 1],[1, 2]],[[2, 0],[2, 1],[2, 2]],
            [[0, 0],[1, 0],[2, 0]],[[0, 1],[1, 1],[2, 1]],[[0, 2],[1, 2],[2, 2]],
            [[0, 0],[1, 1],[2, 2]],[[0, 2],[1, 1],[2, 0]]
        ];

        for ( const condition of winConditions ) {
            const [a, b, c] = condition;
            const cell1 = B[a[0]][a[1]];
            const cell2 = B[b[0]][b[1]];
            const cell3 = B[c[0]][c[1]];

            if ( cell1 !== null && cell2 !== null && cell3 !== null ) {
                if (cell1 === cell2 && cell2 === cell3) {
                    console.log(`${cell1 === "x" ? "Player1" : "Player2"} wins!`);
                    gameover = true;
                    break;
                }
            }
        }

        if ( gameover === true ) {
            console.log("Game is Over!");
        };
    }

   return { turn, switchTurn, playerWin };
}

// const a = Gameboard();
// const b = playGame(a);
// b.switchTurn(1);
// b.switchTurn(2);
// b.switchTurn(5);
// b.switchTurn(7);
// b.switchTurn(9);
// b.playerWin();

function screenController() {
    const gBoard = document.querySelector("#gameboard");

    for(let i = 0; i < 9; i++) {
        const div = document.createElement("div");
        div.classList.add(`div${i}`);
        gBoard.appendChild(div);
    }

    const div0 = document.querySelector(".div0");
    const div1 = document.querySelector(".div1");
    const div2 = document.querySelector(".div2");
    const div3 = document.querySelector(".div3");
    const div4 = document.querySelector(".div4");
    const div5 = document.querySelector(".div5");
    const div6 = document.querySelector(".div6");
    const div7 = document.querySelector(".div7");
    const div8 = document.querySelector(".div8");

    const clickEvent = (rule) => {
        let play = rule.turn
        div0.addEventListener("click", () => {
            rule.switchTurn(1);            
            if (play == 0) {
                div0.textContent = "X";
                play = 1;
            } else if (play == 1) {
                div0.textContent = "O";
                play = 0;
            }
        });

        div1.addEventListener("click", () => {
            rule.switchTurn(2);
            if (play == 0) {
                div1.textContent = "X";
                play = 1;
            } else if (play == 1) {
                div1.textContent = "O";
                play = 0;
            }
        });

        div2.addEventListener("click", () => {
            rule.switchTurn(3);
            if (play == 0) {
                div2.textContent = "X";
                play = 1;
            } else if (play == 1) {
                div2.textContent = "O";
                play = 0;
            }
        });

        div3.addEventListener("click", () => {
            rule.switchTurn(4);
            if (play == 0) {
                div3.textContent = "X";
                play = 1;
            } else if (play == 1) {
                div3.textContent = "O";
                play = 0;
            }
        });

        div4.addEventListener("click", () => {
            rule.switchTurn(5);
            if (play === 0) {
                div4.textContent = "X";
                play = 1;
            } else if (play === 1) {
                div4.textContent = "O";
                play = 0;
            }
        });

        div5.addEventListener("click", () => {
            rule.switchTurn(6);
            if (play == 0) {
                div5.textContent = "X";
                play = 1;
            } else if (play == 1) {
                div5.textContent = "O";
                play = 0;
            }
        });

        div6.addEventListener("click", () => {
            rule.switchTurn(7);
            if (play == 0) {
                div6.textContent = "X";
                play = 1;
            } else if (play == 1) {
                div6.textContent = "O";
                play = 0;
            }
        });

        div7.addEventListener("click", () => {
            rule.switchTurn(8);
            if (play == 0) {
                div7.textContent = "X";
                play = 1;
            } else if (play == 1) {
                div7.textContent = "O";
                play = 0;
            }
        });

        div8.addEventListener("click", () => {
            rule.switchTurn(9);
            if (play == 0) {
                div8.textContent = "X";
                play = 1;
            } else if (play == 1) {
                div8.textContent = "O";
                play = 0;
            }
        });
    };

    return { clickEvent };
};

a = Gameboard();
b = playGame(a);
c = screenController();
c.clickEvent(b);

// console.log(b.switchTurn());
// console.log(b.switchTurn());