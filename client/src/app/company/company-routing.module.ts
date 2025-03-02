import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyFormComponent} from "./company-form/company-form.component";
import {CompanyOverviewComponent} from "./company-overview/company-overview.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CompanyOverviewComponent
  },
  {
    path: 'new',
    pathMatch: 'full',
    component: CompanyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
