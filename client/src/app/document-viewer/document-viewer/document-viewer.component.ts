import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginService} from '../../login/login.service';
import {ApiService} from '../../services/api.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor, NgClass } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatLine } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { SafePipe } from 'safe-pipe';

@Component({
    selector: 'app-document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss'],
    imports: [MatGridList, MatGridTile, MatCard, MatCardContent, FlexModule, MatList, NgFor, MatListItem, NgClass, ExtendedModule, MatLine, MatDivider, SafePipe]
})

export class DocumentViewerComponent implements OnInit {

  isAdministrator!: Observable<boolean>;
  files: File[] = [];
  selected: File | undefined;
  pdfUrl = '';

  constructor(private api: ApiService,
              private loginservice: LoginService) {
  }

  ngOnInit() {
    this.isAdministrator = this.loginservice.isAdministrator;
    this.loadFiles();
  }

  private loadFiles() {
    this.api.getEntity('containers/globaldocuments/files/')
      .subscribe(
        (containerFiles: any) => {
            this.files = containerFiles.filter((file: File) => {
            return !file.name.startsWith('.');
            });
        },
        error => {
          console.log(error);
        },
        () => {
          this.selected = undefined;
        }
      );
  }

  onSelect(file: File): void {
    this.showPdf(file);
  }

  showPdf(file: File): void {
    let pdfUrl: string;
    if (file) {
      this.api.sendGetRequest(ApiService.getFileUrl(file.container, file.name))
        .subscribe(
          (res: any) => {
            pdfUrl = 'charset=utf-8,' + res as string;
          }
        );
      // this.fileViewer.nativeElement.src = this.api.getFileUrl(file.container, file.name);
      // console.log(this.fileViewer.nativeElement.src);
    }
  }

  // this.pdfUrl = this.api.getFileUrl('globaldocuments', file.name);
}

class File {
  container!: string;
  name!: string;
  mtime!: string;
}
