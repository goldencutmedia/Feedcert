import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SupplierRoutingModule} from './supplier-routing.module';
import {SupplierFormComponent} from './supplier-form/supplier-form.component';
import {CorematerialModule} from "../material module/corematerial.module";
import {SharedModule} from "../shared module/shared.module";
import {SupplierOverviewComponent} from './supplier-overview/supplier-overview.component';
import {SupplierViewComponent} from './supplier-view/supplier-view.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [SupplierFormComponent, SupplierOverviewComponent, SupplierViewComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    CorematerialModule,
    SharedModule,
    RouterModule
  ]
})
export class SupplierModule {
}
