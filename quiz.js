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
app.controller("routrCtrl", function($scope, $interval, $timeout) {
  $scope.answersStack = [];
  $scope.login = true;
  $scope.quiz = false;
  $scope.result = false;
  $scope.message = 'hide';
  $scope.correctAnswers= 0;
  $scope.questionNumber=0;
  $scope.questions = quiz_questions;
  $scope.timercount = 180;
  $scope.checkCredential = function(){
    if(($scope.name.toLowerCase()==='zolo' && $scope.password === '123')) {
      $timeout(function(){
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
    $scope.answersStack.push(parseInt(answer)+1);
    if(quiz_questions[question]["answer"] === (parseInt(answer)+1)){
      evnt.setAttribute("class", "answer green");
      $scope.message = 'correct';
      $scope.correctAnswers++;
    }else{
      evnt.setAttribute("class", "answer shake");
      $scope.message = 'in-correct';
    }
    // check your wait code here
    $timeout(function(){
      $scope.questionNumber++;
      if($scope.questionNumber >= quiz_questions.length) {
        $interval.cancel($scope.timer)
        $scope.showResults();
      }
    },500);
    // check your wait code here
    $timeout(function(){
      $scope.message = 'hide';
    },600);
  }
  $scope.showResults = function(){
    $scope.quiz = false;
    $scope.result = true;
    var ctx = document.getElementById("myChart");
    var attempts = {
        label: 'Your attempts',
        data: [$scope.correctAnswers, $scope.questions.length - $scope.correctAnswers ],
        backgroundColor: [
            'rgba(0,255,0,0.3)',
            'rgba(255,0,0,0.3)'
        ],
        borderColor: [
            'rgba(0,255,0,0.3)',
            'rgba(255,0,0,0.3)'
        ],
        borderWidth: 1
    };
    var data = {
        labels: ["correct", "in-correct"],
        datasets: [attempts]
    }
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    steps: 1,
                    max: 7,
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
        type: 'bar',
        data: data,
        options: options
    });
  }
  $scope.roundTime= function(time){
    return parseInt(time/60) + ':' + time%60;
  }
})
