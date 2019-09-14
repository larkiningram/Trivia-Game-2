
function start() {
    $(".countdown").html("<button class='start btn-lg btn-warning'> <h2>Start </h2> </button>");

    $(".start").on("click", function () {
        tableRow(questions)
    });
};

start();


const questions = [
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

//// determine score
var correctAnswers = [];
var userAnswers = Array(questions.length);
var score = 0;

function answerKey() {
    for (i in questions) {
        var right = questions[i].solution;
        currentQuestion = (parseInt(i) + parseInt(1))
        correctAnswers.push(currentQuestion + ": " + questions[i].answers[right]);
    };

    return correctAnswers;
};


function userKey() {
    for (i in questions) {   
        currentQuestion = (parseInt(i) + parseInt(1))
        userIndex = ($("input[name=" + currentQuestion + "]:checked").val());
        userAnswers[i] =(currentQuestion + ": " + questions[i].answers[userIndex]);
    }

    return userAnswers;
};

function userScore() {
    for (i in userAnswers) {
        currentQuestion = (parseInt(i) + parseInt(1))
        if (userAnswers[i] === correctAnswers[i]) {
            score++;
        }
        else if (userAnswers[i] === (currentQuestion + ": undefined")) {
            userAnswers[i] = "You forgot this one!";
        }
    }
    return score;
};


function results() {
    answerKey();
    userKey();
    userScore();
    $("#sub").hide();
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
    $(".correct").html("<strong>Correct Answers </strong> <br></br>");
    $(".user").html("<Strong> User Answers</strong> <br></br>");
    for (i in correctAnswers) {
        $(".user").append(userAnswers[i] + "<br></br>");
        $(".correct").append(correctAnswers[i] + "<br></br>");

    };
};

//// displaying questions and answers

function tableRow() {
    timeRemaining();
    for (i in questions) {
        var currentQuestion = questions[i].question;
        var currentAnswers = questions[i].answers;
        var currentQuestionNumber = (parseInt(i) + parseInt(1))

        $(".questions").append("<strong>" + currentQuestionNumber + ": " + currentQuestion + "</strong><br> <br>");

        for (letter in currentAnswers) {
            $(".answers").append('<input id="q" type="radio" name=' + currentQuestionNumber + ' value=' + letter + '> \t' + currentAnswers[letter] + "\t");
            if (letter === "3") {
                $(".answers").append("<br> <br>");
            }
        };
        console.log(currentQuestion);
        console.log(currentAnswers);
    };

    $(".sub").html('<button id="sub" class="btn btn-lg btn-warning"> Submit </button>');

    $("#sub").on("click", function() {
        stop()
        results();
    });
};


/// timing functions 

var time = 60;
var inter;


function timeRemaining() {
    $(".countdown").html("");
    clearInterval(inter);
    inter = setInterval(decrement, 1000);
};

function decrement() {

    time--;
    $(".countdown").html("Time Remaining: " + time);

    if (time === 0) {
        stop();
        results();
    }
};

function stop() {
    clearInterval(inter);
};

