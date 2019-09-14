
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
        userIndex = ($("button[name=" + currentQuestion + "]:checked").val());
        userAnswers[i] = (currentQuestion + ": " + questions[i].answers[userIndex]);
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

    // for (i in questions) {



    //     var currentQuestion = questions[i].question;
    //     var currentAnswers = questions[i].answers;
    //     var currentQuestionNumber = (parseInt(i) + parseInt(1))

    //     $(".questions").append("<strong>" + currentQuestionNumber + ": " + currentQuestion + "</strong><br> <br>");

    //     for (letter in currentAnswers) {
    //         $(".answers").append('<button id="q" class="btn btn-lg btn-warning" type="radio" name=' + currentQuestionNumber + ' value=' + letter + '> ' + currentAnswers[letter] + "</button>");
    //         $(".answers").append("<br> <br>");
    //     };
    //     console.log(currentQuestion);
    //     console.log(currentAnswers);

    // };

    // $(".sub").html('<button id="sub" class="btn btn-lg btn-warning"> Submit </button>');

    // $("#sub").on("click", function() {
    //     stop()
    //     results();
    // });