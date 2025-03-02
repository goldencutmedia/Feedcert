import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../login/login.service";
import {Observable} from "rxjs";
import { NgIf, AsyncPipe } from '@angular/common';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';
import { MatAnchor, MatIconAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    imports: [NgIf, MatToolbar, MatToolbarRow, FlexModule, GridModule, MatAnchor, RouterLink, MatIconAnchor, MatIcon, AsyncPipe]
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
