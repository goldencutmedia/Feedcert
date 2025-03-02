import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingFormComponent} from './rating-form/rating-form.component';
import {RatingRoutingModule} from "./rating-routing.module";


import {RouterModule} from "@angular/router";


@NgModule({
    imports: [
    RatingRoutingModule,
    CommonModule,
    RouterModule,
    RatingFormComponent
]
})
export class RatingModule {
}
