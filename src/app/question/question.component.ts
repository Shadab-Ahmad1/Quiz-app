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
  constructor(private service : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
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
    if(option.correct){
      this.points+=10;
      // this.points = this.points + 10;
      this.correctAnswer++;
      this.currentQuestion++
    }
    else{
      this.points-= 10;
      this.currentQuestion++;
      this.inCorrectAnswer++;
    }
  }
  startCounter(){
    this.interval$ = interval
  }
  stopCounter(){
    
  }
  resetCounter(){
    
  }
}
