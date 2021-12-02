var startQuiz = document.querySelector('#start');
var quiz = document.querySelector('#quiz');
var scoreBoard = document.querySelector('#score');
var startButton = document.querySelector('#startButton');
var quizH2 = document.querySelector('#quiz h2');
var questCont = document.querySelector('#qContainer')
var index = 0
var myQuestions = [
    {
        question: "What color is the sky?",
        answers: ["red", "black", "green", "blue"],
        correct: "blue"
    },
    {
        question: "What color is the sun?",
        answers: ["black", "green", "mohagany", "orange"],
        correct: "orange"
    },
    {
        question: "What color are strawberries",
        answers: ["pink", "blue", "red", "green"],
        correct: "red"
    },
    {
        question: "What color are bananas",
        answers: ["red", "blue", "yellow", "green"],
        correct: "yellow"
    },
];


// var STATE = "START"; // START, QUIZ, SCORE

function displayElements(state) {
    if (state === "START") {
        startQuiz.style.display = "flex";
        quiz.style.display = "none";
        scoreBoard.style.display = "none";

    }
    if (state === "QUIZ") {
        startQuiz.style.display = "none";
        quiz.style.display = "flex";
        scoreBoard.style.display = "none";

    }

    if (state === "SCORE") {
        startQuiz.style.display = "none";
        quiz.style.display = "none";
        scoreBoard.style.display = "flex";

    }
}

function init() {
    displayElements('START')
}

function playQuiz() {
    nextQuest();
    displayElements('QUIZ');
    beginTimer();
}

function enterScore() {
    displayElements('SCORE')
}

function beginTimer() {
    var seconds = 60;
    var questObject = myQuestions[index]
    function beginTimer() {
        console.log('timer suppose to go off')
        var timer = setInterval(function () {
            seconds--;
            document.getElementById('timerDisplay').innerHTML = '00:' + seconds;
            if (seconds < 0) {
                // clearInterval(timer);
                alert("Time is up buba!");
            } else if (questObject.answers !== questObject.correct) {
                seconds -= 5;
            } else {

            }
        }, 1000);
    }

    document.getElementById('timerDisplay').innerHTML = '00' + seconds;
    beginTimer();
}

function nextQuest() {
    var questObject = myQuestions[index]
    questCont.innerHTML = "";
    var quizQuest = document.createElement('h2');
    quizQuest.textContent = questObject.question
    questCont.appendChild(quizQuest);
    for (var i = 0; i < questObject.answers.length; i++) {
        var answerbtn = document.createElement('button');
        answerbtn.textContent = questObject.answers[i]
        answerbtn.addEventListener("click", checksScore)
        questCont.appendChild(answerbtn);
    }
}

function checksScore(event) {
    var selAnswer = event.target.textContent;
    var corAnswer = myQuestions[index].correct;
    console.log(selAnswer === corAnswer);
    if (selAnswer !== corAnswer) {
        // Run code to reduce time
    }
    if (index === 3) {
        // end quiz
        displayElements('SCORE');
        return;
    } else {
        index++;
        nextQuest();
    }
}

startButton.addEventListener("click", playQuiz);
quizH2.addEventListener("click", enterScore);


init();