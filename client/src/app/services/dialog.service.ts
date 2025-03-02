import {Injectable} from '@angular/core';
import {ConfirmationDialogComponent} from '../shared module/confirmation-dialog/confirmation-dialog.component';
import {FormDialogComponent} from '../shared module/form-dialog/form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {MessageDialogComponent} from '../shared module/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  showDialog(type: DIALOG_TYPE, message: string, width?: string) {
    let component;
    switch (type) {
      case DIALOG_TYPE.CONFIRMATION:
        component = ConfirmationDialogComponent;
        break;
      case DIALOG_TYPE.MESSAGE:
        component = MessageDialogComponent;
        break;
    }
    if (component) {
      const dialogRef = this.dialog.open(component, {
        width: (width || '350') + 'px',
        data: message
      });
      return dialogRef.afterClosed();
    }
  }

  showFormDialog(title: string, formData: any, formObject: any, width?: string): Observable<any> {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: (width || '350') + 'px',
      data: {
        title,
        formData,
        formObject
      }
    });
    return dialogRef.afterClosed();
  }
}

export enum DIALOG_TYPE {
  CONFIRMATION,
  MESSAGE
}
