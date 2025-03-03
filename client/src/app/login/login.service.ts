import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Sample} from '../sample/sample';
import {Router} from '@angular/router';
import {User} from '../user/User';
import {BehaviorSubject} from 'rxjs';
import {Company} from '../company/company-form/company';
import {SnackbarService} from '../services/snackbar.service';
import {environment} from '../../environments/environment';
import dayjs from 'dayjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private api: ApiService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.receivedFilter = new EventEmitter<Sample>();

    this.token = localStorage.getItem('id_token') || '';

    LoginService.user.next(new User());
    const user = localStorage.getItem('user');
    if (user) {
      this.setUser(user);
    }

  }

  get isLoggedIn() {
    if (LoginService.isLoggedInCookie()) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  get isAdministrator() {
    return this.administrator.asObservable();
  }

  get isTaskforce() {
    return this.taskforce.asObservable();
  }

  get isStandard() {
    return this.standard.asObservable();
  }

  private static user = new BehaviorSubject<User>(new User());
  receivedFilter: EventEmitter<Sample>;
  username: string = '';
  password: string = '';
  token: string;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private administrator = new BehaviorSubject<boolean>(false);
  private taskforce = new BehaviorSubject<boolean>(false);
  private standard = new BehaviorSubject<boolean>(false);
  private company = new BehaviorSubject<Company>(new Company());

  static getCompanyID() {
    return this.user.getValue().company.id;
  }

  static getUser() {
    return LoginService.user.asObservable();
  }

  static getUsername() {
    return LoginService.user.getValue().username;
  }

  static getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = expiration ? JSON.parse(expiration) : null;
    return dayjs(expiresAt).toDate();
    ;
  }

  static isLoggedInCookie() {
    const loggedIn = dayjs().isBefore(LoginService.getExpiration());
    if (loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  login(id: string, password: string) {

    if (!id || !password) {
      this.snackbar.openSnackBar('Anmeldedaten nicht vollständig ausgefüllt');
    }

    return this.api.sendPostRequest('users/login', {id, password})
      .subscribe(
        response => {
          this.setSession(response);
          this.loggedIn.next(true);
          this.router.navigate(['/home']);
        },
        error => {
          if (error) {
            this.snackbar.openSnackBar(error);
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    window.location.href = environment.loginApp || '/login';
  }

  setSession(loginResult: any) {
    this.setUser(loginResult.user);
    this.token = loginResult.token;
    const expiresAt = dayjs().add(Number(loginResult.expiresIn.replace('h', '')), 'hour');

    localStorage.setItem('user', JSON.stringify(LoginService.user.getValue()));
    localStorage.setItem('id_token', this.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  private setUser(config: any) {
    if (!config) {
      return;
    }
    config = JSON.parse(config);
    LoginService.user.next(new User(config));
    const roles = config.roles;
    if (roles.includes('ADMIN')) {
      this.administrator.next(true);
    } else {
      this.administrator.next(false);
    }
    if (roles.includes('TASKFORCE')) {
      this.taskforce.next(true);
    } else {
      this.taskforce.next(false);
    }
    if (roles.includes('STANDARD')) {
      this.standard.next(true);
    } else {
      this.standard.next(false);
    }
  }

  getToken() {
    return this.token;
  }


}
