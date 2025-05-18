const totalFases = 5;
const caminho = document.getElementById('caminho');
const declaracaoBtn = document.getElementById('declaracaoBtn');

let fases = [];
let progresso = parseInt(localStorage.getItem('progresso')) || 0;

for (let i = 0; i < totalFases; i++) {
  const fase = document.createElement('div');
  fase.classList.add('fase');
  fase.dataset.index = i;
  fase.textContent = `F${i + 1}`;

  if (i === 0 || progresso >= i) {
    fase.classList.add('desbloqueada');
  } else {
    fase.classList.add('bloqueada');
  }

  if (i > progresso) {
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
    } else if (index === 1) {
      window.location.href = "memory.html";
    } else if (index === 2) {
      window.location.href = "quiz.html";
    } else if (index === 3) {
      window.location.href = "dodge.html";
    } else if (index === 4) {
      window.location.href = "forca.html";
    }
  });
});

// Exibe botão e redireciona para página de declaração quando clicado
if (progresso >= totalFases) {
  declaracaoBtn.style.display = "inline-block";
}

declaracaoBtn.addEventListener('click', () => {
  window.location.href = "declaracao.html"; // Página da declaração (você cria)
});
