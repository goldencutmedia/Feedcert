import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingFormComponent} from './rating-form/rating-form.component';
import {RatingRoutingModule} from "./rating-routing.module";
import {CorematerialModule} from "../material module/corematerial.module";
import {SharedModule} from "../shared module/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [RatingFormComponent],
  imports: [
    RatingRoutingModule,
    CommonModule,
    CorematerialModule,
    SharedModule,
    RouterModule
  ]
})
export class RatingModule {
}
