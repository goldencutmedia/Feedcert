import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RatingFormComponent} from "./rating-form/rating-form.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RatingFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule {
}
