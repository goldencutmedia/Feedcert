import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentViewerComponent} from "./document-viewer/document-viewer.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DocumentViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentViewerRoutingModule {
}
