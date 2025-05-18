const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth - 20, 400);
canvas.height = canvas.width * 1.5;

const player = { x: canvas.width / 2 - 15, y: canvas.height - 30, size: 30 };
let obstacles = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
  });
}

function moveObstacles() {
  obstacles.forEach(obs => obs.y += 5);
  obstacles = obstacles.filter(obs => obs.y < canvas.height);
}

function spawnObstacle() {
  const size = 30;
  const x = Math.random() * (canvas.width - size);
  obstacles.push({ x, y: -size, size });
}

function checkCollision() {
  obstacles.forEach(obs => {
    if (player.x < obs.x + obs.size &&
        player.x + player.size > obs.x &&
        player.y < obs.y + obs.size &&
        player.y + player.size > obs.y) {
      gameOver = true;
    }
  });
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Pontos: " + score, 10, 20);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();
  moveObstacles();
  checkCollision();
  drawScore();

  score++;
  if (score % 50 === 0) spawnObstacle();

  if (score >= 1000) {
    mostrarNarrativa();
    return; // para não chamar requestAnimationFrame de novo
  }

  requestAnimationFrame(gameLoop);
}

function mostrarNarrativa() {
  const narrativa = document.getElementById("narrativa");
  narrativa.classList.remove("oculto"); // tira display:none
  narrativa.classList.add("visivel");   // coloca opacity 1 e pointer-events auto

  gameOver = true; // para o jogo

  setTimeout(() => {
    localStorage.setItem("progresso", "4");
    window.location.href = "index.html";
  }, 5000);
}



// Controles
document.getElementById("leftBtn").addEventListener("click", () => {
  player.x -= 30;
  if (player.x < 0) player.x = 0;
});

document.getElementById("rightBtn").addEventListener("click", () => {
  player.x += 30;
  if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
});

// Toque no canvas
canvas.addEventListener("touchstart", (e) => {
  const touchX = e.touches[0].clientX;
  if (touchX < canvas.width / 2) {
    player.x -= 30;
    if (player.x < 0) player.x = 0;
  } else {
    player.x += 30;
    if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  player.x = canvas.width / 2 - 15;
  obstacles = [];
  score = 0;
  gameOver = false;
  const narrativa = document.getElementById("narrativa");
  narrativa.classList.remove("visivel");
  narrativa.classList.add("oculto");
  gameLoop();
});


// Voltar ao mapa
document.getElementById("voltarBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

gameLoop();
