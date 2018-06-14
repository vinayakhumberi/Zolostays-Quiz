const quiz_questions = [
  {
    "question": "What is the only venomous snake found in Britain ?",
    "options": [ "Saviper","Black Mamba","Adder","Charmen" ],
    "answer": 3
  },
  {
    "question": "What is the capital of Saudi Arabia?",
    "options": [ "Riyadh","Dubai","Sharjah","Abudabi" ],
    "answer": 1
  },
  {
    "question": "Who played Poirot in the 1974 film version of Murder on the Orient Express?",
    "options": [ "Clint Eastwood","Robert Cunningham","Micheal Raverto","Albert Finny" ],
    "answer": 4
  },
  {
    "question": "What scale of zero to 14 is used to measure acidity or alkalinity?",
    "options": [ "RO scale","pH scale","aA scale","Puter scale" ],
    "answer": 2
  },
  {
    "question": "What is Supermans mothers name?",
    "options": [ "Maril","Murel","Martha","Neani" ],
    "answer": 3
  },
  {
    "question": "If 20% of A=B, then B% of 20 is same as ?",
    "options": [ "4% of A","5% of A","20% of A","None of these" ],
    "answer": 1
  }
];


const app = angular.module("test",['angularRipple']);
app.controller("routrCtrl", function($scope, $interval) {
  let answersStack = [];
  $scope.login = true;
  $scope.quiz = false;
  $scope.result = false;

  $scope.questionNumber=0;
  $scope.questions = quiz_questions;
  $scope.timercount = 180;
  $scope.checkCredential = function(){
    if(($scope.name.toLowerCase()==='zolo' && $scope.password === '123')) {
      setTimeout(function(){
        $scope.login = false;
        $scope.quiz = true;
        $scope.timer = $interval(function () {
          if($scope.timercount<=0){
            $interval.cancel($scope.timer)
            $scope.showResults();
          }
          $scope.timercount--;
        }, 1000);
      },300);
    }else {
      $scope.error = "Incorrect username or password";
    }
  }
  $scope.checkAnswer = function(){
    event.preventDefault();
    event.stopPropagation();
    const evnt = event.target.getAttribute('data-question') ? event.target : event.target.parentElement;
    const question = evnt.getAttribute('data-question');
    const answer = evnt.getAttribute('data-answer');
    answersStack[$scope.questionNumber] = (answersStack[$scope.questionNumber]) ? answersStack[$scope.questionNumber]+1 : 1;
    if(quiz_questions[question]["answer"] === (parseInt(answer)+1)){
      evnt.setAttribute("class", "answer green");
      $scope.questionNumber++;
    }else{
      evnt.setAttribute("class", "answer shake");
    }
    if($scope.questionNumber >= quiz_questions.length) {
      $interval.cancel($scope.timer)
      $scope.showResults();
    }
  }
  $scope.showResults = function(){
    $scope.quiz = false;
    $scope.result = true;
    $scope.results= "Number of attempts: " + answersStack.reduce(function(total, num){ return total + num });
    var ctx = document.getElementById("myChart");
    var attempts = {
        label: 'Number of attempts',
        data: answersStack,
        backgroundColor: [
            'rgba(255, 99, 132, 0)'
        ],
        borderColor: [
            'rgba(255,99,132,1)'
        ],
        borderWidth: 1
    };
    var data = {
        labels: ["1", "2", "3", "4", "5", "6"],
        datasets: [attempts]
    }
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    steps: 1,
                    max: 5,
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        if (Math.floor(value) === value) {
                            return value;
                        }
                    }
                }
            }]
        }
    };
    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
  }
  $scope.roundTime= function(time){
    return parseInt(time/60) + ':' + time%60;
  }
})
