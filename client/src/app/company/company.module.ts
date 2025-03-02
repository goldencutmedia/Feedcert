import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyRoutingModule} from './company-routing.module';
import {CorematerialModule} from '../material module/corematerial.module';
import {SharedModule} from '../shared module/shared.module';
import {CompanyOverviewComponent} from './company-overview/company-overview.component';
import {CompanyViewComponent} from './company-view/company-view.component';
import {RouterModule} from '@angular/router';
import {CompanyFormComponent} from './company-form/company-form.component';


@NgModule({
  declarations: [CompanyOverviewComponent, CompanyViewComponent, CompanyFormComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CorematerialModule,
    SharedModule,
    RouterModule
  ]
})
export class CompanyModule {
}
