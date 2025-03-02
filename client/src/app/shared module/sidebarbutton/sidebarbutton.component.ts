import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebarbutton',
  templateUrl: './sidebarbutton.component.html',
  styleUrls: ['./sidebarbutton.component.scss'],
  standalone: false
})
export class SidebarbuttonComponent implements OnInit {

  @Input() text: string = '';
  @Input() link: string = '';
  @Input() menu: string = '';
  @Input() iconCls: string = '';
  @Input() addIcon: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
