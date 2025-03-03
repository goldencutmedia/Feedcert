import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {DIALOG_TYPE, DialogService} from '../../services/dialog.service';
import {Sample} from "../sample";
import {LoginService} from "../../login/login.service";
import {SampleDataService} from "../sample-data.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Observable} from "rxjs";
import {COMPANY_FORM_DATA} from "../../company/company-form/company-form-data";
import {Action} from "../../shared module/action/Action";
import {SAMPLE_FORM_DATA} from "../sample-form/sample-form-data";
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatList, MatListItem } from '@angular/material/list';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatLine, MatOption } from '@angular/material/core';
import { MatChipGrid, MatChipRow } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BaseFormComponent } from '../../shared module/base-form/base-form.component';
import { SafePipe } from 'safe-pipe';

@Component({
    selector: 'app-sample-overview',
    templateUrl: './sample-overview.component.html',
    styleUrls: ['./sample-overview.component.scss'],
    imports: [NgIf, MatAnchor, MatGridList, MatGridTile, MatCard, MatCardContent, FlexModule, MatList, NgFor, MatListItem, NgClass, ExtendedModule, MatLine, MatDivider, MatTabGroup, MatTab, MatFormField, MatSelect, FormsModule, MatOption, BaseFormComponent, AsyncPipe, SafePipe, MatChipGrid, MatChipRow]
})
export class SampleOverviewComponent implements OnInit {
  samples!: Sample[];
  selected!: Sample;
  formData = SAMPLE_FORM_DATA;
  companyFormData = COMPANY_FORM_DATA;
  pdfUrl!: string;
  sampleTableColumns: string[] = ['info', 'state'];
  isTaskforce!: Observable<boolean>;
  isStandard!: Observable<boolean>;
  actionButtonText!: string;
  answerButtonText!: string;
  pdfViewerHidden = true;


  constructor(private api: ApiService,
              private dialog: DialogService,
              private loginservice: LoginService,
              private sampledataservice: SampleDataService,
              private snackbar: SnackbarService) {
  }

  ngOnInit() {
    this.isStandard = this.loginservice.isStandard;
    this.isTaskforce = this.loginservice.isTaskforce;
    this.actionButtonText = 'Maßnahme festlegen';
    this.answerButtonText = 'Maßnahme abschließen';
    this.loadSamples();
  }

  private loadSamples() {
    let taskforce = false;
    this.isTaskforce.subscribe(
      (next) => {
        taskforce = next;
      }
    );
    let filters: { property: string; value: number }[] = [];
    if (taskforce) {
      filters = [{property: 'state', value: 0}];
    }
    this.sampledataservice.loadSamples(filters, taskforce).subscribe(
      (next) => {
        this.samples = next || [];
      },
      error => {
        console.log(error);
      },
      () => {
        if (this.samples) {
          this.samples.sort((a, b) => (a.state < b.state) ? 1 : -1);
        }
        this.selected = new Sample();
      }
    );
  }

  onSelect(sample: Sample) {
    this.selected = sample;
    const mappedFormData = {
      fields: this.formData.fields
        .filter(field => field.name !== undefined)
        .map(field => ({
          name: field.name as string,
          hidden: field.hidden || false
        }))
    };
    this.sampledataservice.showHideFields(sample.type, mappedFormData);
    this.showPdf();
  }

  onSelectChip(sample: Sample) {
    this.onSelect(sample);
    if (sample.state === 1) {
      this.openActionDialog('Festgelegte Maßnahme', true, sample.actions[0]);
    }
  }

  addSample() {
    this.api.modifyEntity('samples', this.selected)
      .subscribe(
        () => {

        },
        error => {
          console.log(error);
        },
        () => {
          this.snackbar.openSnackBar('Analyse wurde gespeichert.');
        }
      );
  }

  deleteSample() {
    const message = this.selected ? this.selected.type + ' wirklich löschen?' : 'Sample wirklich löschen?';
    this.dialog.showDialog(DIALOG_TYPE.CONFIRMATION, message)?.subscribe(result => {
      if (result) {
        this.api.deleteEntity('samples', this.selected)
          .subscribe(
            () => {
            },
            error => {
              console.log(error);
            },
            () => {
              this.sampledataservice.loadSamples().subscribe(samples => {
                this.samples = samples;
              });
            }
          );
      }
    });
  }

  openActionDialog(title: string, readOnly: boolean, formObject?: Action) {

    if (!formObject) {
      formObject = new Action({
        state: 1
      });
    }

    const formData = {
      fields: [
        {
          type: 'textarea',
          name: 'description',
          label: 'Maßnahmenbeschreibung',
          lines: 4,
          span: 6,
          readOnly
        }
      ]
    };

    this.dialog.showFormDialog(title, formData, formObject).subscribe(result => {
      if (result && !readOnly) {
        this.sampledataservice.setActionOnSample(this.selected, formObject).subscribe(
          () => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.snackbar.openSnackBar('Maßnahme wurde versendet!');
            this.loadSamples();
          }
        );
      }
    });
  }

  openFinishDialog(title: string) {

    const formObject = new Action({
      state: 2
    });

    const formData = {
      fields: [
        {
          type: 'textarea',
          name: 'description',
          label: 'Antwort an Taskforce',
          lines: 4,
          span: 6
        }
      ]
    };

    this.dialog.showFormDialog(title, formData, formObject).subscribe(result => {
      if (result) {
        this.sampledataservice.setActionOnSample(this.selected, formObject).subscribe(
          () => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.snackbar.openSnackBar('Analyse ist abgeschlossen!');
            this.loadSamples();
          }
        );
      }
    });
  }

  showPdf() {
    this.pdfViewerHidden = false;
    this.pdfUrl = ApiService.getFileUrl(this.selected.companyId, this.selected.documentIds[0]);
  }

  mapState(state: number) {
    return this.sampledataservice.mapState(state);
  }

  setActionSelected() {
    this.openActionDialog(this.actionButtonText, false);
  }

  finishSampleSelected() {
    this.openFinishDialog(this.answerButtonText);
  }
}
