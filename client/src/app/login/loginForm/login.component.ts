import {AfterViewInit, Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';
import { MatCard, MatCardContent, MatCardTitle, MatCardActions } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FlexModule, GridModule, MatCard, FormsModule, MatCardContent, MatCardTitle, MatFormField, MatInput, MatCardActions, MatButton]
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
