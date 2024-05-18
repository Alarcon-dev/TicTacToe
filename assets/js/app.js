document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer = 'X';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', handleClick));

    function handleClick() {
      if (this.textContent === '-') {
        this.textContent = currentPlayer;

        if (checkWinner(currentPlayer)) {
          alert(currentPlayer + ' gana!');
          resetBoard();
        } else if (checkDraw()) {
          alert('Empate!');
          resetBoard();
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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

    function checkDraw() {
      return Array.from(cells).every(cell => cell.textContent !== '-');
    }

    function resetBoard() {
      cells.forEach(cell => cell.textContent = '-');
      currentPlayer = 'X';
    }
  });