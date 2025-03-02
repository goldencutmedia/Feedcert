import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-taskforce-home',
    templateUrl: './taskforce-home.component.html',
    styleUrls: ['./taskforce-home.component.scss'],
    imports: [MatGridList, MatGridTile, MatCard, MatCardHeader, MatCardTitle, MatCardContent]
})
export class TaskforceHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
