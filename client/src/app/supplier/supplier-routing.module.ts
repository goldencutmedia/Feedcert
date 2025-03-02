import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SupplierFormComponent} from "./supplier-form/supplier-form.component";
import {SupplierOverviewComponent} from "./supplier-overview/supplier-overview.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SupplierOverviewComponent
  },
  {
    path: 'new',
    pathMatch: 'full',
    component: SupplierFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule {
}
