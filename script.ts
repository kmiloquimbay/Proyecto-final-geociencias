// Obtener referencias y variables iniciales
const gameContainer = document.getElementById("game-container")!;
const drone = document.getElementById("drone")!;
const scoreDisplay = document.getElementById("score")!;
const timerDisplay = document.getElementById("timer")!;

let droneX = window.innerWidth / 2 - 20; // Inicializa centrado
let droneY = window.innerHeight / 2 - 20; // Inicializa centrado
let score = 0;
let timeLeft = 30;
let interval: number;
let moveInterval: number;
let i_zone = 0;

// Dimensiones dinámicas
let containerWidth = window.innerWidth;
let containerHeight = window.innerHeight;

// Dirección inicial (por defecto a la derecha)
let direction = "right";

// Actualiza las dimensiones del contenedor al redimensionar la ventana
function updateContainerDimensions() {
  containerWidth = window.innerWidth;
  containerHeight = window.innerHeight;
}

// Inicializa la posición inicial del dron
function initializeDronePosition() {
  drone.style.left = `${droneX}px`;
  drone.style.top = `${droneY}px`;
}

// Crea zonas de desastre
function createZones(zones: number) {
  const disasterImages = ["fire.png", "earthquake.png", "flood.png"];
  const zoneWidth = 50;
  const zoneHeight = 50;

  for (let i = 0; i < zones; i++) {
    const zone = document.createElement("div");
    zone.id = `zone${i_zone}`;
    zone.classList.add("zone");

    const img = document.createElement("img");
    img.src = disasterImages[Math.floor(Math.random() * disasterImages.length)];
    img.alt = "Zona de desastre";

    // Generar posiciones asegurando que no se salga de los bordes
    const zoneX = Math.random() * (containerWidth - zoneWidth);
    const zoneY = Math.random() * (containerHeight - zoneHeight);

    zone.appendChild(img);
    gameContainer.appendChild(zone);

    const zoneElement = document.getElementById(`zone${i_zone}`);
    if (zoneElement) {
      zoneElement.style.left = `${zoneX}px`;
      zoneElement.style.top = `${zoneY}px`;
    }

    console.log("Zona", i, "en", zoneX, ",", zoneY);
    i_zone++;
  }
}

// Detecta colisiones entre el dron y las zonas
function checkCollision() {
  const zones = document.querySelectorAll(".zone");
  zones.forEach((zone) => {
    const zoneRect = zone.getBoundingClientRect();
    const droneRect = drone.getBoundingClientRect();

    if (
      droneRect.left < zoneRect.right &&
      droneRect.right > zoneRect.left &&
      droneRect.top < zoneRect.bottom &&
      droneRect.bottom > zoneRect.top
    ) {
      zone.remove(); // Eliminar zona
      score++;
      createZones(1); // Crear nueva zona
      scoreDisplay.textContent = `Puntos: ${score}`;
    }
  });
}

// Mueve el dron automáticamente
function moveDrone() {
  switch (direction) {
    case "up":
      if (droneY > 0) droneY -= 1;
      break;
    case "down":
      if (droneY < containerHeight - 40) droneY += 1;
      break;
    case "left":
      if (droneX > 0) droneX -= 1;
      break;
    case "right":
      if (droneX < containerWidth - 40) droneX += 1;
      break;
  }

  // Actualiza la posición del dron
  drone.style.left = `${droneX}px`;
  drone.style.top = `${droneY}px`;

  // Revisa colisiones
  checkCollision();
}

// Cambia la dirección según las teclas presionadas
function changeDirection(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
}

// Inicia el temporizador del juego
function startTimer() {
  interval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Tiempo: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      clearInterval(moveInterval); // Detener el movimiento
      document.removeEventListener("keydown", changeDirection);
      alert(`¡Juego terminado! Puntos: ${score}`);
    }
  }, 1000);
}

// Inicia el juego
function startGame() {
  initializeDronePosition();
  createZones(5);
  document.addEventListener("keydown", changeDirection);
  startTimer();
  moveInterval = setInterval(moveDrone, 1); // Mueve el dron cada 100ms
}

// Actualiza las dimensiones del contenedor cuando la ventana se redimensiona
window.addEventListener("resize", updateContainerDimensions);

// Comienza el juego
startGame();
