const questionCont = document.getElementById("questionContainer");
const question = document.getElementById("questionText");
const startButton = document.getElementById("start");
const answCont = document.getElementById("answerButtons");
const startBtn = document.getElementById("startButton");
const nextBtn = document.getElementById("nextButton");
const scoreValue = document.getElementById("score");
const timerValue = document.getElementById("timer");
const intro = document.getElementById("greeting");
const progressCont = document.getElementById("quizProgress")

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
    let leaderBoard = Json.parse(localStorage.getItem("currentHiscore"));

    
    document.getElementById("hiscore").innerHTML = `<h3>${leaderBoard.name}</h3><span>${leaderBoard.highscore}</span>`;
    
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
