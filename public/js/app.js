let currentSessionId = null;
let timerInterval = null;
let startTime = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/summary');
    if (!response.ok) throw new Error('Network response was not ok');
    const summary = await response.json();
    updateSummary(summary);
  } catch (error) {
    console.error('Failed to load summary:', error);
  }

  document.getElementById('startStopButton').addEventListener('click', handleStartStop);
});

async function handleStartStop() {
  const button = document.getElementById('startStopButton');

  if (!currentSessionId) {
    // Start new session
    try {
      const response = await fetch('/start', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to start session');
      const { id: sessionId } = await response.json();
      currentSessionId = sessionId;
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
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById('currentSession').textContent = '00:00:00';
}

function updateTimer() {
  const elapsed = Date.now() - startTime;
  document.getElementById('currentSession').textContent = formatTime(elapsed);
}

function updateSummary({ today, week }) {
  document.getElementById('todayTotal').textContent = formatTime(today);
  document.getElementById('weekTotal').textContent = formatTime(week);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
