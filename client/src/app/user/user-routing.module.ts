import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserOverviewComponent} from "./user-overview/user-overview.component";
import { SharedModule } from '../shared module/shared.module';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserOverviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
