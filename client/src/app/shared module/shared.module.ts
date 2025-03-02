import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseFormComponent} from './base-form/base-form.component';
import {CorematerialModule} from '../material module/corematerial.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {SafePipe} from 'safe-pipe';
import {FormDialogComponent} from './form-dialog/form-dialog.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {SidebarbuttonComponent} from './sidebarbutton/sidebarbutton.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AnalyticalResultComponent} from './analytical-result/analytical-result.component';
import {MessageDialogComponent} from './message-dialog/message-dialog.component';


@NgModule({
  declarations: [
    BaseFormComponent,
    MessageDialogComponent,
    ConfirmationDialogComponent,
    FormDialogComponent,
    SidebarComponent,
    SidebarbuttonComponent,
    AnalyticalResultComponent
  ],
  imports: [
    CommonModule,
    CorematerialModule,
    FlexLayoutModule,
    SafePipe,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    BaseFormComponent,
    FlexLayoutModule,
    CorematerialModule,
    ConfirmationDialogComponent,
    MessageDialogComponent,
    SafePipe,
    SidebarComponent,
    SidebarbuttonComponent,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
