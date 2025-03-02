import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent implements OnInit {

  isLoggedIn!: Observable<boolean>;
  isAdministrator!: Observable<boolean>;
  isStandard!: Observable<boolean>;
  isTaskforce!: Observable<boolean>;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn;
    this.isAdministrator = this.loginService.isAdministrator;
    this.isStandard = this.loginService.isStandard;
    this.isTaskforce = this.loginService.isTaskforce;
  }

  logout() {
    this.loginService.logout();
  }

}
