import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';
import { QuestionModel } from '../models/question.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  question: string = '';
  questionList: Array<QuestionModel> = [];

  constructor(
    public questionService: QuestionService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe((res) =>{
      this.questionList = res
    })
  }

  askQuestion() {
    this.questionService
      .postQuestions({
        username: this.userService.user?.username!,
        question: this.question,
        solutions: []
      })
      .subscribe((res) => {
        this.questionList.push(res);
        this.question = "";

      });
  }
}

