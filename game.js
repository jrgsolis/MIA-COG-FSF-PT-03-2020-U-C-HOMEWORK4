const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


var display = document.querySelector('#time');
var seconds;
var timer;

window.onload = function () {
  var deadline = 60;
  startTimer(deadline);
};

function countDownSubstract()
{
  /*
  var remaining = seconds-5;
  clearInterval();
  startTimer(remaining, display);
  */
 timer = seconds-5;
}

function startTimer(duration) {
  
  timer = setInterval(function () {
      //minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      //minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      //display.textContent = minutes + ":" + seconds;
      display.textContent = "00:" + seconds;
      

      if (--timer < 0) {
          timer = duration;
          
      }
  }, 1000);
}




let questions = [
  {
    question: "Commonly used data types does not include:",
    choice1: "String",
    choice2: "Booleans",
    choice3: "Alerts",
    choice4: "Numbers",
    answer: 3
  },
  {
    question: "The condition in IF ELSE statment is enclosed within___??",
    choice1: "quotes",
    choice2: "curly braces",
    choice3: "parenthesis",
    choice4: "square brackets",
    answer: 3
  },
  {
    question: "Arrays in java script are used to store?",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "booleans",
    choice4: "all others",
    answer: 4
  },
  {
    question: "A very useful tool for debugging and printing content to the debugger is:",
    choice1: "javascript",
    choice2: "terminal bash",
    choice3: "for loops",
    choice4: "console.log();",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 25;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    else{
      countDownSubstract();
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
