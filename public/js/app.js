let currentSessionId = null;
let timerInterval = null;

document.getElementById('startStopButton').addEventListener('click', async () => {
  const button = document.getElementById('startStopButton');
  
  if (!currentSessionId) {
    // Start new session
    const response = await fetch('/start', { method: 'POST' });
    const session = await response.json();
    currentSessionId = session.id;
    button.textContent = '⏹️ Parar Estudo';
    startTimer();
  } else {
    // Stop current session
    await fetch(`/stop/${currentSessionId}`, { method: 'POST' });
    currentSessionId = null;
    button.textContent = '▶️ Iniciar Estudo';
    stopTimer();
    location.reload(); // Refresh to update list
  }
});

function startTimer() {
  const startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    document.getElementById('currentSession').textContent = 
      new Date(elapsed).toISOString().substr(11, 8);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById('currentSession').textContent = '00:00:00';
}

// Load summary on startup
(async () => {
  const response = await fetch('/summary');
  const summary = await response.json();
  document.getElementById('todayTotal').textContent = summary.today;
  document.getElementById('weekTotal').textContent = summary.week;
})();