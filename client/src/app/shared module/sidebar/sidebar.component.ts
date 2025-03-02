import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {LoginService} from "../../login/login.service";
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatNavList } from '@angular/material/list';
import { SidebarbuttonComponent } from '../sidebarbutton/sidebarbutton.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [FlexModule, GridModule, NgIf, MatNavList, SidebarbuttonComponent, AsyncPipe]
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
