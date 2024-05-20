document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('#message');
    const btnNew = document.querySelector('#btnNew');
    const messageWin = document.querySelector('.messageWin');

    cells.forEach(cell => cell.addEventListener('click', handleClick));

    function handleClick() {
      if (this.textContent === '-') {
        this.textContent = currentPlayer;

        if (checkWinner(currentPlayer)) {
          message.textContent = currentPlayer + ' gana!';
          disableBoard();
          highlightWinner(currentPlayer);
          location.reload();
        } else if (checkDraw()) {
          message.textContent = 'Empate!';
          disableBoard();
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          message.textContent = "Turno de " + currentPlayer;
        }
      }
    }

    function checkWinner(player) {
      const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]             // diagonales
      ];

      
      return winConditions.some(condition =>
        condition.every(cell => cells[cell].textContent === player)
      );
    }

    function highlightWinner() {
      messageWin.classList.add('highlight');
    }

    function checkDraw() {
      return Array.from(cells).every(cell => cell.textContent !== '-');
    }

    function disableBoard(){
      setTimeout(()=>{
        cells.forEach(cell => cell.textContent = '-');
        currentPlayer = 'X';
        message.textContent = '';
      }, 600);

      
    }
    
    btnNew.addEventListener('click', function(){
      cells.forEach(cell => cell.textContent = '-');
      currentPlayer = 'X';
      message.textContent = '';
    })

  });