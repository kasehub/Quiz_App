const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer:[
            {text:"Shark", correct:false},
            {text:"Blue Whale", correct:true},
            {text:"Elephant", correct:false},
            {text:"Giraffe", correct:false}
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer:[
            {text:"Earth", correct:false},
            {text:"Mars", correct:true},
            {text:"Jupiter", correct:false},
            {text:"Venus", correct:false}
        ]
    },
    {
        question: "Who invented the light bulb?",
        answer:[
            {text:"Thomas Edison", correct:true},
            {text:"Albert Einstein", correct:false},
            {text:"Alexander Graham Bell", correct:false},
            {text:"Nikola Tesla", correct:false}
        ]
    },
    {
        question: "What is the capital city of France?",
        answer:[
            {text:"London", correct:false},
            {text:"Paris", correct:true},
            {text:"Berlin", correct:false},
            {text:"Madrid", correct:false}
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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
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
    answerButtons.innerHTML = "";
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
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

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
});

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
