import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ApiService} from '../services/api.service';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { SidebarComponent } from '../shared module/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) {

  }

  ngOnInit(): void {
    this.api.startPing();
  }

}
