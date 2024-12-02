const players = [
    { name: 'Player 1', score: 0, mark: 'X'},
    { name: 'Player 2', score: 0, mark: 'O'}
];

function playMatch() {
    document.getElementById('entry').addEventListener('submit', function(event){
        event.preventDefault();
        
        const player1Entry = document.getElementById('player1').value;
        const player2Entry = document.getElementById('player2').value;

        players[0].name = player1Entry;
        players[1].name = player2Entry;

        document.getElementById('entry').style.display = 'none';
        document.getElementById('gameboard').style.display = 'grid';
        document.getElementById('playInfo').style.display = 'flex';

        document.getElementById('p1').textContent = `Player 1: ${players[0].name}`;
        document.getElementById('p2').textContent = `Player 2: ${players[1].name}`;

    });
}

let currentPlayer = players[0];

function grid(){
    const gameboard = document.getElementById('gameboard');
    for(let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        const button = document.createElement('button');
        button.classList.add('tic');
        cell.appendChild(button);

        gameboard.appendChild(cell);
    }
}

function playGame(){
    const box = document.querySelectorAll('.tic');
    box.forEach(box => {
        box.addEventListener('click', () => {
            if (box.textContent === ''){
                box.textContent = currentPlayer.mark;
                const result = gameState();
                currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
            }
        })
    })

    hub();
    // win message and add a point to the winning player
    // after certain points pick a winner
    // alternate starting player based on win?
    // add an option to clear the board
    //have current players box light up
    //result and name insertion
    
}

function gameState(){
    const winners = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    const tacs = document.querySelectorAll('.tic');

    const isWin = winners.some(winCon => {
        if (tacs[winCon[0]].textContent !== '' &&
            tacs[winCon[0]].textContent === tacs[winCon[1]].textContent &&
            tacs[winCon[0]].textContent === tacs[winCon[2]].textContent) {

                winCon.forEach(place => {
                    tacs[place].classList.add('win');
                })

                return true;
        }

    });

    if (isWin){
        return currentPlayer.name;
    }

    const isTie = [...tacs].every(block => block.textContent !== '');
    if (isTie) {
        return 'tie';
    }

    return null;

}

function hub(){
    const switchOne = document.getElementById('p1button');
    switchOne.textContent = players[0].mark;
    switchOne.addEventListener('click', () => {
        currentPlayer = players[0];
    })
    const hubOne = document.getElementById('p1');
    hubOne.innerHTML = `${players[0].name}<br>${players[0].score}`;

    const switchTwo = document.getElementById('p2button');
    switchTwo.innerHTML = players[1].mark;
    switchTwo.addEventListener('click', () => {
        currentPlayer = players[1];
    })
    const hubTwo = document.getElementById('p2');
    hubTwo.innerHTML = `${players[1].name}<br>${players[1].score}`; 
}

playMatch();
grid();
playGame();