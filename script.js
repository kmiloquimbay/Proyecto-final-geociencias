// Obtener referencias y variables iniciales
var gameContainer = document.getElementById("game-container");
var drone = document.getElementById("drone");
var scoreDisplay = document.getElementById("score");
var timerDisplay = document.getElementById("timer");
var droneX = window.innerWidth / 2 - 20; // Inicializa centrado
var droneY = window.innerHeight / 2 - 20; // Inicializa centrado
var score = 0;
var timeLeft = 30;
var interval;
var moveInterval;
var i_zone = 0;
// Dimensiones dinámicas
var containerWidth = window.innerWidth;
var containerHeight = window.innerHeight;
// Dirección inicial (por defecto a la derecha)
var direction = "right";
// Actualiza las dimensiones del contenedor al redimensionar la ventana
function updateContainerDimensions() {
    containerWidth = window.innerWidth;
    containerHeight = window.innerHeight;
}
// Inicializa la posición inicial del dron
function initializeDronePosition() {
    drone.style.left = "".concat(droneX, "px");
    drone.style.top = "".concat(droneY, "px");
}
// Crea zonas de desastre
function createZones(zones) {
    var disasterImages = ["fire.png", "earthquake.png", "flood.png"];
    var zoneWidth = 50;
    var zoneHeight = 50;
    for (var i = 0; i < zones; i++) {
        var zone = document.createElement("div");
        zone.id = "zone".concat(i_zone);
        zone.classList.add("zone");
        var img = document.createElement("img");
        img.src = disasterImages[Math.floor(Math.random() * disasterImages.length)];
        img.alt = "Zona de desastre";
        // Generar posiciones asegurando que no se salga de los bordes
        var zoneX = Math.random() * (containerWidth - zoneWidth);
        var zoneY = Math.random() * (containerHeight - zoneHeight);
        zone.appendChild(img);
        gameContainer.appendChild(zone);
        var zoneElement = document.getElementById("zone".concat(i_zone));
        if (zoneElement) {
            zoneElement.style.left = "".concat(zoneX, "px");
            zoneElement.style.top = "".concat(zoneY, "px");
        }
        console.log("Zona", i, "en", zoneX, ",", zoneY);
        i_zone++;
    }
}
// Detecta colisiones entre el dron y las zonas
function checkCollision() {
    var zones = document.querySelectorAll(".zone");
    zones.forEach(function (zone) {
        var zoneRect = zone.getBoundingClientRect();
        var droneRect = drone.getBoundingClientRect();
        if (droneRect.left < zoneRect.right &&
            droneRect.right > zoneRect.left &&
            droneRect.top < zoneRect.bottom &&
            droneRect.bottom > zoneRect.top) {
            zone.remove(); // Eliminar zona
            score++;
            createZones(1); // Crear nueva zona
            scoreDisplay.textContent = "Puntos: ".concat(score);
        }
    });
}
// Mueve el dron automáticamente
function moveDrone() {
    switch (direction) {
        case "up":
            if (droneY > 0)
                droneY -= 1;
            break;
        case "down":
            if (droneY < containerHeight - 40)
                droneY += 1;
            break;
        case "left":
            if (droneX > 0)
                droneX -= 1;
            break;
        case "right":
            if (droneX < containerWidth - 40)
                droneX += 1;
            break;
    }
    // Actualiza la posición del dron
    drone.style.left = "".concat(droneX, "px");
    drone.style.top = "".concat(droneY, "px");
    // Revisa colisiones
    checkCollision();
}
// Cambia la dirección según las teclas presionadas
function changeDirection(e) {
    switch (e.key) {
        case "ArrowUp":
            if (direction !== "down")
                direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up")
                direction = "down";
            break;
        case "ArrowLeft":
            if (direction !== "right")
                direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left")
                direction = "right";
            break;
    }
}
// Inicia el temporizador del juego
function startTimer() {
    interval = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = "Tiempo: ".concat(timeLeft, "s");
        if (timeLeft <= 0) {
            clearInterval(interval);
            clearInterval(moveInterval); // Detener el movimiento
            document.removeEventListener("keydown", changeDirection);
            alert("\u00A1Juego terminado! Puntos: ".concat(score));
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
document.getElementById("iniciar").addEventListener("click", function() {
    document.getElementById("rules").style.display = "none";
    document.getElementById("iniciar").style.display = "none"; 
startGame();
});