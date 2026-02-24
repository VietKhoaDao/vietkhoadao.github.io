// flashcards is defined in data.js

let currentIndex = 0;
let shuffledIndices = [];

const card = document.getElementById('main-card');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const nextBtn = document.getElementById('next-btn');
const progressText = document.getElementById('progress-text');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const finishCard = document.getElementById('finish-card');
const restartBtn = document.getElementById('restart-btn');

// Theme Management
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    const isLight = body.classList.contains('light-theme');
    themeToggle.innerHTML = `<span class="icon">${isLight ? '☀️' : '🌙'}</span>`;
});

// Flip Card
card.addEventListener('click', () => {
    card.classList.toggle('flipped');
});

// Initial Game Setup
function initGame() {
    if (typeof flashcards === 'undefined' || flashcards.length === 0) {
        questionEl.innerText = "Không thể tìm thấy dữ liệu flashcard.";
        return;
    }

    // Reset state
    currentIndex = 0;
    shuffledIndices = flashcards.map((_, i) => i);
    shuffle(shuffledIndices);

    finishCard.classList.add('hidden');
    card.classList.remove('hidden');
    card.classList.remove('flipped');
    nextBtn.disabled = false;

    showCard();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showCard() {
    if (currentIndex < shuffledIndices.length) {
        const actualIndex = shuffledIndices[currentIndex];
        const currentData = flashcards[actualIndex];

        // Use timeout to allow transition if needed
        card.classList.remove('flipped');

        setTimeout(() => {
            questionEl.textContent = currentData.question;
            answerEl.textContent = currentData.answer;
            progressText.textContent = `Thẻ: ${currentIndex + 1}/${flashcards.length}`;
        }, 100);

    } else {
        showFinished();
    }
}

function showFinished() {
    card.classList.add('hidden');
    finishCard.classList.remove('hidden');
    progressText.textContent = `Hoàn thành!`;
    nextBtn.disabled = true;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < shuffledIndices.length) {
        showCard();
    } else {
        showFinished();
    }
});

restartBtn.addEventListener('click', initGame);

// Start app
initGame();
