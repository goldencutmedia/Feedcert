import {Component, OnInit} from '@angular/core';
import {SampleDataService} from "../../sample/sample-data.service";
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    imports: [MatList, MatListItem, MatDivider]
})
export class SummaryComponent implements OnInit {
  samplesTotal!: number;
  samplesStep0!: number;
  samplesStep1!: number;

  constructor(private sampledataservice: SampleDataService) {
  }

  ngOnInit() {
    this.sampledataservice.countSamples().subscribe(
      (next: any) => {
        this.samplesTotal = next.count || 0;
      }
    );
    this.sampledataservice.countSamples([{property: 'state', value: 0}])
      .subscribe(
        (next: any) => {
          this.samplesStep0 = next.count || 0;
        }
      );
    this.sampledataservice.countSamples([{property: 'state', value: 1}])
      .subscribe(
        (next: any) => {
          this.samplesStep1 = next.count || 0;
        }
      );
  }

}
