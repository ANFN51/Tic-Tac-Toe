document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelectorAll('[data-cell]');
  const status = document.getElementById('status');
  const startButton = document.getElementById('start-restart');
  const playAgainButton = document.getElementById('play-again');
  const modeRadios = document.querySelectorAll('input[name="mode"]');

  let currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
  let isGameActive = true;

  function initializeBoard() {
    board.forEach(cell => {
      cell.textContent = '';
      cell.dataset.value = ''; 
      cell.classList.remove('disabled');
      cell.addEventListener('click', handleCellClick, { once: true });
    });
    isGameActive = true;
    updateStatus();
  }

  function updateStatus() {
    status.textContent = `It is ${currentPlayer}'s turn.`;
  }
  
  function handleCellClick(event) {
    if (!isGameActive) return;
    const cell = event.target;

    cell.textContent = currentPlayer;
    cell.dataset.value = currentPlayer;

    if (checkWin()) {
      status.textContent = `${currentPlayer} wins!`;
      isGameActive = false;
      playAgainButton.disabled = false;
      return;
    } else if (isBoardFull()) {
      status.textContent = "It's a tie!";
      isGameActive = false;
      playAgainButton.disabled = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }

  function checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]            
    ];

    const values = Array.from(board).map(cell => cell.dataset.value);
    return winPatterns.some(pattern => 
      pattern.every(index => values[index] && values[index] === currentPlayer)
    );
  }

  function isBoardFull() {
    return Array.from(board).every(cell => cell.dataset.value);
  }

  startButton.addEventListener('click', () => {
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    playAgainButton.disabled = true;
    initializeBoard();
  });

  playAgainButton.addEventListener('click', () => {
    playAgainButton.disabled = true;
    initializeBoard();
  });

  initializeBoard();
});
