var gameContainer = document.getElementById("game-container");
var drone = document.getElementById("drone");
var scoreDisplay = document.getElementById("score");
var timerDisplay = document.getElementById("timer");
var droneX = 300;
var droneY = 200;
var score = 0;
var timeLeft = 30;
var interval;
// Crear zonas de desastre aleatorias
function createZones() {
    for (var i = 0; i < 5; i++) {
        var zone = document.createElement("div");
        zone.classList.add("zone");
        zone.style.left = "".concat(Math.random() * 550, "px");
        zone.style.top = "".concat(Math.random() * 350, "px");
        gameContainer.appendChild(zone);
    }
}
// Detectar colisiones
function checkCollision() {
    var zones = document.querySelectorAll(".zone");
    zones.forEach(function (zone) {
        var zoneRect = zone.getBoundingClientRect();
        var droneRect = drone.getBoundingClientRect();
        if (droneRect.left < zoneRect.right &&
            droneRect.right > zoneRect.left &&
            droneRect.top < zoneRect.bottom &&
            droneRect.bottom > zoneRect.top) {
            zone.remove();
            score++;
            scoreDisplay.textContent = "Puntos: ".concat(score);
        }
    });
}
// Movimiento del dron
function moveDrone(e) {
    switch (e.key) {
        case "ArrowUp":
            if (droneY > 0)
                droneY -= 10;
            break;
        case "ArrowDown":
            if (droneY < 360)
                droneY += 10;
            break;
        case "ArrowLeft":
            if (droneX > 0)
                droneX -= 10;
            break;
        case "ArrowRight":
            if (droneX < 560)
                droneX += 10;
            break;
    }
    drone.style.left = "".concat(droneX, "px");
    drone.style.top = "".concat(droneY, "px");
    checkCollision();
}
// Contador regresivo
function startTimer() {
    interval = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = "Tiempo: ".concat(timeLeft, "s");
        if (timeLeft <= 0) {
            clearInterval(interval);
            document.removeEventListener("keydown", moveDrone);
            alert("\u00A1Juego terminado! Puntos: ".concat(score));
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
