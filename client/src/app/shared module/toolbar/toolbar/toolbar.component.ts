import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../login/login.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false
})
export class ToolbarComponent implements OnInit {

  routerLink!: string;
  isLoggedIn!: Observable<boolean>;
  isAdministrator!: Observable<boolean>;
  isStandard!: Observable<boolean>;

  constructor(
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn;
    this.isAdministrator = this.loginService.isAdministrator;
    this.isStandard = this.loginService.isStandard;
  }

  logout() {
    this.loginService.logout();
  }

}
