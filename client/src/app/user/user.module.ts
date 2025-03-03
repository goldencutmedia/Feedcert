import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';


import {UserOverviewComponent} from './user-overview/user-overview.component';
import {UserViewComponent} from './user-view/user-view.component';
import {RouterModule} from "@angular/router";



@NgModule({
    imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    UserOverviewComponent,
    UserViewComponent
]
})
export class UserModule {
}
