import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SampleRoutingModule} from './sample-routing.module';
import {SampleFormComponent} from "./sample-form/sample-form.component";
import {CorematerialModule} from "../material module/corematerial.module";
import {UploadModule} from "../shared module/upload/upload.module";
import {SharedModule} from "../shared module/shared.module";
import {SampleOverviewComponent} from './sample-overview/sample-overview.component';


@NgModule({
  declarations: [
    SampleFormComponent,
    SampleOverviewComponent
  ],
  imports: [
    CommonModule,
    CorematerialModule,
    SampleRoutingModule,
    UploadModule,
    SharedModule
  ]
})
export class SampleModule {
}
