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
