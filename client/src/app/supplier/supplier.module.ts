import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SupplierRoutingModule} from './supplier-routing.module';
import {SupplierFormComponent} from './supplier-form/supplier-form.component';


import {SupplierOverviewComponent} from './supplier-overview/supplier-overview.component';
import {SupplierViewComponent} from './supplier-view/supplier-view.component';
import {RouterModule} from "@angular/router";


@NgModule({
    imports: [
    CommonModule,
    SupplierRoutingModule,
    RouterModule,
    SupplierFormComponent, SupplierOverviewComponent, SupplierViewComponent
]
})
export class SupplierModule {
}
