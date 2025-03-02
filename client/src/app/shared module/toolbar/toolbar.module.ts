import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {CorematerialModule} from "../../material module/corematerial.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    CorematerialModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
