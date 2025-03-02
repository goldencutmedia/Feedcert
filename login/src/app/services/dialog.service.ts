import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent} from '../shared module/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  showDialog(message: string, width?: string) {

    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: (width || '350') + 'px',
      data: message
    });
    return dialogRef.afterClosed();
  }
}
