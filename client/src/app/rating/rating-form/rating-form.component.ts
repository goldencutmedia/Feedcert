import {Component, OnInit} from '@angular/core';
import {Rating} from '../rating';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import { BaseFormComponent } from '../../shared module/base-form/base-form.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-rating-form',
    templateUrl: './rating-form.component.html',
    styleUrls: ['./rating-form.component.scss'],
    imports: [MatGridList, MatGridTile, MatCard, BaseFormComponent, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatTooltip, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class RatingFormComponent implements OnInit {
  formData = {
    fields: [
      {
        name: 'defect',
        label: 'Mangel',
        span: 4
      },
      {
        type: 'number',
        name: 'points',
        label: 'Punkte',
        span: 2
      },
      {
        type: 'textarea',
        name: 'description',
        label: 'Beschreibung Mangel',
        lines: 4,
        span: 6
      },
      {
        type: 'checkbox',
        name: 'taskforceMessage',
        label: 'Meldung an Taskforce',
        span: 6
      },
      {
        type: 'checkbox',
        name: 'companyMessage',
        label: 'Meldung an alle Mitglieder',
        span: 6
      },
      {
        type: 'checkbox',
        name: 'governmentMessage',
        label: 'Meldung an Behörden',
        span: 6
      },
      {
        type: 'checkbox',
        name: 'lockSupplier',
        label: 'Sperrung des Lieferanten',
        span: 6
      },
    ]
  };
  rating: Rating = new Rating();
  ratings: Rating[] = [];
  ratingColumns = ['position', 'defect', 'description', 'points', 'actions'];

  constructor(private router: Router,
              private api: ApiService) {
  }

  ngOnInit() {
    this.loadRatings();
  }

  private loadRatings() {
    this.api.getEntity('ratings')
      .subscribe(
        (next) => {
          this.ratings = next as Rating[];
        },
        error => {
          console.log(error);
        },
        () => {
        }
      );
  }

  addRating() {
    this.api.addEntity('ratings/', this.rating)
      .subscribe(
        (next) => {

        },
        error => {
          alert('POST call error:/n' + error);
        },
        () => {
          this.loadRatings();
        }
      );
  }

  onClickDelete(element: any) {
    this.api.deleteEntity('ratings', element).subscribe(
      () => {
      },
      error => {
      },
      () => {
        this.loadRatings();
      }
    );
  }
}
