import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./homeView/home.component";
import {CorematerialModule} from "../material module/corematerial.module";
import { SummaryComponent } from './summary/summary.component';
import { StandardHomeComponent } from './standard-home/standard-home.component';
import { TaskforceHomeComponent } from './taskforce-home/taskforce-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';


@NgModule({
  declarations: [
    HomeComponent,
    SummaryComponent,
    StandardHomeComponent,
    TaskforceHomeComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    CorematerialModule
  ]
})
export class HomeModule {
}
