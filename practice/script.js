// defining my paths by getting ID's
const questionCont = document.getElementById("questionContainer");
const startBtn = document.getElementById("startButton");
const nextBtn = document.getElementById("nextButton");
const scoreValue = document.getElementById("score");
const timerValue = document.getElementById("timer");
const intro = document.getElementById("greeting");
const progressCont = document.getElementById("quizProgress");
const hiscoreCont = document.getElementById("hiscore");


// setting up variables that will be tracked and used later on
let index = 0;
let score = 0;
let timer = 75;
let isCorrect = false;
let interval;


// click event for my start button.
startBtn.addEventListener("click", startGame);


// start game function. shows and hides elements that I want for when the game begins.
// starts my interval by setting it equal to my timer function.
function startGame() {
    intro.classList.add("hide");
    startBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
    progressCont.classList.remove("hide");
    createAnswers();
    interval = window.setInterval(timerFunk, 1000) 
}


// sets timer to decriment by 1 every 1000ms (above).
// when displaying timer, set it to timer value if greater than 0, if it isnt, set timer to 0.
// (functionality: stops timer from displaying negative values.)
// if timer is less than or equal to 0, run highscore screen. stop timer from ticking in background.
function timerFunk() {
    timer--;
    timerValue.innerText = timer > 0 ? timer : 0;
    if (timer <= 0) {
        createEndScreen();
        clearInterval(interval);
    }
}


// function to build question and answers. creates container divs and gives them appropriate classes.
// sets my question to the question at index value (0 here) of my questions objecdt.
// append containers, then run a for loop to itterate and create my answer buttons in a similar fashion.
// created a click handeler for my answer grid continer.
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

        // sets name of element equal to its i value when created. will be important when checking if correct.
        answerBtn.setAttribute("name", i);
        answerBtn.setAttribute("class", "btn");
        answerBtn.classList.add("hover-effect");
        answerGrid.append(answerBtn);
        answerBtn.addEventListener("click", handleClick);
    }
    
}


// function to handle how clicking answers work.
// checks to see if clicked button's name corrosponds with its correct value in the questions object.
function handleClick (e) {
    

    // if target button's name is euqal to value of correct answer in it's question array, run "correct" script.
    // (add class to button to display green, change isCorrect value, add 100 to score, disable selection of other answers.)
    // if target it not equal, lose 5 time, set button to display red.
    // (similar time function to ensure timer subtraction updates realtime).
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
    }
    
    
}


// click event for next button. used to cycle through question slides.
nextBtn.addEventListener("click", setNextQuestion);


// if index is about to enter position in questions that does not exist, run end screen function.
// if not and isCorrect is true, clear the question container, incriment index, load create answers function using index value as argument.
// reset isCorrect for next question.
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


// function to display screen when game is over. clears question container. hides some elements.
// create needed elements. assigns all values. display final messages. create input field for player. append all elements.
// add click event for hiscore submission.
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
    hiscoreInput.setAttribute("id", "hiscoreName");
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


// 
function setHiscore() {

    const highScore = JSON.parse(localStorage.getItem("currentHiscore"));
    if (!highScore || score >= Number.parseInt(highScore.score)) {
        let currentHiscore = {
            name: document.getElementById("hiscoreName").value,
            score: score
        };

        localStorage.setItem("currentHiscore", JSON.stringify(currentHiscore));
    }
    location.reload();
}


if (localStorage.getItem("currentHiscore")) {
    hiscoreCont.setAttribute("class", "you-did-it");
    let showName = JSON.parse(localStorage.getItem("currentHiscore")).name;
    let showScore = JSON.parse(localStorage.getItem("currentHiscore")).score;
    document.getElementById("hiscore").innerHTML = `<span>Current Hiscore:</span><h2>${showName}</h2><span>score: ${showScore}</span>`;
}


// Qustions object where my quiz will pull all questions, asnwers, and correct answer values.
// correctAnswer is set = to the right answers position in the answers array. the name of the buttons element created above helps us target the correct answer,
// becuase the buttons will populate in linear way, it lines up value wise with this array.
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
        // you better get this one correct 🔫
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
