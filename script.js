const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tabular Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheet",
      "Cascading Style Sheet",
      "Creative Style Setup",
    ],
    correctAnswer: "Cascading Style Sheet",
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "style", "font"],
    correctAnswer: "style",
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size"],
    correctAnswer: "font-size",
  },
  {
    question: "Inside which HTML element do we put the JavaScript code?",
    options: ["<javascript>", "<script>", "<js>"],
    correctAnswer: "<script>",
  },
  {
    question: "What does JS stand for?",
    options: ["JavaScript", "Java Structure", "Just Style"],
    correctAnswer: "JavaScript",
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "//", "**"],
    correctAnswer: "//",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onchange", "onmouseclick", "onclick"],
    correctAnswer: "onclick",
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: ["v myVar;", "variable myVar;", "let myVar;"],
    correctAnswer: "let myVar;",
  },
  {
    question: "Which function is used to print something in the console?",
    options: ["console.print()", "log.console()", "console.log()"],
    correctAnswer: "console.log()",
  },
];

$(document).ready(function () {
  let currQue = 0;
  let userAns = new Array(questions.length).fill(null);

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function showQues(index) {
    const que = questions[index];
    $("#questionText").html(escapeHTML(que.question));

    const optsHTML = que.options
      .map((opt, i) => {
        const safeId = `opt${index}-${i}`;
        return `
        <div class="option">
          <input type="radio" name="option" id="${safeId}" value="${escapeHTML(
          opt
        )}" ${userAns[index] === opt ? "checked" : ""}>
          <label for="${safeId}">${escapeHTML(opt)}</label>
        </div>
      `;
      })
      .join("");

    $("#optionsContainer").html(optsHTML);

    $("input[name='option']").on("change", function () {
      userAns[index] = $(this).val();
    });

    $("#resultsContainer").hide();
    $("#questionContainer").show();
    $("#quizBox").show();
    $("#restartBtn").hide();
    $("#prevBtn").toggle(index !== 0);
    $("#nextBtn").text(index === questions.length - 1 ? "Submit" : "Next");
  }

  function showResults() {
    let correct = 0;
    let resultHTML = `<h2>Your Score</h2><ul>`;

    questions.forEach((q, i) => {
      const usersAns = userAns[i];
      const isCorrect = usersAns === q.correctAnswer;
      if (isCorrect) correct++;

      resultHTML += `
        <li>
          <strong>Q${i + 1}:</strong> ${escapeHTML(q.question)} <br>
          <span>Your Answer: ${
            usersAns ? escapeHTML(usersAns) : "Not Answered"
          }</span><br>
          <span class="${isCorrect ? "correct" : "incorrect"}">
            ${
              isCorrect
                ? "Correct"
                : `Correct Answer: ${escapeHTML(q.correctAnswer)}`
            }
          </span>
        </li>
      `;
    });

    resultHTML += `</ul><h3>Total Score: ${correct} / ${questions.length}</h3>`;
    resultHTML += `<button id="restartBtn">Restart the Quiz</button>`;

    $("#questionContainer").hide();
    $("#quizBox").hide();
    $("#resultsContainer").html(resultHTML).show();
  }

  // Start button
  $("#startBtn").click(function () {
    $(".container").hide();
    showQues(currQue);
  });

  // Next/Submit button
  $("#nextBtn").click(function () {
    if (currQue < questions.length - 1) {
      currQue++;
      showQues(currQue);
    } else {
      showResults();
    }
  });

  // Previous button
  $("#prevBtn").click(function () {
    if (currQue > 0) {
      currQue--;
      showQues(currQue);
    }
  });

  // Restart button (delegated)
  $("#resultsContainer").on("click", "#restartBtn", function () {
    currQue = 0;
    userAns.fill(null);
    $(".container").show();
    $("#resultsContainer").hide();
    $("#quizBox").hide();
  });
});
