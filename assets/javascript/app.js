// initial conditions
const questionsArray = [
    {
        question: "What is Harry Potter's owl's name?",
        answers: ["Owl", "Crookshanks", "Hedwig", "Pigwidgeon"],
        solution: 2
    },
    {
        question: "Where does Harry get his first wand?",
        answers: ["Ollivander's", "Flourish and Blotts", "Borgin and Burkes", "Hogwarts"],
        solution: 0
    },
    {
        question: "What position did Hermione play on the Griffindor Quiddich Team",
        answers: ["keeper", "seeker", "chaser", "none stupid"],
        solution: 3
    },
    {
        question: "Which house did Ernie Macmillan belong to?",
        answers: ["Griffindor", "Slytherin", "Hufflepuff", "Ravenclaw"],
        solution: 2
    },
    {
        question: "Which is not a Deathly Hallow",
        answers: ["Elder Wand", "Cloak of Invisibility", "Deluminator", "Resurrection Stone"],
        solution: 2
    },
    {
        question: "How old was Nicholas Flamel when the Socerer's Stone was destroyed?",
        answers: ["294", "763", "655", "17"],
        solution: 2
    },
    {
        question: "Which row in the Hall of Prophecies does Harry find his prophecy?",
        answers: ["96", "97", "196", "197"],
        solution: 1
    }
];
var questions = questionsArray;
const goodImages = [
    "assets/images/results/good/1.gif",
    "assets/images/results/good/2.gif",
    "assets/images/results/good/3.gif",
    "assets/images/results/good/4.gif",
    "assets/images/results/good/5.gif",
    "assets/images/results/good/6.gif",
    "assets/images/results/good/7.gif",
];
const badImages = [
    "assets/images/results/bad/1b.gif",
    "assets/images/results/bad/2b.gif",
    "assets/images/results/bad/3b.gif",
    "assets/images/results/bad/4b.gif",
    "assets/images/results/bad/5b.gif",
    "assets/images/results/bad/6b.gif",
    "assets/images/results/bad/7b.gif",
];
var time = 10;
var correctAnswers = Array(questions.length);
var userAnswers = Array(questions.length, 9);
var qInterval;
var ques = 0;
var score = 0;
var wrong = 0;
var check = false;


start();

////////////////////////////////////////////////////////////////////////////////////////////////

// timing functions
function perQuestion() {
    $(".countdown").html("");
    qInterval = setInterval(decrement, 1000);
};

function decrement() {
    time--;
    $(".countdown").html("Time Remaining: " + time);
    if (time == 0) {
        stop();
        result();
    }
};

function stop() {
    clearInterval(qInterval);
};

////////////////////////////////////////////////////////////////////////////////////////////////

// transitions
function start() {
    $(".countdown").html($("<button class='btn btn-lg btn-warning start'><h2>Start</h2></button>"));

    $(".start").on("click", function () {
        shuffle();
        perQuestion();
        eachQuestion();
    });
};

function moveOn() {
    $(".answer").on("click", function () {
        timeLeft = true;
        var thisButton = (questions[ques].answers.indexOf($(this).text()));
        userAnswers[ques] = (thisButton);
        clearPage();
        result();
        check = false;
        ques = ques + 1;
        return timeLeft;
    });
    return userAnswers;
};

function clearPage() {
    stop();
    $(".countdown").html("");
    $(".questions").html("");
    $(".answers").html("");
};

function restart() {
    $(".cont").html("");
    $(".countdown").html("");
    $(".questions").html("");
    $(".answers").html("");
    questions = questionsArray;
    time = 10;
    correctAnswers = Array(questions.length);
    userAnswers = Array(questions.length, 9);
    qInterval;
    ques = 0;
    score = 0;
    wrong = 0;
    check = false;
    start();
};

////////////////////////////////////////////////////////////////////////////////////////////////

// generating questions

function shuffle() {
    questions.sort(function (a, b) { return 0.5 - Math.random() });
    return questions;
};

function eachQuestion() {
    $(".cont").html("");

    console.log(questions[ques].question);
    console.log(questions[ques].answers[parseInt(questions[ques].solution)]);

    $(".questions").html("<strong>" + questions[ques].question + "</strong>");
    var As = questions[ques].answers
    for (i in questions[ques].answers) {
        $(".answers").append("<button class='btn btn-lg btn-outline-dark answer' name='q" + ques + "'>" + As[i] + "</button> <br></br>");
    };

    moveOn();
};

// function moreQuestions() {
//     clearPage();
//     eachQuestion();
//     time = 10;
//     perQuestion();
// };

////////////////////////////////////////////////////////////////////////////////////////////////

// results

function result() {

    $(".cont").html("<button class='btn btn-lg btn-warning continue'>Continue</button>");

    if (questions[ques].solution === userAnswers[ques]) {
        score++;
        check = true;
    };

    var cor = parseInt(questions[ques].solution);

    var good = goodImages[ques];
    var bad = badImages[ques];

    if (check === true) {
        $(".countdown").html("You got it!");
        $(".answers").html("<img src=" + good + ">");
    }
    else {
        $(".countdown").html("Wrong!");
        $(".questions").html("The right answer was " + questions[ques].answers[cor]);
        $(".answers").html("<img src=" + bad + ">");
        wrong++;
    };

    $(".cont").on("click", function () {
        if (ques < (questions.length)) {
            clearPage();
            eachQuestion();
            time = 10;
            perQuestion();
        }
        else {
            clearPage();
            results();
        };

    });

    // setTimeout(moreQuestions, 3000);
};

function results() {
    var num = parseInt(questions.length);
    if (score === num) {
        $(".countdown").html("Congrats! You got a perfect score!");
    }
    else if ((score / num) > 0.75) {
        $(".countdown").html("You did alright");
    }
    else if ((score / num) > 0.5) {
        $(".countdown").html("I guess you passed");
    }
    else {
        $(".countdown").html("ur a failure");
    }
    $(".questions").html("<h2>Your score: " + score + "/" + num + "</h2> <br></br>");

    $(".answers").html("<h3>You got " + wrong + " question(s) wrong. </h3> <br></br>");


    $(".cont").html("<button class='btn btn-lg btn-warning start'><h2>Start Over?</h2></button>")

    $(".cont").on("click", function () {
        restart();
    });
};