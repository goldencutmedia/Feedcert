import {Component, OnInit} from '@angular/core';
import {SampleDataService} from "../../sample/sample-data.service";
import {Sample} from "../../sample/sample";
import {Action} from "../../shared module/action/Action";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-standard-home',
  templateUrl: './standard-home.component.html',
  styleUrls: ['./standard-home.component.scss'],
  standalone: false
})
export class StandardHomeComponent implements OnInit {

  sampleTableColumns: string[] = ['date', 'type', 'description', 'state'];
  samples: Sample[] = [];

  constructor(private sampledataservice: SampleDataService, private dialog: DialogService) {
  }

  ngOnInit() {
    this.sampledataservice.loadSamples([{property: 'state', value: 1}])
      .subscribe(
        (next: any) => {
          // this.samples = next.filter(sample => sample.orientationValue || sample.limitValue) || [];
          this.samples = next || [];
        },
        error => {
          console.log(error);
        },
        () => {
          this.samples.sort((a, b) => (a.reportdate < b.reportdate) ? 1 : -1);
        }
      );
  }

  onSelectChip(sample: Sample) {
    if (sample.state === 1) {
      this.openActionDialog('Festgelegte Maßnahme', true, sample.actions[0]);
    }
  }

  openActionDialog(title: string, readOnly: boolean, formObject: Action) {

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

    this.dialog.showFormDialog(title, formData, formObject).subscribe(
      () => {
      });
  }

  mapState(state: number) {
    return this.sampledataservice.mapState(state);
  }

}
