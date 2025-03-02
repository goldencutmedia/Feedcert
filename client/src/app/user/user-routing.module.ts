import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserOverviewComponent} from "./user-overview/user-overview.component";



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserOverviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
