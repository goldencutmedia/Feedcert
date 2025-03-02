import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {CorematerialModule} from "../material module/corematerial.module";
import {SharedModule} from "../shared module/shared.module";
import {UserOverviewComponent} from './user-overview/user-overview.component';
import {UserViewComponent} from './user-view/user-view.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [UserOverviewComponent, UserViewComponent],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule,
    CorematerialModule,
    RouterModule
  ]
})
export class UserModule {
}
