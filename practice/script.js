// defining my paths by getting ID's
const questionCont = document.getElementById("questionContainer");
const startBtn = document.getElementById("startButton");
const nextBtn = document.getElementById("nextButton");
const scoreValue = document.getElementById("score");
const timerValue = document.getElementById("timer");
const intro = document.getElementById("greeting");
const progressCont = document.getElementById("quizProgress")

// setting up variables that will be tracked and used later on
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
    progressCont.classList.remove("hide");
    createAnswers();
    interval = window.setInterval(timerFunk, 1000) 
}


function createAnswers() {
    let questionEl = document.createElement("div");
    let answerGrid = document.createElement("div");
    questionEl.setAttribute("class", "question");
    answerGrid.setAttribute("class", "answer-grid");
    questionEl.innerHTML = questions[index].question;
    questionCont.append(questionEl);
    questionCont.append(answerGrid);
    
    for (let i = 0; i < 4; i++) {
        let answerBtn = document.createElement("button")
        answerBtn.innerText = questions[index].answers[i];
        answerBtn.setAttribute("name", i);
        answerBtn.setAttribute("class", "btn");
        answerBtn.classList.add("hover-effect");
        answerGrid.append(answerBtn);
        answerBtn.addEventListener("click", handleClick);
    }
    
}

function timerFunk() {
    timer--;
    timerValue.innerText = timer > 0 ? timer : 0;
    if (timer <= 0) {
        createEndScreen();
        clearInterval(interval);
    }

}

function handleClick (e) {
    
    if (e.target.name == questions[index].correctAnswer) {
        e.target.classList.add("correct");
        isCorrect = true;
        score += 100;
        scoreValue.innerText = score;
        questionCont.querySelectorAll("button").forEach(function(val) {
            val.setAttribute("disabled", true);
        });

    } else {
        timer -= 5; 
        e.target.classList.add("incorrect");
        timerValue.innerText = timer > 0 ? timer : 0;
        isCorrect = false; 
    }
    
    
}



nextBtn.addEventListener("click", setNextQuestion);

function setNextQuestion() {
    if (index + 1 === questions.length) {
        createEndScreen();
    
    } else if (isCorrect) {
        questionCont.innerHTML = '';
        index++;
        createAnswers(index);
        isCorrect = false;
    }
}

function createEndScreen() {
    questionCont.innerHTML = '';
    nextBtn.classList.add("hide");
    progressCont.classList.add("hide");

    let endScreen = document.createElement("div");
    let finalMessage = document.createElement("h2");
    let finalScore = document.createElement("span");
    let hiscoreLabel = document.createElement("label");
    let hiscoreInput = document.createElement("input");
    let submit = document.createElement("input");

    endScreen.setAttribute("class", "end-screen");
    hiscoreLabel.setAttribute("for", "hiscore");
    hiscoreInput.setAttribute("type", "text");
    hiscoreInput.setAttribute("id", "hiscore");
    hiscoreInput.setAttribute("name", "hiscore");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "submit");


    finalMessage.innerText = "Thanks for playing! Hopefully it wasn't too hard ;)";
    finalScore.innerHTML = `Your final score is: <strong>${score}</strong>`;
    hiscoreLabel.innerText = "Enter your initials here to submit your score.";

    questionCont.append(endScreen);
    endScreen.append(finalMessage);
    endScreen.append(finalScore);
    endScreen.append(hiscoreLabel);
    endScreen.append(hiscoreInput);
    endScreen.append(submit);

    submit.addEventListener("click", setHiscore);

}

function setHiscore() {

    let currentHiscore = {
        name: hiscoreInput.value.trim(),
        hiscore: score
    };

    localStorage.setItem("highscore", JSON.stringify(currentHiscore));
    let leaderBoard = JSON.parse(localStorage.getItem("currentHiscore"));

    
    document.getElementById("hiscore").innerHTML = `<h3>${leaderBoard.name}</h3><span>${leaderBoard.highscore}</span>`;
    
}





const questions = [
    {
        question: "What does the 'h' stand for in HTML?",
        answers: [
            "Hyper",
            "Hearty",
            "Herman's",
            "Head"
        ],
        correctAnswer: 0
    
    },
    {
        question: "What is the first indexed value of an array in JavaScript?",
        answers: [
            "1",
            "-1",
            "0",
            "3 fitty"
        ],
        correctAnswer: 2

    },
    {
        question: "What type of language is CSS?",
        answers: [
            "Programming language",
            "Style Sheet language",
            "Markup language",
            "French"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of the following is not a valid 'type' when creating an event listener?",
        answers: [
            "Click",
            "Mouse Up",
            "Key Down",
            "Clack"
        ],
        correctAnswer: 3
    
    },
    {
        question: "What port does a browser assume when you use an https link?",
        answers: [
            "1",
            "80",
            "443",
            "5000"
        ],
        correctAnswer: 2

    },
    {
        question: "Who is the inventor of Git?",
        answers: [
            "Lief Tortelini",
            "Linus Torvalds",
            "Tinus Lorvalds",
            "Besteman Besteman Besteman"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of the following is not an HTML element?",
        answers: [
            "<heading>",
            "<legend>",
            "<tr>",
            "<sup>"
        ],
        correctAnswer: 0
    
    },
    {
        question: "What are the values called that you use inside of a JavaScript function()?",
        answers: [
            "Variables",
            "Values",
            "Arguments",
            "Squabbles"
        ],
        correctAnswer: 2

    },
    {
        question: "Which of the following features can not be found in Chrome's inspect feature?",
        answers: [
            "Elements",
            "Free Parking",
            "Console",
            "Sources"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the most bang for your buck?",
        answers: [
            "Musk's NeuroLink",
            "1654 years for a PHD",
            "CS Degree",
            "Coding Bootcamp"
        ],
        correctAnswer: 3
    
    },
    {
        question: "Who said 'Never trust a computer you can't throw out a window'?",
        answers: [
            "Steve Irwin",
            "Steve Jobs",
            "Steve Wozniak",
            "Steve O"
        ],
        correctAnswer: 2

    },
    {
        question: "How sick was this quiz????",
        answers: [
            "Ehh",
            "Sooooo sick bro",
            "Not Sick",
            "Get this right of prepare 4 hax"
        ],
        correctAnswer: 1
    }
]
