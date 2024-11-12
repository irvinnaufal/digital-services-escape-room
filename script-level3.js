const questions = [
  {
    question: "Where does Data Center Management belong?",
    correctAnswer: "IT Operations",
  },
  {
    question: "Where does Business Application Support belong?",
    correctAnswer: "IT Solutions",
  },
  {
    question: "Where does IT Security Operations belong?",
    correctAnswer: "IT Operations",
  },
  {
    question: "Where does IT Project Management belong?",
    correctAnswer: "IT Solutions",
  },
  {
    question: "Where does IT Asset Management belong?",
    correctAnswer: "IT Operations",
  },
  {
    question: "Where does Software Quality Assurance belong?",
    correctAnswer: "IT Solutions",
  },
];

let currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const messageElement = document.getElementById("message");
const nextQuestionBtn = document.getElementById("next-question-btn");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  option1.textContent = "IT Operations";
  option2.textContent = "IT Solutions";
  messageElement.textContent = "";
  nextQuestionBtn.style.display = "none";
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    messageElement.textContent = "Correct!";
    nextQuestionBtn.style.display = "block";
  } else {
    messageElement.textContent = "Incorrect. Good luck next time.";
    handleIncorrectAnswer();
    nextQuestionBtn.style.display = "none";
  }
}

option1.addEventListener("click", () => checkAnswer("IT Operations"));
option2.addEventListener("click", () => checkAnswer("IT Solutions"));

nextQuestionBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    questionElement.textContent =
      "Congratulations! You have completed the quiz!";
    option1.style.display = "none";
    option2.style.display = "none";
    nextQuestionBtn.style.display = "none";
  }
});

// Load the first question on page load
loadQuestion();
