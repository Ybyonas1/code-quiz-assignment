var startQuiz = document.querySelector('#start');
var quiz = document.querySelector('#quiz');
var scoreBoard = document.querySelector('#score');
var startButton = document.querySelector('#startButton');
var quizH2 = document.querySelector('#quiz h2');
var questCont = document.querySelector('#qContainer');
var scoreEntry = document.querySelector('#scoreEntry');

var tableEl = document.querySelector("#table");

var initialsEl = document.querySelector('#initials');
var submit = document.querySelector('#submit');
var highSList = document.querySelector('#highslist');
var HSCount = document.querySelector('#HSCount');

// This is pulling the stringified local storage, and converting it into an array structure
// If the value returned from local storage at .getitem is undefined, initalsKey is set to an empty array
var savedScoresArray = JSON.parse(localStorage.getItem('savedscores')) || [];
console.log(savedScoresArray);
console.log(localStorage);


var correctAnswers = 0;

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
        displayHighscores();

    } 
};

scoreEntry.addEventListener('submit', function (event) {
    event.preventDefault();
    // console.log("here")
    var savedIni = {
        initials: initialsEl.value.trim(),
        time: seconds,
        score: correctAnswers
    };
    
    // console.log(savedIni);
    // This is adding the "savedIni" to the end of the savedScoresArray variable
    savedScoresArray.push(savedIni);
    localStorage.setItem("savedscores", JSON.stringify(savedScoresArray));
    displayHighscores();
});

function displayHighscores () {
    tableEl.innerHTML= "";
    console.log(savedScoresArray);
    for (var i = 0; i < savedScoresArray.length; i++) {
        var scoreObject = savedScoresArray[i]
        console.log(scoreObject);
        var row = document.createElement('tr');
        var userInitials = document.createElement('td');
        var userScore = document.createElement('td');
        var userTime = document.createElement('td');
        userInitials.textContent = scoreObject.initials;
        userTime.textContent = scoreObject.time;
        userScore.textContent = scoreObject.score;
        row.appendChild(userInitials);
        row.appendChild(userScore);
        row.appendChild(userTime);
        tableEl.appendChild(row);

    }
};

function init() {
    // WHEN I CHANGE THIS TO 'SCORE' I AM UNABLE TO BEGIN THE QUIZ
    // BUT IT WON'T LOG MY INITIALS ON THE SCREEN
    displayElements('START');
    // displayElements('SCORE')
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

// if (scoreEntry) {
//     scoreEntry.addEventListener('submit', function (event) {
//         event.preventDefault();
//         // console.log("here")
//         var savedIni = {
//             initials: initialsEl.value.trim()
//         }
        
//         // console.log(savedIni);
//         savedScoresArray.push(savedIni);
//         localStorage.setItem("Initials", JSON.stringify(savedScoresArray));
//     }
//     )
// };

// if (tabelEl) {
//     for (var savedIni of savedScoresArray) {
//         console.log(savedIni);
//     }
// };


function checksScore(event) {
    // console.log(event);
    var selAnswer = event.target.textContent;
    var questObject = myQuestions[index];
    var corAnswer = questObject.correct;
    // console.log(selAnswer === corAnswer);
    if (selAnswer !== corAnswer) {
        seconds -= 5;        // Run code to reduce time
    } else {
        correctAnswers++;
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