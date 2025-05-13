
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keyMap = {
'ArrowLeft': '←',
'ArrowUp': '↑',
'ArrowDown': '↓',
'ArrowRight': '→',
'Enter': '⏎',
'Backspace': '⌫',
' ': '␣'
};

const additionalKeys = [];
for (let i = 65; i <= 90; i++) additionalKeys.push(String.fromCharCode(i)); // A–Z
for (let i = 0; i <= 9; i++) additionalKeys.push(i.toString()); // 0–9
additionalKeys.push('␣'); // Space symbol

const laneKeys = ['←', '↑', '↓', '→', '⏎', '⌫', ...additionalKeys];
const defaultSymbols = ['←', '↑', '↓', '→', '⏎', '⌫'];
let activeSymbols = new Set(defaultSymbols);

let notes = [];
let score = 0;
let misses = 0;
let lastSpawnTime = 0;
let spawnInterval = 500;
let symbolSpeed = 2.0;
let isPaused = false;
const laneX = 180;

function spawnNote() {
const symbols = Array.from(activeSymbols);
if (symbols.length === 0) return;
const symbol = symbols[Math.floor(Math.random() * symbols.length)];
notes.push({ symbol, y: 0 });
}

function drawNotes() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#444';
ctx.fillRect(0, 550, 400, 5);

for (let note of notes) {
   ctx.fillStyle = '#0f0';
   ctx.shadowColor = 'rgba(0, 255, 0, 0.5)';
   ctx.shadowBlur = 15;
   ctx.font = '48px monospace';
   ctx.fillText(note.symbol, laneX, note.y);
   note.y += symbolSpeed;
}
}

function updateScore() {
document.getElementById('score').innerText = `Score: ${score} | Misses: ${misses}`;
}

function gameLoop(timestamp) {
if (isPaused) return;
drawNotes();

notes = notes.filter(note => {
   if (note.y > 580) {
      misses++;
      updateScore();
      return false;
   }
   return true;
});

if (timestamp - lastSpawnTime > spawnInterval) {
   spawnNote();
   lastSpawnTime = timestamp;
}

requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener('keydown', (e) => {
const key = e.key;
const symbol = keyMap[key] || key.toUpperCase();

if (!activeSymbols.has(symbol) || notes.length === 0) return;

let bottomNote = notes.reduce((maxNote, currentNote) =>
   currentNote.y > maxNote.y ? currentNote : maxNote, notes[0]);

if (bottomNote.symbol !== symbol) {
   misses++;
   updateScore();
} else {
   const index = notes.indexOf(bottomNote);
   if (index !== -1) notes.splice(index, 1);
   score++;
   updateScore();

   ctx.fillStyle = '#0f0';
   ctx.fillRect(laneX - 5, 545, 30, 10);
}
});

document.getElementById('spawnRateSlider').addEventListener('input', (e) => {
spawnInterval = parseInt(e.target.value);
document.getElementById('spawnRateValue').innerText = e.target.value;
});

document.getElementById('symbolSpeedSlider').addEventListener('input', (e) => {
symbolSpeed = parseFloat(e.target.value);
document.getElementById('symbolSpeedValue').innerText = parseFloat(e.target.value).toFixed(1);
});

document.getElementById('pauseButton').addEventListener('click', () => {
isPaused = !isPaused;
document.getElementById('pauseButton').innerText = isPaused ? "Resume" : "Pause";
if (!isPaused) requestAnimationFrame(gameLoop);
});

document.getElementById('clearButton').addEventListener('click', () => {
notes = [];
score = 0;
misses = 0;
updateScore();
});

// Menu toggle
const menuButton = document.getElementById('menuButton');
const menuPanel = document.getElementById('menuPanel');
menuButton.addEventListener('click', () => {
menuPanel.style.display = menuPanel.style.display === 'none' ? 'block' : 'none';
});

// Populate menu
const symbolMenu = document.getElementById('symbolMenu');
laneKeys.forEach(symbol => {
const btn = document.createElement('button');
btn.innerText = symbol;
btn.className = 'symbol-button';
if (!activeSymbols.has(symbol)) btn.classList.add('inactive');

btn.addEventListener('click', () => {
   if (activeSymbols.has(symbol)) {
      activeSymbols.delete(symbol);
      btn.classList.add('inactive');
   } else {
      activeSymbols.add(symbol);
      btn.classList.remove('inactive');
   }
});

symbolMenu.appendChild(btn);
});
