const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    return {board} 
})()

const Player = (name, symbol) => {
    return {name, symbol}
}

const Game = (() => {
    const gameboard = Gameboard.board;
    const spaces = Array.from(document.querySelectorAll('.grid-box'))
    const player1 = Player('Jeff', 'X')
    const player2 = Player('Cheese', 'O')
    let turn = player1.symbol

    const addClickEvents = () => {
        spaces.forEach(element => {
            element.addEventListener('click', function(e){
                const position = parseInt(e.target.dataset.desc)
                if(gameboard[position] == ''){
                    e.target.innerHTML = turn
                    gameboard[position] = turn
                    if(turn == player1.symbol){
                        turn = player2.symbol
                    }else{
                        turn = player1.symbol
                    }
                }
                console.log(gameboard)
                announceWinnner(checkForWinner('X'))
                announceWinnner(checkForWinner('O'))
            })
        });
    }

    const checkForWinner = (symbol) => {
        let count = 0;
        if((gameboard[0] == symbol && gameboard[4] == symbol && gameboard[8] == symbol) || (gameboard[2] == symbol && gameboard[4] == symbol && gameboard[6] == symbol)){
            return symbol;
        }
        for(let i = 0; i < gameboard.length; i++){
            if(i % 3 == 0){
                count = 0;
            }
            if(gameboard[i] == symbol){
                count++;
            }else {
                count = 0;
            }
            if(count == 3){
                return symbol;
            }
        }
        count = 0
        for(let i = 0; i < gameboard.length; i++){
            if(gameboard[i] == symbol){
                count++;
                i+=2
            }else {
                count = 0;
            }
            if(count == 3){
                return symbol;
            }
        }
        return false;
    }

    const announceWinnner = (symbol) => {
        if(!symbol){
            return;
        }
        const player = (player1.symbol == symbol) ? player1.name : player2.name
        document.querySelector("#winner").innerHTML = "The Winner is " + player
    }

    const playerSelection = () => {
        
    }
    
    const render = () => {
        addClickEvents()
        playerSelection()
    }
    return {render}
})()

const game = Game;
game.render()