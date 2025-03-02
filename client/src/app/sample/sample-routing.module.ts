import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SampleFormComponent} from "./sample-form/sample-form.component";
import {SampleOverviewComponent} from "./sample-overview/sample-overview.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SampleOverviewComponent
  },
  {
    path: 'new',
    pathMatch: 'prefix',
    component: SampleFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule {
}
