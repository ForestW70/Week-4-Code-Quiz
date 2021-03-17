const questionCont = document.getElementById("questionContainer");
const question = document.getElementById("questionText");
const startButton = document.getElementById("start");
const answCont = document.getElementById("answerButtons");
const startBtn = document.getElementById("startButton");
const nextBtn = document.getElementById("nextButton");
const scoreValue = document.getElementById("score");
const timerValue = document.getElementById("timer");
const intro = document.getElementById("intro");

let index = 0;
let score = 0;
let timer = 75;
let isCorrect = false;
let interval;



startBtn.addEventListener("click", startGame);

function startGame() {
    intro.classList.add("hide");
    startBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
    createAnswers();
    interval = window.setInterval(timerFunk, 1000) 
}

function timerFunk() {
    timer--;
    timerValue.innerText = timer > 0 ? timer : 0;
    if (timer <= 0) {

        createEndScreen();
        clearInterval(interval);
    }

}

function createAnswers() {
    let questionEl = document.createElement("div");
    let answerGrid = document.createElement("div");
    questionEl.innerHTML = questions[index].question;
    questionCont.append(questionEl);
    questionCont.append(answerGrid);
    
    for (let i = 0; i < 4; i++) {
        let answerBtn = document.createElement("button")
        answerBtn.innerText = questions[index].answers[i];
        answerBtn.setAttribute("name", i);
        questionCont.append(answerBtn);
        answerBtn.addEventListener("click", handleClick);
    }

}

function handleClick (e) {
    console.log(e.target.name);
    if (e.target.name == questions[index].correctAnswer) {
        e.target.classList.add("correct");
        isCorrect = true;
        score += 100;
        scoreValue.innerText = score;
        e.target.setAttribute("disabled", true);
    } else {
        timer -= 5; 
        timerValue.innerText = timer > 0 ? timer : 0;

        isCorrect = false; 
    }
    
    
}



nextBtn.addEventListener("click", setNextQuestion);

function setNextQuestion() {
    if (index + 1 === questions.length) {
        // createEndScreen();
        console.log("hello");
    
    } else if (isCorrect) {
        questionCont.innerHTML = '';
        index++;
        createAnswers(index);
        isCorrect = false;
    }
}

function createEndScreen() {
    
}






function selectAnswer() {

}


const questions = [
    {
        question: "who was the best president?",
        answers: [
            "James buchanan",
            "George Bush",
            "the other Geroge Bush",
            "monicaaaaaaa"
        ],
        correctAnswer: 0
    
    },
    {
        question: "what is my fav food?",
        answers: [
            "chip",
            "burger",
            "fry",
            "hut dog"
        ],
        correctAnswer: 2

    },
    {
        question: "what is the first code?",
        answers: [
            "010101",
            "HTML",
            "ATML",
            "C+++++++++"
        ],
        correctAnswer: 1
    }
]
