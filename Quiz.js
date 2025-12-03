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

// --- ADD FEEDBACK ELEMENT ---
const feedbackQuiz = document.createElement('p');
feedbackQuiz.id = "quiz-feedback";
feedbackQuiz.style.fontSize = "1.2em";
feedbackQuiz.style.marginTop = "10px";
quizBox.appendChild(feedbackQuiz);

// LOAD FIRST QUESTION
loadQuestion();

// LOAD QUESTION
function loadQuestion() {
    const current = quizData[index];
    quizImage.src = current.img;
    progress.textContent = `${index + 1} / ${quizData.length}`;
}

// DISABLE / ENABLE CHOICE BUTTONS
function disableChoices(disabled) {
    document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = disabled);
}

// USER ANSWERS
function answer(choice) {
    const correctAnswer = quizData[index].answer;

    // Show immediate feedback
    if (choice === correctAnswer) {
        score++;
        feedbackQuiz.textContent = `✅ Correct!`;
        feedbackQuiz.style.color = "#4cc9f0";
    } else {
        feedbackQuiz.textContent = `❌ Incorrect! Correct answer: ${correctAnswer.toUpperCase()}`;
        feedbackQuiz.style.color = "#ff4c4c";
    }

    // Disable buttons temporarily to prevent multiple clicks
    disableChoices(true);

    // Move to next question after a short delay
    setTimeout(() => {
        index++;
        feedbackQuiz.textContent = ""; // clear feedback
        disableChoices(false); // re-enable buttons

        if (index < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500); // 1.5 seconds delay so user can see feedback
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

// === DRAG & DROP QUIZ ===
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
