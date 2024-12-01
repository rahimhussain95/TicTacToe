const players = [
    { name: 'Player 1', score: 0, mark: 'X'},
    { name: 'Player 2', score: 0, mark: 'O'}
];

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
                currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
            }
        })
    })

    hub();

    for (let j = 0; j < 9; j*=3){
        const firstTic = document.querySelector('tic')[0];
    }
    // win conditions: if [0].text == 1,2 or 3,6, 
    // if [2].text == 5,8
    // if [4].text == 1,7 or 3,5 or 0,8 or 2,6
    // as long as the text isn't blank and is an x or o
    // win message and add a point to the winning player
    // after certain points pick a winner
    // alternate starting player based on win?
    // add an option to clear the board
    // winner has a line drawn or the mark is red for one person?
    //have current players box light up
    
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

grid();
playGame();