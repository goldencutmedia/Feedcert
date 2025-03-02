import {Component, OnInit, ViewChild} from '@angular/core';
import {Sample} from '../sample';
import {Router} from '@angular/router';
import {SAMPLE_FORM_DATA} from './sample-form-data';
import {ApiService} from '../../services/api.service';
import {LoginService} from '../../login/login.service';
import {forkJoin, Observable, Subject} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {SampleDataService} from '../sample-data.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
  standalone: false
})

export class SampleFormComponent implements OnInit {

  sample: Sample = new Sample();
  formData = SAMPLE_FORM_DATA;
  formHidden = true;
  switchControl = new FormControl('');

  @ViewChild('file') file: any;
  @ViewChild('fileViewer') fileViewer: any;
  uploadedFile = new File([], '');

  progress: { [key: string]: { progress: Observable<number> } } = {};
  uploading = false;
  uploadSuccessful = false;

  constructor(private router: Router,
              private api: ApiService,
              private loginservice: LoginService,
              private sampledataservice: SampleDataService) {
  }

  ngOnInit(): void {
    this.switchControl.valueChanges.subscribe(value => {
      if (value !== null) {
        const simplifiedFormData = {
          fields: this.formData.fields.map(field => ({
            name: field.name || '',
            hidden: field.hidden || false
          }))
        };
        this.sampledataservice.showHideFields(value, simplifiedFormData);
      }
      this.formHidden = false;
    });

    const supplierField = this.formData.fields.find(field => field.name === 'supplierId');
    if (supplierField) {
      this.sampledataservice.fillSupplierField(supplierField);
    }
  }

  addSample() {
    this.sample.companyId = LoginService.getCompanyID();
    this.sample.documentIds = [];
    this.sample.documentIds.push(this.uploadedFile.name);
    this.sample.type = this.switchControl.value || '';

    this.api.addEntity('samples/', this.sample)
      .subscribe(
        (next) => {

        },
        error => {
          alert('POST call error:/n' + error);
        },
        () => {
          this.router.navigate(['/samples']);
        }
      );
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  deleteFiles() {
    this.fileViewer.nativeElement.src = '';
    // @ts-ignore
    this.api.deleteEntity('/containers/' + this.uploadedFile.container + '/files/', {
      id: this.uploadedFile.name
    }).subscribe(
      () => {
      },
      (error) => {
      }
    );
    this.uploadedFile = new File([], '');
    this.uploading = false;
    this.uploadSuccessful = false;
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.uploadedFile = files[0];
    this.startUpload();
  }

  startUpload() {
    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.upload();

    // convert the progress map into an array
    const allProgressObservables = [];
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

  public upload():
    { [key: string]: { progress: Observable<number> } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    const file = this.uploadedFile;
    formData.append('file', file, file.name);

    // create a new progress-subject for every file
    const progress = new Subject<number>();

    this.api.uploadFile(formData, LoginService.getCompanyID()).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

        const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        // @ts-ignore
        this.showFileInViewer(event.body.files.file[0]);
        progress.complete();
      }
    });

    // Save every progress-observable in a map of all observables
    status[file.name] = {
      progress: progress.asObservable()
    };

    // return the map of progress.observables
    return status;
  }

  showFileInViewer(file: any) {
    if (file) {
      this.uploadedFile = file;
      this.api.sendGetRequest(ApiService.getFileUrl(file.container, file.name))
        .subscribe(
          response => {
            console.log(response);
            this.fileViewer.nativeElement.src = 'charset=utf-8,' + escape(response as string);
          }
        );
    }
  }

  cancel() {
    this.router.navigate(['/samples']);
  }
}
