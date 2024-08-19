import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    let str = localStorage.getItem('user');
    if (str!= null) {
      this.userService.user = JSON.parse(str);
    }
  }

  logout() {
    this.userService.user = undefined;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


}
