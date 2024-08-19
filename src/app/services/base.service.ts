import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  err: any;

  // public baseUrl="http://localhost:3000/"

  constructor(public http: HttpClient) { }

  // postReq() {
  //   return this.http.post<any>
  // }
}
