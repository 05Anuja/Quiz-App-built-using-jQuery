const questions = [
  {
    question: "What will be the output of: typeof NaN in JavaScript?",
    options: ["'number'", "'NaN'", "'undefined'"],
    correctAnswer: "'number'",
  },
  {
    question: "Which CSS rule has the highest specificity?",
    options: [
      "Element selector",
      "Class selector",
      "ID selector"
    ],
    correctAnswer: "ID selector",
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.objectify()"],
    correctAnswer: "JSON.parse()",
  },
  {
    question: "In JavaScript, which keyword is used to prevent further modification of an object?",
    options: ["freeze()", "seal()", "lock()"],
    correctAnswer: "freeze()",
  },
  {
    question: "What is the z-index in CSS used for?",
    options: [
      "To change text size",
      "To control stacking order of elements",
      "To align elements horizontally"
    ],
    correctAnswer: "To control stacking order of elements",
  },
  {
    question: "Which statement is true about JavaScript hoisting?",
    options: [
      "Only functions are hoisted",
      "Variables and functions are hoisted",
      "Variables declared with let are hoisted"
    ],
    correctAnswer: "Variables and functions are hoisted",
  },
  {
    question: "Which of the following is a feature of `localStorage` in web browsers?",
    options: [
      "Stores data until the session ends",
      "Stores data permanently until explicitly cleared",
      "Stores only string data temporarily"
    ],
    correctAnswer: "Stores data permanently until explicitly cleared",
  },
  {
    question: "What does the CSS 'box-sizing: border-box' do?",
    options: [
      "Adds padding and border to the total width/height",
      "Excludes padding from element's size",
      "Makes content overflow hidden"
    ],
    correctAnswer: "Adds padding and border to the total width/height",
  },
  {
    question: "Which function is used to delay execution in JavaScript?",
    options: ["setTimeout()", "delay()", "pause()"],
    correctAnswer: "setTimeout()",
  },
  {
    question: "In the DOM, what does 'event bubbling' mean?",
    options: [
      "Event moves from target to root",
      "Event moves from root to target",
      "Event only triggers on parent"
    ],
    correctAnswer: "Event moves from target to root",
  }
];

$(document).ready(function () {
  let currQue = 0;
  let userAns = new Array(questions.length).fill(null);
  let seconds = 0, minutes = 0, timerId = null;

  $("#timer").text(`00 : 00`);

  function startTimer () {
    seconds ++;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
    }
    $("#timer").text(getFormatedTimer());
  }

  function getFormatedTimer () {
    let secondsString = seconds < 10 ? `0${seconds}` : seconds;
    let minutesString = minutes < 10 ? `0${minutes}` : minutes;
    return `${minutesString} : ${secondsString}`
  }

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

    const percentage = (correct / questions.length) * 100;
    let remark = "";

    if (percentage === 100) {
      remark = "🌟 Perfect!";
    } else if (percentage >= 80) {
      remark = "🎉 Excellent!";
    } else if (percentage >= 60) {
      remark = "👍 Good job!";
    } else if (percentage >= 40) {
      remark = "🙂 Keep practicing!";
    } else {
      remark = "😟 Needs practice!";
    }

    resultHTML += `</ul><h3>Total Score: ${correct} / ${questions.length}</h3>`;
    resultHTML += `<h3 style="color: #388E3C;">Percentage: ${percentage.toFixed(2)}% ${remark}</h3>`
    // resultHTML += `<h3>Remark: ${remark}</h3>`
    clearInterval(timerId);
    resultHTML += `<h3 style="color: #fd7e14;">Time Taken: ${getFormatedTimer()}</h3>`
    resultHTML += `<button id="restartBtn">Restart the Quiz</button>`;

    $("#questionContainer").hide();
    $("#quizBox").hide();
    $("#resultsContainer").html(resultHTML).show();
  }

  // Start button
  $("#startBtn").click(function () {
    $(".container").hide();
    showQues(currQue);
    if (timerId !== null) {
      clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 1000);
  });

  // Next/Submit button
  $("#nextBtn").click(function () {
    if (currQue < questions.length - 1) {
      currQue++;
      showQues(currQue);
    } else {
      showResults();
      clearInterval(timerId);
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
