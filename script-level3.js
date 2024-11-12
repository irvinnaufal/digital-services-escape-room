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
  const finishButton = document.getElementById("finish-level3-btn");
  
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
      questionElement.textContent = "Congratulations! You have completed the quiz!";
      option1.style.display = "none";
      option2.style.display = "none";
      nextQuestionBtn.style.display = "none";
      finishButton.style.display = "block"; // Show the Finish Level 3 button
    }
  });
  
  // Prevent skipping to this level without completing Level 2
  document.addEventListener('DOMContentLoaded', function () {
      const level2Complete = localStorage.getItem('level2Complete');
  
      // If Level 2 is not completed, redirect to Level 2
      if (!level2Complete) {
          alert("You must complete Level 2 first!");
          window.location.href = 'level2.html'; // Redirect to Level 2
      }
  
      // Finish button logic to complete the game
      finishButton.addEventListener('click', function () {
          // Mark game as completed (optional)
          alert("Congratulations, you've completed all the levels!");
          
          // Optionally, reset progress or end the game
          localStorage.removeItem('level1Complete');
          localStorage.removeItem('level2Complete');
          window.location.href = 'index.html'; // Redirect back to the start
      });
  });
  
  // Load the first question on page load
  loadQuestion();
  