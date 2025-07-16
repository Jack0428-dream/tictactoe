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
        } else {
            alert("You choose the wrong indext. Choose between 1 ~ 9");
        }

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
    const switchTurn = () => {
            if( turn === 0 ) {
                number = prompt("Which cell do you wanna choose?");
                board.chooseCell(number, board.players.player1);
                console.log(board.getBoard());
                turn = 1;
            } else if ( turn === 1 )  {
                number = prompt("Which cell do you wanna choose?");
                board.chooseCell(number,board.players.player2);
                console.log(board.getBoard());
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
                if (cell1 === cell2 && cell2 === cell3)
                    console.log(`${cell1 === "x" ? "Player1" : "Player2"} wins!`);
                    gameover = true;
                    break;
            }
        }

        if ( gameover === true ) {
            console.log("Game is Over!");
        };
    }

   return { switchTurn, playerWin };
}

const board1 = Gameboard();
const game = playGame(board1);
board1.chooseCell(1, board1.players.player1);
console.log(board1.getBoard());
game.playerWin();
// board1.chooseCell(5, board1.players.player1);
// game.playerWin();
// board1.chooseCell(9, board1.players.player1);
// game.playerWin();
// board1.chooseCell(4, board1.players.player2);
// game.playerWin();
// board1.chooseCell(6, board1.players.player2);
// game.playerWin();
// board1.chooseCell(7, board1.players.player2);
// game.playerWin();

