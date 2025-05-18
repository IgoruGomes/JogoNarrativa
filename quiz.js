const submitBtn = document.getElementById("submitBtn");
const voltarBtn = document.getElementById("voltarBtn");
const answerInput = document.getElementById("answer");
const narrativa = document.getElementById("narrativa");

submitBtn.addEventListener("click", handleSubmit);
voltarBtn.addEventListener("click", () => window.location.href = "index.html");

function handleSubmit() {
  const playerAnswer = answerInput.value.trim().toLowerCase();

  const correctAnswer = "roxo";

  if (playerAnswer === correctAnswer) {
    mostrarNarrativa();
  } else {
    alert("Resposta errada! Tente novamente.");
  }
}

function mostrarNarrativa() {
  narrativa.classList.remove("oculto");
  narrativa.classList.add("visivel");

  // AQUI: antes estava "1", deve ser "3"
  localStorage.setItem("progresso", "3");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 5000);
}
