import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyRoutingModule} from './company-routing.module';


import {CompanyOverviewComponent} from './company-overview/company-overview.component';
import {CompanyViewComponent} from './company-view/company-view.component';
import {RouterModule} from '@angular/router';
import {CompanyFormComponent} from './company-form/company-form.component';


@NgModule({
    imports: [
    CommonModule,
    CompanyRoutingModule,
    RouterModule,
    CompanyOverviewComponent, CompanyViewComponent, CompanyFormComponent
]
})
export class CompanyModule {
}
