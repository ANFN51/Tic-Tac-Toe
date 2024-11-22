document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelectorAll('[data-cell]');
  const status = document.getElementById('status');
  const startButton = document.getElementById('start-restart');
  const playAgainButton = document.getElementById('play-again');
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const gameCounter = document.createElement('p');
  document.body.appendChild(gameCounter);

  let currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
  let isGameActive = true;
  let gameCount = 0;
  let mode = 'pvp'; 

  function updateGameCounter() {
    gameCounter.textContent = `Games Played: ${gameCount}`;
  }

  function initializeBoard() {
    board.forEach(cell => {
      cell.textContent = '';
      cell.dataset.value = ''; 
      cell.classList.remove('disabled');
      cell.addEventListener('click', handleCellClick, { once: true });
    });
    isGameActive = true;
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    updateStatus();
  }

  function updateStatus() {
    if (isGameActive) {
      status.textContent = `It is ${currentPlayer}'s turn.`;
    }
  }

  function handleCellClick(event) {
    if (!isGameActive) return;
    const cell = event.target;

    if (cell.dataset.value) return; 
    cell.textContent = currentPlayer;
    cell.dataset.value = currentPlayer;

    if (checkWin()) {
      status.textContent = `${currentPlayer} wins!`;
      isGameActive = false;
      gameCount++;
      updateGameCounter();
      playAgainButton.disabled = false;
      return;
    } else if (isBoardFull()) {
      status.textContent = "It's a tie!";
      isGameActive = false;
      gameCount++;
      updateGameCounter();
      playAgainButton.disabled = false;
      return;
    }

    if (mode === 'pvc' && currentPlayer === 'X') {
      currentPlayer = 'O';
      updateStatus();
      setTimeout(computerMove, 500); 
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }
  }

  function computerMove() {
    if (!isGameActive) return;

    const emptyCells = Array.from(board).filter(cell => !cell.dataset.value);
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.textContent = 'O';
      randomCell.dataset.value = 'O';

      if (checkWin()) {
        status.textContent = 'O (Computer) wins!';
        isGameActive = false;
        gameCount++;
        updateGameCounter();
        playAgainButton.disabled = false;
        return;
      } else if (isBoardFull()) {
        status.textContent = "It's a tie!";
        isGameActive = false;
        gameCount++;
        updateGameCounter();
        playAgainButton.disabled = false;
        return;
      }
    }

    currentPlayer = 'X'; 
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
    playAgainButton.disabled = true;
    initializeBoard();
  });

  playAgainButton.addEventListener('click', () => {
    playAgainButton.disabled = true;
    initializeBoard();
  });

  modeRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
      mode = event.target.value;
    });
  });

  initializeBoard();
  updateGameCounter();
});

