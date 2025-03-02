import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {UploadService} from '../upload/upload.service';
import {forkJoin} from 'rxjs';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MatLine } from '@angular/material/core';
import { MatProgressBar } from '@angular/material/progress-bar';

class DialogComponent {
}

@Component({
    selector: 'app-upload-dialog',
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.scss'],
    imports: [FlexModule, MatDialogTitle, MatButton, CdkScrollable, MatDialogContent, MatList, NgFor, MatListItem, MatLine, NgIf, MatProgressBar, MatDialogActions, MatDialogClose, AsyncPipe]
})


export class UploadDialogComponent implements OnInit {
  @ViewChild('file') file: any;
  public files: Set<File> = new Set();

  progress!: { [key: string]: { progress: any } };
  canBeClosed = true;
  primaryButtonText = 'Hochladen';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public uploadservice: UploadService
  ) {
  }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadservice.upload(this.files);

    // convert the progress map into an array
    const allProgressObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Abschließen';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

}
