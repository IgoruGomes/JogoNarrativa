const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define canvas dimensions com base na tela
canvas.width = Math.min(window.innerWidth - 20, 400);
canvas.height = canvas.width * 0.75;

let paddleY = canvas.height / 2 - 30;
const paddleHeight = 60;
const paddleWidth = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

let playerScore = 0;
const winScore = 10;
let gameOver = false;

function drawEverything() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Raquete
  ctx.fillStyle = "white";
  ctx.fillRect(0, paddleY, paddleWidth, paddleHeight);

  // Bola
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Pontuação
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Pontos: " + playerScore, 10, 20);
}

function moveEverything() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebater nas paredes
  if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;
  if (ballX > canvas.width) ballSpeedX *= -1;

  // Rebater na raquete
  if (ballX < paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
    ballSpeedX *= -1;
    playerScore++;

    if (playerScore >= winScore) {
      gameOver = true;
      setTimeout(() => {
        alert("🎉 Fase 1 concluída!");
        localStorage.setItem("progresso", "1");
        window.location.href = "index.html";
      }, 300);
    }
  }

  // Se errar a bola
  if (ballX < 0) {
    playerScore = 0;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 4;
    ballSpeedY = 4;
  }
}

function gameLoop() {
  if (!gameOver) {
    moveEverything();
    drawEverything();
    requestAnimationFrame(gameLoop);
  }
}

// Controle por mouse
canvas.addEventListener("mousemove", (e) => {
  let rect = canvas.getBoundingClientRect();
  let mouseY = e.clientY - rect.top;
  paddleY = mouseY - paddleHeight / 2;
  limitarRaquete();
});

// Controle por toque
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  let touch = e.touches[0];
  let rect = canvas.getBoundingClientRect();
  let touchY = touch.clientY - rect.top;
  paddleY = touchY - paddleHeight / 2;
  limitarRaquete();
}, { passive: false });

// Impede que a raquete saia da tela
function limitarRaquete() {
  if (paddleY < 0) paddleY = 0;
  if (paddleY > canvas.height - paddleHeight) paddleY = canvas.height - paddleHeight;
}

// Botão "Voltar ao mapa"
document.getElementById("voltarBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

gameLoop();
const totalFases = 5;
const caminho = document.getElementById('caminho');
let fases = [];

// Verifica progresso salvo
let progresso = parseInt(localStorage.getItem('progresso')) || 0;

for (let i = 0; i < totalFases; i++) {
  const fase = document.createElement('div');
  fase.classList.add('fase');
  fase.dataset.index = i;
  fase.textContent = `F${i + 1}`;

  if (i <= progresso) {
    fase.classList.add('desbloqueada');
  } else {
    fase.classList.add('bloqueada');
  }

  // Marca a Fase 2 (índice 1) como futura especial
  if (i === 1) {
    fase.classList.add('futura');
  }

  caminho.appendChild(fase);
  fases.push(fase);
}

fases.forEach((fase, index) => {
  fase.addEventListener('click', () => {
    if (!fase.classList.contains('desbloqueada')) return;

    if (index === 0) {
      window.location.href = "pong.html";
    }
  });
});
// ... (resto do código do jogo)

function mostrarNarrativaEVoltar() {
  const narrativa = document.getElementById("narrativa");
  narrativa.classList.remove("oculta");
  narrativa.classList.add("visivel");

  setTimeout(() => {
    localStorage.setItem("progresso", "1");
    window.location.href = "index.html";
  }, 4000); // Tempo da narrativa
}

function moveEverything() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;
  if (ballX > canvas.width) ballSpeedX *= -1;

  if (ballX < paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
    ballSpeedX *= -1;
    playerScore++;

    if (playerScore >= winScore) {
      gameOver = true;
      setTimeout(() => {
        mostrarNarrativaEVoltar();
      }, 500);
    }
  }

  if (ballX < 0) {
    playerScore = 0;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 4;
    ballSpeedY = 4;
  }
}
// Função para mostrar a tela final após vencer o jogo
function mostrarNarrativaEVoltar() {
  const narrativa = document.getElementById("narrativa");
  narrativa.classList.remove("oculta");
  narrativa.classList.add("visivel");

  setTimeout(() => {
    // Salva o progresso ao vencer a fase 1
    localStorage.setItem("progresso", "1"); // Completar a fase 1
    window.location.href = "index.html"; // Volta para o mapa
  }, 4000); // Mostra a narrativa por 4 segundos
}
