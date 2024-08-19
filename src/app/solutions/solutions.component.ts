import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from '../models/question.model';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
})
export class SolutionsComponent {
  solutionText: string = '';
  questionId?: string | null;
  questionObj?: QuestionModel;

  constructor(
    public questionService: QuestionService,
    public userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.questionService
      .getQuestionById(this.questionId ?? '')
      .subscribe((res) => {
        this.questionObj = res;
      });
  }

  postSolution() {
    let solutionObj = {
      username: this.userService.user?.username,
      solution: this.solutionText,
      plus: [],
      minus: [],
    };
    if (this.questionObj) {
      this.questionObj.solutions.push(solutionObj);
      this.questionService.updateQuestion(this.questionObj).subscribe((res) => {
        this.solutionText = '';
      });
    }
  }

  vote(index: number, point: number) {
    if (this.questionObj) {
      if (point == 1) {
        if (
          this.questionObj.solutions[index].plus.indexOf(
            this.userService.user?.id
          ) < 0
        ) {
          this.questionObj.solutions[index].plus.push(
            this.userService.user?.id
          );
        }
        for (let i=0; i< this.questionObj.solutions[index].minus.length; index++) {
          if(this.questionObj.solutions[index].minus[i] == this.userService.user?.id) {
            this.questionObj.solutions[index].minus.splice(i,1);
          }
        }

      } else {
        if (
          this.questionObj.solutions[index].minus.indexOf(
            this.userService.user?.id
          ) < 0
        ) {
          this.questionObj.solutions[index].minus.push(
            this.userService.user?.id
          );
        }
        for (let i=0; i< this.questionObj.solutions[index].plus.length; index++) {
          if(this.questionObj.solutions[index].plus[i] == this.userService.user?.id) {
            this.questionObj.solutions[index].plus.splice(i,1);
          }
        }

      }
      this.questionService.updateQuestion(this.questionObj).subscribe((res) => {
        this.solutionText = '';
      });
    }
  }
}
