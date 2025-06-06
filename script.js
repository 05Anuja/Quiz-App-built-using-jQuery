const questions = [
  {
    question: "What does HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tabular Markup Language",
    ],
  },
  {
    question: "What does CSS stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tabular Markup Language",
    ],
  },
  {
    question: "What does JS stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tabular Markup Language",
    ],
  },
];

$(document).ready(function () {
    let currQue = 0;
    function showQues (index) {
        const que = questions[index];
        $("#questionText").text(que.question);

        const optsHTML = que.options.map((opt) => `
        <div class="option">
            <input type="radio" name="option" id="${opt}">
            <label for="${opt}">${opt}</label>
        </div>
        `).join("");

        $("#optionsContainer").html(optsHTML);
        $("#prevBtn").toggle(index !== 0);        
        $("#nextBtn").text(index === questions.length - 1 ? "Submit" : "Next");
    }

    $("#startBtn").click(function () {        
        $(this).hide();
        $("#description").hide();
        $("#quizBox").show();
        showQues(currQue);
    });

    $("#prevBtn").click(function () { 
        if (currQue > 0) {
            currQue--;
            showQues(currQue);
        }        
    });

    $("#nextBtn").click(function () { 
        if (currQue < questions.length - 1) {
            currQue ++;
            showQues(currQue);
        } else {
            alert("Quiz Submitted!");
        }
    });
});