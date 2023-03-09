import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name:string = "";
  public questionList:any = [];
  public currentQuestion:number = 0;
  public points:number = 0;
  public counter:number = 60;
  public correctAnswer:number = 0;
  public inCorrectAnswer:number = 0;
  public interval$:any;
  public progressBar:string="0";
  public isQuizCompleted:boolean = false;
  constructor(private service : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(){
    this.service.getQuestionJson().subscribe((result)=>{
      console.warn(result);
      this.questionList = result.questions;
    })
  }
  previousQuestion(){
      this.currentQuestion--;
    
  }
  nextQuestion(){
    this.currentQuestion++;
  }
  answer(questionNo:number,option:any){

    if(questionNo === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }

    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++
        this.resetCounter();
        this.getProgressPercent();   
      }, 1000);

    }else{
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points-= 10;
    }
  }
  
  startCounter(){
    this.interval$ = interval(1000).subscribe((result)=>{
      console.warn("value of interval",result);
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progressBar = '0';
  }
  getProgressPercent(){
    this.progressBar = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progressBar;
  }
}
