function Quiz(question){
    this.score=0;
    this.question=question;
    this.questionIndex=0;
}
Quiz.prototype.getQuestionByIndex=function(){
     return this.question[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer=function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}
Quiz.prototype.isEnded=function(){
   return  this.questionIndex===this.question.length;
}
function Question(text,choices,answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}
Question.prototype.isCorrectAnswer=function(choice){
    return this.answer===choice;
}
let question=[
    new Question("Which of the following is not javascript data types?:",["Null type","Undefined type","Number type","All of the mentioned"],"All of the mentioned"),
    new Question("Which of the following can be used to call a JavaScript Code Snippet?:",["Function/Method","Preprocessor","Triggering Event"," RMI"],"Function/Method"),
    new Question("Which of the following scoping type does JavaScript use?",["Sequential","Segmental","Lexical","Literal"],"Lexical"),
    new Question("Which of the following is not a framework? ",["JavaScript .NET","JavaScript","Cocoa JS","jQuery"],"JavaScrip")
];

function loadQuestions(){
    if(quiz.isEnded()){
        showScore();
    }else{
        //show questions
        var element=document.getElementById("question");
        element.innerHTML=quiz.getQuestionByIndex().text;
        //show options
        var choices=quiz.getQuestionByIndex().choices;
        for(let i=0;i<choices.length;i++){
            var choice=document.getElementById("choice"+i);
            choice.innerHTML=choices[i];
            handleOptionButton("btn"+i,choices[i]);
        }
        showProgress();
    }
}
function showScore(){
    var gameOverHtml="<h1>Results</h1>";
    gameOverHtml+="<h2 id='score'>Your Score is: "+quiz.score +". and percentage is" +(quiz.score/question.length)*100 +"%" +"</h2>";
    var element=document.getElementById("quiz");
    element.innerHTML=gameOverHtml;

}
function showProgress(){
    let currentQuestionNum=quiz.questionIndex+1;
    let element=document.getElementById("progress");
    element.innerHTML="Question "+currentQuestionNum +"of "+quiz.question.length;

}
function handleOptionButton(id,choice){
let button=document.getElementById(id);
button.onclick=function(){
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
}
}

let quiz=new Quiz(question);
loadQuestions();