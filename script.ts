const gameContainer = document.getElementById("game-container")!;
const drone = document.getElementById("drone")!;
const scoreDisplay = document.getElementById("score")!;
const timerDisplay = document.getElementById("timer")!;

let droneX = 300;
let droneY = 200;
let score = 0;
let timeLeft = 30;
let interval: number;

// Crear zonas de desastre aleatorias
function createZones() {
  for (let i = 0; i < 5; i++) {
    const zone = document.createElement("div");
    zone.classList.add("zone");
    zone.style.left = `${Math.random() * 550}px`;
    zone.style.top = `${Math.random() * 350}px`;
    gameContainer.appendChild(zone);
  }
}

// Detectar colisiones
function checkCollision() {
  const zones = document.querySelectorAll(".zone");
  zones.forEach(zone => {
    const zoneRect = zone.getBoundingClientRect();
    const droneRect = drone.getBoundingClientRect();
    if (
      droneRect.left < zoneRect.right &&
      droneRect.right > zoneRect.left &&
      droneRect.top < zoneRect.bottom &&
      droneRect.bottom > zoneRect.top
    ) {
      zone.remove();
      score++;
      scoreDisplay.textContent = `Puntos: ${score}`;
    }
  });
}

// Movimiento del dron
function moveDrone(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowUp":
      if (droneY > 0) droneY -= 10;
      break;
    case "ArrowDown":
      if (droneY < 360) droneY += 10;
      break;
    case "ArrowLeft":
      if (droneX > 0) droneX -= 10;
      break;
    case "ArrowRight":
      if (droneX < 560) droneX += 10;
      break;
  }
  drone.style.left = `${droneX}px`;
  drone.style.top = `${droneY}px`;
  checkCollision();
}

// Contador regresivo
function startTimer() {
  interval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Tiempo: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      document.removeEventListener("keydown", moveDrone);
      alert(`¡Juego terminado! Puntos: ${score}`);
    }
  }, 1000);
}

// Iniciar juego
function startGame() {
  createZones();
  document.addEventListener("keydown", moveDrone);
  startTimer();
}

startGame();
