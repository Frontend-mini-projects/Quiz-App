const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];
var timer = 50;
var currentScore = 0;
var questionNumber = 0;
var timeRemains;
var currentHighScores = [];


document.getElementById("start-quiz").addEventListener("click", function () {
  alert("Read the instruction carefully before starting the quiz!");

  // removing the starter content and replace by questions content
  document.getElementById('starter').style.display = 'none';
  document.getElementById('question-options').style.display = 'block';

  // set timer
  timeRemains = setInterval(() => {
    document.getElementById('remain-time').innerText = timer;
    timer = timer-1;
    if(timer < 0){
      clearInterval(timeRemains);
      alert('Times up!');
      inputInitials();
    }
  }, 1*1000);

  // show question and options data
  showQuestions();
  
});

function showQuestions(){

  if(questionNumber >= questions.length){
    console.log(questionNumber)
    timer = 0;
    clearInterval(timeRemains);
    inputInitials();
    return;
  }
  // alert('pakka')
  document.getElementById('correct-incorrect').style.visibility = 'hidden';

  let currentQuestion = questions[questionNumber];
  document.getElementById('question').innerText = currentQuestion.questionText;
  let option = document.getElementById('options');
  option.innerHTML = '';
  for(let i=0;i<currentQuestion.options.length;i++){


    option.addEventListener('click',verifyAnswer);
    
    option.innerHTML += `<li id="" >${currentQuestion.options[i]}</li>`;
  }

}

function verifyAnswer(event){
  console.log('correct ',questions[questionNumber].answer);
  console.log(event.target.innerText)
  const clickedAnswer = event.target.innerText;

  document.getElementById('correct-incorrect').style.visibility = 'visible';

  if(clickedAnswer == questions[questionNumber].answer){

    document.getElementById('result').innerText = 'Correct!';
    // document.getElementById('result')
    questionNumber = questionNumber+1;
    currentScore = currentScore+1;
    setTimeout(() => {
      showQuestions();
      
    }, 1*1000);
  }
  else{
    document.getElementById('result').innerText = 'Incorrect...!';

    timer = timer-10;
  }
  
}


function inputInitials(){

  document.getElementById('current-score').innerText = currentScore;
  document.getElementById('question-options').style.display = 'none';
  document.getElementById('enter-initials').style.display = 'block';

  let submitBtn = document.getElementById('submit-initials');
  submitBtn.addEventListener('click',function(event){
    // event.preventDefault();

    console.log('submit btn clicked');

    let initial = document.getElementById('name').value;
    console.log('name is: ',initial);

    // check whether its first time or not, for first initialization of the currentHighScores value
    let prev = JSON.parse(localStorage.getItem('quiz-high-scores'));
    if(!(prev == undefined || prev == null)){
      currentHighScores = prev;
    }

    console.log(currentHighScores);
    currentHighScores.push({
      name: initial,
      score: currentScore,
    
    })

    // sort based on score in descending order
    currentHighScores.sort( (a,b) => b.score - a.score );

    // set updated data to local storage
    localStorage.setItem('quiz-high-scores',JSON.stringify(currentHighScores))
   
  })
}

// view highscore css
document.getElementById('leaderboard').addEventListener('click',showScore)
function showScore(){

  // hide all the children and show only highscore block
  document.getElementById('starter').style.display = 'none';
  document.getElementById('question-options').style.display = 'none';
  document.getElementById('enter-initials').style.display = 'none';

  document.getElementById('high-score').style.display = 'block';

  // stop the timer
  clearInterval(timeRemains);

  // fetch data from localStorage and display on the screen
  let data = JSON.parse(localStorage.getItem('quiz-high-scores'));
  console.log('data',data)
  let scores = '';
  for(let i=0;i<data.length;i++){
    scores += `
        <li>
         ${data[i].name}- ${data[i].score}
        
        </li>`;
  }
  
  document.getElementById("high-score-list").innerHTML = scores;
}

// clear highscores function that clear localstorage and refresh the page to redirect to home page
document.getElementById('clear-highscores-btn').addEventListener('click',function(){
  localStorage.clear();
  location.reload();
  
})
// Go back function for returning to home page
document.getElementById('go-back-btn').addEventListener('click',function(){
  location.reload();
  
})