import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CorematerialModule} from '../material module/corematerial.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SafePipeModule} from 'safe-pipe';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageDialogComponent} from './message-dialog/message-dialog.component';


@NgModule({
  declarations: [
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    CorematerialModule,
    FlexLayoutModule,
    SafePipeModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    FlexLayoutModule,
    CorematerialModule,
    MessageDialogComponent,
    SafePipeModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
