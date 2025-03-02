import {Component, OnInit} from '@angular/core';
import {Supplier} from '../supplier-form/supplier';
import {ApiService} from '../../services/api.service';
import {DIALOG_TYPE, DialogService} from '../../services/dialog.service';
import {FileService} from '../../services/file.service';
import {COMPANY_FORM_DATA} from '../supplier-form/supplier-form-data';
import {SnackbarService} from '../../services/snackbar.service';
import {Observable} from 'rxjs';
import {LoginService} from '../../login/login.service';
import {Rating} from '../../rating/rating';

@Component({
  selector: 'app-supplier-overview',
  templateUrl: './supplier-overview.component.html',
  styleUrls: ['./supplier-overview.component.scss'],
  standalone: false
})
export class SupplierOverviewComponent implements OnInit {
  suppliers!: Supplier[];
  selected!: Supplier;
  formData = COMPANY_FORM_DATA;
  isAdministrator!: Observable<boolean>;
  isTaskforce!: Observable<boolean>;

  constructor(private api: ApiService,
              private file: FileService,
              private dialog: DialogService,
              private loginservice: LoginService,
              private snackbar: SnackbarService) {
    // const formData = {
    //   fields: [],
    //   buttons: []
    // };
    //
    // Object.assign(formData, COMPANY_FORM_DATA);
    // for (const field of formData.fields) {
    //   field.readOnly = true;
    // }
    // this.formData = formData;
  }

  ngOnInit() {
    this.isAdministrator = this.loginservice.isAdministrator;
    this.isTaskforce = this.loginservice.isTaskforce;

    this.suppliers = [];
    this.loadSuppliers();
  }

  private loadSuppliers() {
    this.api.getEntity('suppliers')
      .subscribe(
        (next: any) => {
          this.suppliers = next;
        },
        error => {
          console.log(error);
        },
        () => {
          this.selected = new Supplier();
          // this.suppliers.sort((l, u) => {
          //   return l.name.toLowerCase().localeCompare(u.name.toLowerCase());
          // });
          this.suppliers.sort((a, b) => {
            return Number(a.rating) > Number(b.rating) ? -1 : 1;
          });
        }
      );
  }

  onSelect(supplier: Supplier) {
    this.selected = supplier;
  }

  addSupplier() {
    this.api.modifyEntity('suppliers', this.selected)
      .subscribe(
        () => {
        },
        error => {
          console.log(error);
        },
        () => {
          this.snackbar.openSnackBar('Lieferant wurde gespeichert.');
        }
      );
  }

  deleteSupplier() {
    const message = this.selected.name + ' wirklich löschen?';
    this.dialog.showDialog(DIALOG_TYPE.CONFIRMATION, message).subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.api.deleteEntity('suppliers', this.selected)
          .subscribe(
            () => {
            },
            error => {
              console.log(error);
            },
            () => {
              this.loadSuppliers();
              this.snackbar.openSnackBar('Lieferant wurde gelöscht.');
            }
          );
        this.file.deleteContainer(this.selected.number).subscribe();
      }
    });
  }

  newRating() {
    class FormObject {
      id: string = '';
    }

    const formObject = new FormObject();
    let ratings: Rating[];

    const options: { value: string, label: string }[] = [];

    this.api.getEntity('ratings')
      .subscribe(
        (next: any) => {
          ratings = next;
          for (const rating of ratings) {
            options.push({
              label: rating.defect + ' | ' + rating.points,
              value: rating.position
            });
          }
        },
        error => {
          console.log(error);
        },
        () => {
        }
      );

    const formData = {
      fields: [
        {
          type: 'select',
          name: 'id',
          label: 'Maßnahme',
          lines: 4,
          span: 6,
          options
        }
      ]
    };

    this.dialog.showFormDialog('Bewertung auswählen', formData, formObject).subscribe(result => {
      if (result) {
        const rating = ratings.find(field => field.position === formObject.id);
        if (rating) {
          const points = Number(this.selected.rating) + Number(rating.points);
          this.selected.rating = '' + points;
          this.addSupplier();
        }
      }
    });
  }

  mapState(rating: number) {
    switch (true) {
      case (rating > 50):
        return {
          color: 'primary'
        };
        break;
      case (rating > 20):
        return {
          color: 'accent'
        };
        break;
      case (rating <= 20):
        return {
          color: 'warn'
        };
        break;
      default:
        return {
          color: 'warn'
        };
    }
  }
}
