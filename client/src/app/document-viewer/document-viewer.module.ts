import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentViewerComponent} from './document-viewer/document-viewer.component';


import {RouterModule} from "@angular/router";
import {DocumentViewerRoutingModule} from "./document-viewer-routing.module";



@NgModule({
    imports: [
    DocumentViewerRoutingModule,
    CommonModule,
    RouterModule,
    DocumentViewerComponent
]
})
export class DocumentViewerModule {
}
