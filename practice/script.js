const questionCont = document.getElementById("questionContainer");
const question = document.getElementById("questionText");
const startButton = document.getElementById("start");
const answCont = document.getElementById("answerButtons");
const startBtn = document.getElementById("startButton");
const nextBtn = document.getElementById("nextButton");

let index = 0;



startBtn.addEventListener("click", startGame);

function startGame() {
    console.log("hello");
    startBtn.classList.add("hide");
    nextBtn.classList.remove("hide");

    let questionEl = document.createElement("div");
    let answerGrid = document.createElement("div");
    
    questionEl.innerHTML = questions[0].question;

    questionCont.append(questionEl);
    questionCont.append(answerGrid);
    
    createAnswers();
}

function createAnswers() {
    for (let i = 0; i < 4; i++) {
        let answerBtn = document.createElement("button")
        answerBtn.innerText = questions[index].answers[i];
        questionCont.append(answerBtn);
        
    }
}

nextBtn.addEventListener("click", setNextQuestion);

function setNextQuestion() {
    
    index++;
    let questionEl = document.createElement("div");
    let answerGrid = document.createElement("div");

    questionEl.innerText = questions[index].question;
    questionCont.append(questionEl);
    questionCont.append(answerGrid);
    createAnswers(index);

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



// const question = questions[pointer];
// buildQuestion(question);

// onClick = {handleClick}
// onClick = {() => handleClick(label)}


// handle = (e) => {
//     if (e.target.name === question[0].correctAnswer)
// }


// <button name="a">answer a</button>

// [1,2,3].forEach((val) =>  console.log(val))
// const t = [1,2,3].map((val) => 1)
// [1,1,1]

// answers.forEach((val, idx) => {
//     const element = document.createElement("Button");
//     element.innerText = val;
//     element.name = idx;
//     element.addEventListener("click", handleclick)
//     //container.append(element)
// })
