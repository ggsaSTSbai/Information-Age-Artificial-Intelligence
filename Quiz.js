// === QUIZ DATA ===
const quizData = [
    { img: "r1.jpg", answer: "real" },
    { img: "f1.jpg", answer: "fake" },
    { img: "f2.jpg", answer: "fake" },
    { img: "r2.jpg", answer: "real" },
    { img: "r3.jpg", answer: "real" },
    { img: "f3.jpg", answer: "fake" },
    { img: "r4.jpg", answer: "real" },
    { img: "f4.jpg", answer: "fake" },
    { img: "r6.jpg", answer: "real" },
    { img: "f5.jpg", answer: "fake" },
];

let index = 0;
let score = 0;

// HTML Elements
const quizImage = document.getElementById("quiz-image");
const progress = document.getElementById("progress");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("results");
const scoreLabel = document.getElementById("score");

loadQuestion();

// LOAD QUESTION
function loadQuestion() {
    const current = quizData[index];
    quizImage.src = current.img;
    progress.textContent = `${index + 1} / ${quizData.length}`;
}

// USER ANSWERS
function answer(choice) {
    if (choice === quizData[index].answer) {
        score++;
    }

    index++;

    if (index < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// SHOW RESULTS
function showResults() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreLabel.textContent = `${score} / ${quizData.length}`;
}

// RESTART QUIZ
function restartQuiz() {
    index = 0;
    score = 0;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
}

const tools = document.querySelectorAll('.ai-tool');
const categories = document.querySelectorAll('.category');
const feedback = document.getElementById('match-feedback');
const restartDragBtn = document.getElementById('restart-drag-btn');

tools.forEach(tool => {
    tool.addEventListener('dragstart', dragStart);
});

categories.forEach(cat => {
    cat.addEventListener('dragover', dragOver);
    cat.addEventListener('drop', drop);
});

let draggedTool = null;

function dragStart(e) {
    draggedTool = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const category = e.target.dataset.category;
    const match = draggedTool.dataset.match;

    if (category === match) {
        e.target.appendChild(draggedTool);
        draggedTool.style.background = 'rgba(76, 201, 240, 0.5)';
        feedback.textContent = "✅ Correct!";
        feedback.style.color = "#4cc9f0";
    } else {
        feedback.textContent = "❌ Try Again!";
        feedback.style.color = "#ff4c4c";
        draggedTool.style.background = 'rgba(15, 20, 35, 0.7)';
    }
}

// Restart drag quiz
restartDragBtn.addEventListener('click', () => {
    const grid = document.querySelector('.ai-tool-grid');
    tools.forEach(tool => {
        grid.appendChild(tool);
        tool.style.background = 'rgba(15, 20, 35, 0.7)';
    });

    categories.forEach(cat => {
        cat.textContent = cat.getAttribute('data-category');
    });

    feedback.textContent = '';
});
