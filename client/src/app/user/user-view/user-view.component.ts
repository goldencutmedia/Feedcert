import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss'],
    imports: [RouterOutlet]
})
export class UserViewComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
