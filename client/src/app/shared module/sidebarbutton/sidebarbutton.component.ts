import {Component, Input, OnInit} from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { MatListItem } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';

@Component({
    selector: 'app-sidebarbutton',
    templateUrl: './sidebarbutton.component.html',
    styleUrls: ['./sidebarbutton.component.scss'],
    imports: [MatListItem, RouterLink, MatTooltip, MatIcon, NgClass, ExtendedModule, NgIf]
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
