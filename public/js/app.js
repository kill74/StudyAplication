let currentSessionId = null;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', async () => {
  // Load summary on startup
  try {
    const response = await fetch('/summary');
    if (!response.ok) throw new Error('Network response was not ok');
    const summary = await response.json();
    document.getElementById('todayTotal').textContent = formatTime(summary.today);
    document.getElementById('weekTotal').textContent = formatTime(summary.week);
  } catch (error) {
    console.error('Failed to load summary:', error);
  }
});

document.getElementById('startStopButton').addEventListener('click', handleStartStop);

async function handleStartStop() {
  const button = document.getElementById('startStopButton');

  if (!currentSessionId) {
    // Start new session
    try {
      const response = await fetch('/start', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to start session');
      const session = await response.json();
      currentSessionId = session.id;
      button.textContent = '⏹️ Parar Estudo';
      startTimer();
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  } else {
    // Stop current session
    try {
      await fetch(`/stop/${currentSessionId}`, { method: 'POST' });
      currentSessionId = null;
      button.textContent = '▶️ Iniciar Estudo';
      stopTimer();
      location.reload(); // Refresh to update list
    } catch (error) {
      console.error('Failed to stop session:', error);
    }
  }
}

function startTimer() {
  const startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    document.getElementById('currentSession').textContent = formatTime(elapsed);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById('currentSession').textContent = '00:00:00';
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
