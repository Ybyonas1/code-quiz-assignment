var startQuiz = document.querySelector('#start');
var quiz = document.querySelector('#quiz');
var scoreBoard = document.querySelector('#score');
var startButton = document.querySelector('#startButton');
var quizH2 = document.querySelector('#quiz h2');
var questCont = document.querySelector('#qContainer');
var scoreEntry = document.querySelector('#scoreEntry');

var tabelEl = document.querySelector("#table");

var initialsEl = document.querySelector('#initials');
var submit = document.querySelector('#submit');
var highSList = document.querySelector('#highslist');
var HSCount = document.querySelector('#HSCount');

var initialsKey = JSON.parse(localStorage.getItem('initials')) || [];



var list = [];
var index = 0;
var seconds = 60;
var timer;
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
};

function playQuiz() {
    nextQuest();
    displayElements('QUIZ');
    beginTimer();
};

function enterScore() {
    displayElements('SCORE')
};

// var questObject = myQuestions[index]

function beginTimer() {
    // console.log('timer suppose to go off')
    timer = setInterval(function () {
        seconds--;
        document.getElementById('timerDisplay').innerHTML = '00:' + seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            alert("Time is up Buba");
            displayElements('SCORE')
        };

    }, 1000);
};

function nextQuest() {
    var questObject = myQuestions[index];
    questCont.innerHTML = "";
    var quizQuest = document.createElement('h2');
    quizQuest.textContent = questObject.question
    questCont.appendChild(quizQuest);
    for (var i = 0; i < questObject.answers.length; i++) {
        var answerbtn = document.createElement('button');
        answerbtn.textContent = questObject.answers[i];
        answerbtn.addEventListener("click", checksScore);
        questCont.appendChild(answerbtn);
    }
};

if (scoreEntry) {
    scoreEntry.addEventListener('submit', function (event) {
        event.preventDefault();
        // console.log("here")
        var savedIni = {
            initials: initialsEl.value.trim()
        }
        
        // console.log(savedIni);
        initialsKey.push(savedIni);
        localStorage.setItem("Initials", JSON.stringify(initialsKey));
    }
    )
};

if (tabelEl) {
    for (var savedIni of initialsKey) {
        console.log(savedIni);
    }
};


function checksScore(event) {
    // event.preventDefault();
    // console.log(event);
    var selAnswer = event.target.textContent;
    var questObject = myQuestions[index];
    var corAnswer = questObject.correct;
    // console.log(selAnswer === corAnswer);
    if (selAnswer !== corAnswer) {
        seconds -= 5;        // Run code to reduce time
    }
    if (index === 3) {
        // end quiz
        clearInterval(timer)
        displayElements('SCORE');
        return;
    } else {
        index++;
        nextQuest();
    }
};

startButton.addEventListener("click", playQuiz);
quizH2.addEventListener("click", enterScore);


init();