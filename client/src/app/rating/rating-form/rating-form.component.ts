import {Component, OnInit} from '@angular/core';
import {Rating} from '../rating';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.scss'],
  standalone: false
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
