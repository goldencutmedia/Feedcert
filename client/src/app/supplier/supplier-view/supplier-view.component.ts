import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-supplier-view',
    templateUrl: './supplier-view.component.html',
    styleUrls: ['./supplier-view.component.scss'],
    imports: [RouterOutlet]
})
export class SupplierViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
