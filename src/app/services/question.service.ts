import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { QuestionModel } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http: HttpClient) { }

  postQuestions(questionObj: Partial<QuestionModel>) {
    return this.http.post<QuestionModel>(`${environment.baseUrl}/questions`, questionObj)
  }

  getQuestions() {
    return this.http.get<QuestionModel[]>(`${environment.baseUrl}/questions`)
  }

  getQuestionById(id: string) {
    return this.http.get<QuestionModel>(`${environment.baseUrl}/questions/${id}`)
  }

  updateQuestion(data: QuestionModel) {
    return this.http.put<QuestionModel[]>(`${environment.baseUrl}/questions/${data.id}`, data)

  }
}
