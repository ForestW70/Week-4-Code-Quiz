const quizBlock = document.getElementById("quiz-container");
const quizEl = document.getElementById("quiz-container").children[0];
const highscoreBlock = document.getElementById("highscore-container");
const timerBlock = document.getElementById("timer-container");
const startButton = document.getElementById("start-button");


startButton.addEventListener('click', function(event) {
    event.preventDefault();
    quizEl.style.visibility = "hidden";
    createQuiz();
});

function createQuiz() {
    let body = quizEl.createElement("div");
    let question = quizEl.children[0].createElement("p");
    body.appendChild();
    question.appendChild();
    // let question = quizEl.children[0].children[0];
    question.innerHTML("hey how are ya");
};