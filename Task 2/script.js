let startTime, interval, running = false, laps = [], elapsed = 0;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  const time = elapsed + (running ? now - startTime : 0);
  document.getElementById('display').textContent = formatTime(time);

  const hand = document.getElementById('hand');
  const rotation = (time / 100) % 360;
  hand.style.transform = `rotate(${rotation}deg)`; // 🕛 Offset to start at 12 o'clock

}

function startStop() {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 50);
    running = true;
  }
}

function pause() {
  if (running) {
    elapsed += Date.now() - startTime;
    clearInterval(interval);
    running = false;
  }
}

function reset() {
  clearInterval(interval);
  running = false;
  elapsed = 0;
  laps = [];
  document.getElementById('display').textContent = "00:00:00";
  document.getElementById('laps').innerHTML = "";
  document.getElementById('hand').style.transform = "rotate(0deg)";
}

function lap() {
  if (running) {
    const now = Date.now();
    const time = elapsed + (now - startTime);
    laps.push(time);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${formatTime(time)}`;
    document.getElementById('laps').appendChild(li);
  }
}

updateDisplay();
