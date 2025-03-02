import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import {SnackbarService} from './snackbar.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private api: ApiService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.token = localStorage.getItem('id_token');
  }

  username: string;
  password: string;
  token: string;

  login(id: string, password: string) {

    if (!id || !password) {
      this.snackbar.openSnackBar('Anmeldedaten nicht vollständig ausgefüllt');
    }

    this.api.sendPostRequest('users/login', {id, password})
      .subscribe(
        response => {
          this.setSession(response);
          window.location.href = '/';
        },
        error => {
          this.snackbar.openSnackBar(error);
        },
        () => {
        }
      );
  }

  getToken() {
    return this.token;
  }

  setSession(loginResult) {
    this.token = loginResult.token;
    const expiresAt = moment().add(Number(loginResult.expiresIn.replace('h', '')), 'hour');

    localStorage.setItem('user', loginResult.user);
    localStorage.setItem('id_token', this.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }


}
