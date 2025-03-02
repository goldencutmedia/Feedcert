import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './loginForm/login.component';
import {CorematerialModule} from '../material module/corematerial.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CorematerialModule,
  ]
})
export class LoginModule {
}
