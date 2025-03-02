import {Component, OnInit} from '@angular/core';
import {User} from "../../user/User";
import {Observable} from "rxjs";
import {LoginService} from "../../login/login.service";
import {Company} from "../../company/company-form/company";
import {SampleDataService} from "../../sample/sample-data.service";
import {Sample} from "../../sample/sample";
import { NgIf, AsyncPipe } from '@angular/common';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { TaskforceHomeComponent } from '../taskforce-home/taskforce-home.component';
import { StandardHomeComponent } from '../standard-home/standard-home.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [NgIf, AdminHomeComponent, TaskforceHomeComponent, StandardHomeComponent, AsyncPipe]
})
export class HomeComponent implements OnInit {

  user!: Observable<User>;
  isTaskforce!: Observable<boolean>;
  isAdministrator!: Observable<boolean>;
  isStandard!: Observable<boolean>;

  constructor(private loginservice: LoginService,
              ) {
  }

  ngOnInit(): void {
    this.isAdministrator = this.loginservice.isAdministrator;
    this.isTaskforce = this.loginservice.isTaskforce;
    this.isStandard = this.loginservice.isStandard;
    this.user = LoginService.getUser();
  }
}
