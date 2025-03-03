import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DIALOG_TYPE, DialogService} from '../../services/dialog.service';
import {USER_FORM_DATA} from './user-form-data';
import {User} from '../User';
import {SnackbarService} from '../../services/snackbar.service';
import {Router} from '@angular/router';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { FlexModule, ExtendedModule } from '@angular/flex-layout';
import { MatAnchor } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatLine } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatList, MatListItem } from '@angular/material/list';
import { BaseFormComponent } from 'src/app/shared module/base-form/base-form.component';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
  imports: [NgIf, MatAnchor, MatGridList, MatGridTile, MatCard, MatCardContent, FlexModule, MatList, NgFor, MatListItem, NgClass, ExtendedModule, MatLine, MatChip, MatDivider, BaseFormComponent, AsyncPipe]
})

export class UserOverviewComponent implements OnInit {
  users!: Object;
  selected?: User;
  formData = USER_FORM_DATA;


  constructor(private api: ApiService, private dialog: DialogService, private snackbar: SnackbarService, private router: Router) {
    this.formData = USER_FORM_DATA;
  }

  ngOnInit() {
    this.users = [];
    this.loadUsers();
  }

  private loadUsers() {
    this.api.getEntity('users')
      .subscribe(
        (next) => {
          this.users = next;
          console.log(next);
        },
        error => {
          console.log(error);
        },
        () => {
          this.selected = undefined;
        }
      );
  }

  onSelect(user: User) {
    this.selected = user;
  }

  addUser() {
    this.api.modifyEntity('users', this.selected)
      .subscribe(
        () => {
        },
        error => {
          console.log(error);
        },
        () => {
          this.snackbar.openSnackBar('Benutzer wurde gespeichert.');
        }
      );
  }

  deleteUser() {
    const message = this.selected? this.selected.username + ' wirklich löschen?' : 'Benutzer wirklich löschen?';
    const showDialog = this.dialog.showDialog(DIALOG_TYPE.CONFIRMATION, message) || null;
    if(showDialog) {
      showDialog.subscribe(result => {
        if (result) {
          console.log('Yes clicked');
          this.api.deleteEntity('users', this.selected)
            .subscribe(
              () => {
              },
              error => {
                console.log(error);
              },
              () => {
                this.snackbar.openSnackBar('Benutzer wurde gelöscht.');
                this.loadUsers();
              }
            );
        }
      });
    }
  }

  newUser() {
    class FormObject {
      id: string = '';
    }

    const formObject = new FormObject();

    const options: { value: string, label: string }[] = [];

    this.api.getEntity('companies')
          .subscribe(
        (next: any) => {
          for (const company of next) {
            options.push({
              label: company.name,
              value: company.id
            });
          }
          options.sort((l, u) => {
            return l.label.toLowerCase().localeCompare(u.label.toLowerCase());
          });
        },
        error => {
          console.log(error);
        }
      );

    const formData = {
      fields: [
        {
          type: 'select',
          name: 'id',
          label: 'Benutzer anlegen für',
          lines: 4,
          span: 6,
          options
        }
      ]
    };

    this.dialog.showFormDialog('Unternehmen auswählen', formData, formObject).subscribe(result => {
      if (result) {
        window.location.href = `/register?c=${formObject.id}`;
      }
    });
  }
}
