import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private loginservice: LoginService) {
  }

  userId: string;
  password: string;
  loginButtonText: string;
  hide = true;

  ngOnInit() {
    this.loginButtonText = 'Anmelden';
  }

  login(): void {
    this.loginservice.login(this.userId, this.password);
  }


}
