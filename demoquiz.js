const quizData = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    options: ["script tag", "scripting tag", "js tag", "javascript tag"],
    answer: 'script tag',
  },
  {
    question:'JavaScript is the same as Java?',

    options: [
      'true',
      'false',
    ],
    answer: 'false',
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    options: [
      "the body section",
      "the head section",
      "both the body section and the head section are correct",
    ],
    answer: 'both the body section and the head section are correct',
  },
  {
    question:'Which event occurs when the user clicks on an HTML element?',
    options: [
      'onclick',
      'onchange',
      'onmouseclick',
      'onmouseover',
    ],
    answer: 'onclick',
  },
  {
    question: 'The external JavaScript file must contain the script tag ?',
    options: ["false", "true"],
    answer: 'false',
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    options: [
      'alert("Hello World");',
      'alertBox("Hello World");',
      'msgBox("Hello World");',
      'msg("Hello World");',
    ],
    answer: 'alert("Hello World");',
  },
  {
    question: 'How do you create a function in JavaScript?',
    options: [
      "function=myFunction",
      "function:myFunction",
      "function myFunction()",
    ],
    answer:'function myFunction()',
  },
  {
    question: 'How do you call a function named "myFunction"?',
    options: [
      "myFunction()",
      "call myFunction()",
      "call function myFunction()",
    ],
    answer: 'myFunction()',
  },
  {
    question: 'How do you declare a JavaScript variable?',
    options: ["v car;", "var car;", "variable car;"],
    answer: 'var car;',
  },
  {
    question:'Which operator is used to assign a value to a variable?',
    options: ["=", "*", "-", "+"],
    answer: '=',
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {

  const questionData = quizData[currentQuestion];
  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
if( score === quizData.length ){
  greeting.innerHTML="congratulations!";
  showAnswerButton.style.display = "none";
  retryButton.style.display = "none";
}
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong style="color:red;">Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong style="color:green;">Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
  }

  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p style="color:red;">Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
