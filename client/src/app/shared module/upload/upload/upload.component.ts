import {Component} from '@angular/core';
import {UploadService} from './upload.service';
import {UploadDialogComponent} from '../upload-dialog/upload-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: false
})
export class UploadComponent {
  constructor(public dialog: MatDialog, public uploadService: UploadService) {
  }

  public openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '50%',
      height: '50%',
    });
  }
}
