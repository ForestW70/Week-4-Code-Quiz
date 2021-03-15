const quizCont = document.getElementById("container");
const question = document.getElementById("questionText");
const startButton = document.getElementById("start");
const answCont = document.getElementById("answers");
const title = document.getElementById("title");


const btn = document.createElement("button");

const questions = [
    {
        question1: "who was the best president?",
        answers: {
            a: "James buchanan",
            b: "George Bush",
            c: "the other Geroge Bush",
            d: "monicaaaaaaa"
    },
    correctAnswer: "a"
}




startButton.addEventListener("click", function(event) {
    event.preventDefault();
    title.remove();
    question.innerHTML = questions.question1;
    startButton.innerHTML = "submit";
    createQuiz();

})



let createQuiz = function() {
    for (let i = 0; i < 5; i++) {
        answCont.append(btn);
        btn.innerText = questions.answers[i.valueOf];
        return;
    }
}