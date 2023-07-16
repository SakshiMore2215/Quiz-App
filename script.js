const questions = [
    {
        question: "What is the full form of HTML?",
        answers: [
            { text: "Hello Text Markup Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Hyper Text Marking Language", correct: false},
            { text: "Hello Type Markup Language", correct: false},
        ]
    },
    {
        question: "What is the full form of JS?",
        answers: [
            { text: "Javaset", correct: false},
            { text: "Java", correct: false},
            { text: "Javascipt", correct: true},
            { text: "Jquery", correct: false},
        ]
    },
    {
        question: "Which of the following is object oriented programming language?",
        answers: [
            { text: "Java", correct: false},
            { text: "Python", correct: false},
            { text: "Javascipt", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "Which of the following is procedural oriented programming language?",
        answers: [
            { text: "Python", correct: false},
            { text: "Java", correct: false},
            { text: "C programming", correct: true},
            { text: "C++", correct: false},
        ]
    },
    {
        question: "Which of the following is open source language?",
        answers: [
            { text: "C#", correct: false},
            { text: "Java", correct: false},
            { text: "C++", correct: false},
            { text: "All of the above", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();