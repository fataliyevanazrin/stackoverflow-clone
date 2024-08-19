import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  constructor(private fb: FormBuilder, public userService: UserService, private router: Router) {}

  registerForm = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    username: ['', [Validators.required,Validators.maxLength(10)]],
    password:['', [Validators.required,Validators.minLength(8)]]
  })

  get f(): {[key: string]: AbstractControl} {
    return this.registerForm.controls;
  }

  createAccount() {
    this.userService.createUser(this.registerForm.value as UserModel).subscribe((res) =>{
      this.router.navigateByUrl('/login');
    });
  }



}
