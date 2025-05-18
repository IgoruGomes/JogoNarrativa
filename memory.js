const board = document.getElementById("game-board");

const icons = ["🌙", "⭐", "🌊", "🔥", "❄️", "⚡"];
const cards = [...icons, ...icons]; // pares
let shuffled = cards.sort(() => 0.5 - Math.random());

let selected = [];
let matchedPairs = 0;

shuffled.forEach((icon, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.dataset.index = i;
    card.textContent = icon;

    card.addEventListener("click", () => handleCardClick(card));
    board.appendChild(card);
});

function handleCardClick(card) {
    if (selected.length === 2 || card.classList.contains("reveal")) return;

    card.classList.add("reveal");
    selected.push(card);

    if (selected.length === 2) {
        const [first, second] = selected;
        if (first.dataset.icon === second.dataset.icon) {
            matchedPairs++;
            selected = [];

            if (matchedPairs === icons.length) {
                setTimeout(() => {
                    mostrarNarrativa();
                }, 500);
            }
        } else {
            setTimeout(() => {
                first.classList.remove("reveal");
                second.classList.remove("reveal");
                selected = [];
            }, 1000);
        }
    }
}

function mostrarNarrativa() {
    const narrativa = document.getElementById("narrativa");
    narrativa.classList.remove("oculto");
    narrativa.classList.add("visivel");

    setTimeout(() => {
        localStorage.setItem("progresso", "2");
        window.location.href = "index.html";
    }, 5000);
}
document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "index.html";
});

function mostrarNarrativa() {
    const narrativa = document.getElementById("narrativa");
    narrativa.classList.remove("oculto");
    narrativa.classList.add("visivel");

    setTimeout(() => {
        // Salva o progresso ao vencer a fase 2
        localStorage.setItem("progresso", "2"); // Completar a fase 2
        window.location.href = "index.html"; // Volta para o mapa
    }, 5000);
}
