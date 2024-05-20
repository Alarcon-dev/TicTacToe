document.addEventListener('DOMContentLoaded', function() {
  let currentPlayer = 'X';
  const cells = document.querySelectorAll('.cell');
  const message = document.querySelector('#message');
  const btnNew = document.querySelector('#btnNew');
  const messageWin = document.querySelector('#messageWin');
  

  cells.forEach(cell => cell.addEventListener('click', handleClick));

  function handleClick() {
    if (this.textContent === '-') {
      this.textContent = currentPlayer;

      if (checkWinner(currentPlayer)) {
        messageWin.textContent = currentPlayer + ' is the winner!';
        disableBoard();
        highlightWinner();
      } else if (checkDraw()) {
        message.textContent = 'Both players are tied!';
        disableBoard();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = "Turn " + currentPlayer;
      }
    }
  }

  function checkWinner(player) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winConditions.some(condition =>
      condition.every(cell => cells[cell].textContent === player)
    );
  }

  function highlightWinner() {
    const winCondition = getWinningCondition(currentPlayer);
    winCondition.forEach(cellIndex => {
      cells[cellIndex].classList.add('highlight');
    });
    setTimeout(() => {
      winCondition.forEach(cellIndex => {
        cells[cellIndex].classList.remove('highlight');
      });
    }, 1000);
  }

  function getWinningCondition(player) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winConditions.find(condition =>
      condition.every(cell => cells[cell].textContent === player)
    );
  }

  function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== '-');
  }

  function disableBoard(){
    setTimeout(()=>{
      cells.forEach(cell => cell.textContent = '-');
      currentPlayer = 'X';
      message.textContent = '';
      messageWin.textContent = '';
    },600);
  }
  
  btnNew.addEventListener('click', function(){
    cells.forEach(cell => cell.textContent = '-');
    currentPlayer = 'X';
    message.textContent = '';
    document.reload();
  })

});
