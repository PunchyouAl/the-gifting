$(document).ready(function() {

    // Questions

    var q1 = new Question("What does the 'C' in CR Worldwide stand for?", ['Cheese', 'Chalk', 'Corporate'], 2);
    var q2 = new Question("What town is CR Worldwide based in?", ['London', 'Stratford', 'Paris'], 1);
    var q3 = new Question("What is CR's main brand colour?", ['Pink', 'Gray', 'Green'], 2);
    var q4 = new Question("Halloween is in which month?", ['September', 'October', 'November'], 1);
    var q5 = new Question("Who wrote The Shining?", ['Stephen King', 'Charles Dickens', 'Mark Twain'], 0);

    // UI variables
    var stage = document.querySelector(".stage");
    var character = document.querySelector("#character");
    var buttonHolder = document.querySelector(".buttonHolder");
    var buttons = buttonHolder.querySelectorAll(".button");
    var questionArea = document.querySelector("#questionArea");
    var question = document.querySelector("#question");
    var levelIndicator = document.querySelector("#level");
    var tracker = document.querySelector("#tracker");

    // Backgrounds

    // var mcArr = ["url('/s14/W2siZiIsIjIwMTkvMDgvMjIvMTcvMzMvNDIvNmUxYjJhY2MtNTFjNS00NmRkLWFlOGUtM2I5YzQ4MTVmZmRjL2JveS5naWYiXV0?sha=a0f9e07071f06d1e')"];
    var bgArr = ['./img/start-screen-no-title.jpg', './img/background-bar.jpg', './img/corridor.png', './img/Bathroom.jpg', './img/Bedroom.png', './img/SUCCESS.jpg'];

//    var currentMc = mcArr[0];
    var currentBg = bgArr[0];

    var currentBackgroundURL = `url(${currentBg})`;

    var runningCurrentQuestion = 0;

    var pointerRotation = -80;
    var doorsClosed = false;

    //constructors

    function Question(text, answers, correctAnswer) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.displayQuestion = function() {
        question.textContent = this.text;
        for (var i = 0; i < this.answers.length; i++) {
            buttons[i].textContent = this.answers[i];
        }
    };

    Question.prototype.checkAnswer = function(ans, callback) {

        if (ans === this.correct) {
            console.log('Correct answer!');
        } else {
            console.log('Wrong answer. Try again :)');
        }

    }

    



    var questions = [q1, q2, q3, q4, q5];
    var trackerCharOffset = 0;
    var trackerCharOffsetIncrement = 100 / questions.length;

    //functions

    function init() {
        hideUI();
        firstBackground();
        resetCharacter();
        resetPointer();
        addStartButton();
    };

    function startQuiz() {
        document.querySelector("#startContainer").remove();
        showUI();
        firstQuestion();

    };

    function addStartButton() {

        var startContainer = document.createElement('div');
        startContainer.setAttribute("id", "startContainer");
        startContainer.innerHTML = '<img class="title" src="./img/UI_title.svg"><div id="startText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis quam quis purus egestas, eu aliquet ante laoreet. Phasellus non sem sit amet elit fringilla semper. Duis vestibulum convallis neque quis ullamcorper. Sed mollis velit in magna consectetur,</div><div id="startButton">Begin</div>';
        stage.appendChild(startContainer);

        document.addEventListener('click', function(e) {
            if (e.target && e.target.id == 'startButton') {

                startQuiz();
            }
        });

    }

    function gameOver() {

        console.log('GAME OVER RUN');

        //hide question

        questionArea.style.display = 'none';

        //close doors

        toggleDoors();

        //fade to black



        //show game over text

        var gameOverText = document.createElement('div');
        gameOverText.setAttribute("id", "gameOverText");
        gameOverText.innerHTML = '<img class="gameOverHeader" src="./img/UI_gameOver.svg"><div id="gameOverBody">You had your chance to escape, and you blew it. Now you will dwell in the corridors of the hotel for the rest of eternity</div><div id="restartButton">Go Again</div>';
        stage.appendChild(gameOverText);

        //add restart button

        document.addEventListener('click', function(e) {
            if (e.target && e.target.id == 'restartButton') {
                document.querySelector("#gameOverText").remove();
                toggleDoors();
                init();
            }
        });
    }

    function firstBackground() {
        currentBg = bgArr[0];
        currentBackgroundURL = `url(${currentBg})`
        stage.style.backgroundImage = currentBackgroundURL;

        anime({
            targets: '.line-drawing-demo .lines path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: function(el, i) { return i * 250 },
            direction: 'alternate',
            loop: true
        });

    }

    function firstQuestion() {

        anime({
            targets: tracker,
            translateY: '-100%',
        });

        runningCurrentQuestion = 0;
        questions[runningCurrentQuestion].displayQuestion();

    }

    function nextQuestion() {

        runningCurrentQuestion += 1;

        console.log(`Running current question is ${runningCurrentQuestion}`);
        console.log(`Questions array length is ${questions.length}`);

        if (runningCurrentQuestion < questions.length) {

            setTimeout(function() { questions[runningCurrentQuestion].displayQuestion(); }, 3000);

        } else {

            quizSuccess();

        }
    }

    function nextBackground() {

        index = bgArr.indexOf(currentBg);

        if (index >= 0 && index < bgArr.length - 1) {
            currentBg = bgArr[index + 1]
        } else if (index = bgArr.length) {
            currentBg = bgArr[0]
        }

        currentBackgroundURL = `url(${currentBg})`;

        animateDoors();

        setTimeout(function() { stage.style.backgroundImage = currentBackgroundURL; }, 3000);

    }

    function resetCharacter() {

        trackerCharOffset = 0;
        document.querySelector("#character").style.left = trackerCharOffset + "%";

    }

    function moveCharacter() {

        trackerCharOffset += trackerCharOffsetIncrement;
        document.querySelector("#character").style.left = trackerCharOffset + "%";

    }

    // function movePointer() {

    //     pointerRotation += 40;
    //     document.querySelector("#pointer").style.transform = `rotate(${pointerRotation}deg)`;

    // }

    // function pointerVisibility() {

    //     if (runningCurrentQuestion == 0) {
    //         levelIndicator.style.opacity = 0;
    //     } else {
    //         levelIndicator.style.opacity = 1;
    //     }

    // };

    function resetPointer() {

        pointerRotation = -80;
        document.querySelector("#pointer").style.transform = `rotate(${pointerRotation}deg)`;

    }

    function darkness() {

        var darkness = document.createElement('div');
        darkness.setAttribute("id", "darkness");
        stage.appendChild(darkness);

    }


    function toggleDoors() {

        var leftWidth = document.getElementById('doorL').offsetWidth;
        var rightWidth = "-" + document.getElementById('doorR').offsetWidth;

        if (doorsClosed == true) {

            doorsClosed = false;

            var tl = anime.timeline({ easing: "easeOutExpo" });

            tl.add({ targets: "#doors #screenL", translateX: '-' + leftWidth }, 0)
                .add({ targets: "#doors #screenR", translateX: leftWidth }, 0)
                .add({ targets: "#doors #doorL", translateX: '-' + leftWidth }, 100)
                .add({ targets: "#doors #doorR", translateX: leftWidth }, 100);

        } else {

            doorsClosed = true;

            var tl = anime.timeline({ easing: "easeOutExpo" });

            tl.add({ targets: "#doors #doorL", translateX: leftWidth }, 0)
                .add({ targets: "#doors #doorR", translateX: "-" + leftWidth }, 0)
                .add({ targets: "#doors #screenL", translateX: leftWidth }, 100)
                .add({ targets: "#doors #screenR", translateX: "-" + leftWidth }, 100);


        }

        console.log('doors closed is now ' + doorsClosed);

    }

    function animateDoors() {

        var leftWidth = document.getElementById('doorL').offsetWidth;
        var rightWidth = "-" + document.getElementById('doorR').offsetWidth;

        pointerRotation += 40;

        var tl = anime.timeline({ easing: "easeOutExpo" });

        tl.add({ targets: "#doors #screenL", translateX: leftWidth }, 0)
            .add({ targets: "#doors #screenR", translateX: '-' + leftWidth }, 0)
            .add({ targets: "#doors #doorL", translateX: leftWidth }, 100)
            .add({ targets: "#doors #doorR", translateX: '-' + leftWidth }, 100)
            .add({ targets: "#pointer", rotate: pointerRotation }, 1600)
            .add({ targets: "#doors #doorL", translateX: "-" + leftWidth }, 4100)
            .add({ targets: "#doors #doorR", translateX: leftWidth }, 4100)
            .add({ targets: "#doors #screenL", translateX: "-" + leftWidth }, 4200)
            .add({ targets: "#doors #screenR", translateX: leftWidth }, 4200);

    };

    function hideUI() {

        buttonHolder.style.display = 'none';
        questionArea.style.display = 'none';

    }

    function showUI() {

        buttonHolder.style.display = 'flex';
        questionArea.style.display = 'flex';

    }

    function quizSuccess() {

        hideUI();

        setTimeout(function() {
            var successText = document.createElement('div');
            successText.setAttribute("id", "successText");
            successText.innerHTML = '<img class="successHeader" src="/s3/W1siZiIsIjIwMTkvMDkvMTgvMTcvNDAvNTgvZDFmMzRhZTUtNzBmYS00NjUxLWJhNzAtYjkzYWM2NjhmZWNiL3N1Y2Nlc3MtMDguc3ZnIl1d?sha=a13ea2853732daa9"><div id="successBody">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis quam quis purus egestas, eu aliquet ante laoreet. Phasellus non sem sit amet elit fringilla semper. Duis vestibulum convallis neque quis ullamcorper. Sed mollis velit in magna consectetur,</div><div id="restartButton">Go Again</div>';
            stage.appendChild(successText);
        }, 2000);



        //add restart button

        document.addEventListener('click', function(e) {
            if (e.target && e.target.id == 'restartButton') {
                document.querySelector("#successText").remove();
                init();
            }
        });
    }

    // Event listeners

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            var clicked = e.target;
            var answer = $(buttons).index(clicked);
            var correct = questions[runningCurrentQuestion].correctAnswer;
            console.log(answer, correct);
            if (answer == correct) {
                console.log('correct');
                nextQuestion();
                // movePointer();
                nextBackground();
                moveCharacter();
                // pointerVisibility();
                //animateDoors();
            } else {
                console.log('wrong');
                gameOver();
                //init();
            }

        });
    });



    init();

});