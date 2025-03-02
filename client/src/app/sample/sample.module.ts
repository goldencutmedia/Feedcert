import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SampleRoutingModule} from './sample-routing.module';
import {SampleFormComponent} from "./sample-form/sample-form.component";



import {SampleOverviewComponent} from './sample-overview/sample-overview.component';


@NgModule({
    imports: [
    CommonModule,
    SampleRoutingModule,
    SampleFormComponent,
    SampleOverviewComponent
]
})
export class SampleModule {
}
