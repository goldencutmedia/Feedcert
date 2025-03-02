import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-company-view',
    templateUrl: './company-view.component.html',
    styleUrls: ['./company-view.component.scss'],
    imports: [RouterOutlet]
})
export class CompanyViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
