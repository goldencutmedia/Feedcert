import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentViewerComponent} from './document-viewer/document-viewer.component';
import {CorematerialModule} from "../material module/corematerial.module";
import {SharedModule} from "../shared module/shared.module";
import {RouterModule} from "@angular/router";
import {DocumentViewerRoutingModule} from "./document-viewer-routing.module";
import {UploadModule} from "../shared module/upload/upload.module";


@NgModule({
  declarations: [DocumentViewerComponent],
  imports: [
    DocumentViewerRoutingModule,
    CommonModule,
    CorematerialModule,
    SharedModule,
    RouterModule,
    UploadModule
  ]
})
export class DocumentViewerModule {
}
