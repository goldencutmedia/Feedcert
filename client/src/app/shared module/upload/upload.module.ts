import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './upload/upload.component';
import {UploadDialogComponent} from './upload-dialog/upload-dialog.component';
import {CorematerialModule} from '../../material module/corematerial.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [UploadComponent, UploadDialogComponent],
  imports: [
    CommonModule,
    CorematerialModule,
    HttpClientModule,
  ],
  exports: [UploadComponent],
})
export class UploadModule {
}
