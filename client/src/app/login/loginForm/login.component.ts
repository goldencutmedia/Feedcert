import {AfterViewInit, Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit, AfterViewInit {


  constructor(private router: Router, private loginservice: LoginService) {
  }

  userId: string = '';
  password: string = '';
  loginButtonText: string = '';
  hide = true;

  ngOnInit() {
    this.loginButtonText = 'Anmelden';
  }

  ngAfterViewInit(): void {
    if (this.loginservice.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  login(): void {
    // this.loginButtonText += '...';
    this.loginservice
      .login(this.userId, this.password);
  }


}
