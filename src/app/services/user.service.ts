import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user?: UserModel;

  constructor(public http: HttpClient) { }

  createUser(userObj: UserModel) {
    return this.http.post<UserModel>(`${environment.baseUrl}/users`, userObj);
  }

  getUser(email: string) {
    return this.http.get<UserModel[]>(`${environment.baseUrl}/users?email=${email}`);

  }

  updateUser(data: UserModel) {
    return this.http.put<UserModel>(`${environment.baseUrl}/users`, data);
  }
}
