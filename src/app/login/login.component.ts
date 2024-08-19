import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userService.user) {
      this.router.navigate(['/home']);
    }
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.getUser(this.loginForm.value.email!).subscribe((res) => {
      if (res.length == 0) {
        this.snackBar.open('Invalid email or password', 'Ok');
      } else {
        if (res[0].password === this.loginForm.value.password) {
          this.userService.user = res[0];
          localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigateByUrl('/home');
        } else {
          this.snackBar.open('Invalid email or password', 'Ok');
        }
      }
    });
  }
}
