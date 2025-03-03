import {Component, OnInit} from '@angular/core';
import {Company} from '../company-form/company';
import {ApiService} from '../../services/api.service';
import {DIALOG_TYPE, DialogService} from '../../services/dialog.service';
import {FileService} from '../../services/file.service';
import {COMPANY_FORM_DATA} from '../company-form/company-form-data';
import {CompanyService} from '../company-service.service';
import {SnackbarService} from '../../services/snackbar.service';
import {Observable} from 'rxjs';
import {LoginService} from '../../login/login.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatLine } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { BaseFormComponent } from '../../shared module/base-form/base-form.component';

@Component({
    selector: 'app-company-overview',
    templateUrl: './company-overview.component.html',
    styleUrls: ['./company-overview.component.scss'],
    imports: [MatGridList, MatGridTile, MatCard, MatCardContent, FlexModule, MatList, NgFor, MatListItem, NgClass, ExtendedModule, MatLine, MatDivider, NgIf, BaseFormComponent]
})
export class CompanyOverviewComponent implements OnInit {
  companies: Company[] = [];
  selected: Company | undefined;
  formData = COMPANY_FORM_DATA;
  isAdministrator!: Observable<boolean>;
  formReadOnly: boolean = false;
  admin: boolean = false;

  constructor(private api: ApiService,
              private file: FileService,
              private dialog: DialogService,
              private companyservice: CompanyService,
              private loginservice: LoginService,
              private snackbar: SnackbarService) {
  }

  ngOnInit() {
    this.isAdministrator = this.loginservice.isAdministrator;

    this.companies = [];
    this.loadCompanies();

    this.isAdministrator.subscribe(
      (next) => {
        this.admin = next;
      }
    );
  }

  private loadCompanies() {
    this.api.getEntity('companies')
      .subscribe(
        (next) => {
          this.companies = next as Company[];
        },
        error => {
          console.log(error);
        },
        () => {
          this.selected = undefined;
          this.companies.sort((l, u) => {
            return l.name.toLowerCase().localeCompare(u.name.toLowerCase());
          });
        }
      );
  }

  onSelect(company: Company) {
    this.selected = company;
    this.formReadOnly = !(this.admin || this.selected.id === LoginService.getCompanyID());
  }

  addCompany() {
    this.api.modifyEntity('companies', this.selected)
      .subscribe(
        () => {
        },
        error => {
          console.log(error);
        },
        () => {
          this.snackbar.openSnackBar('Goete Partner wurde gespeichert.');
        }
      );
  }

  deleteCompany() {
    if (!this.selected || !this.dialog) {
      return;
    }
    const message = this.selected.name ? this.selected.name + ' wirklich löschen?' : 'Goete Partner wirklich löschen?';
    this.dialog.showDialog(DIALOG_TYPE.CONFIRMATION, message)?.subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.api.deleteEntity('companies', this.selected)
          .subscribe(
            () => {
            },
            error => {
              console.log(error);
            },
            () => {
              this.loadCompanies();
              this.snackbar.openSnackBar('Goete Partner wurde gelöscht.');
            }
          );
        if (this.selected) {
          this.file.deleteContainer(this.selected.number).subscribe();
        }
      }
    });
  }

  sendRegisterMail() {
    const message = this.selected ? 'Registrierungsmail an ' + this.selected.email + ' wirklich senden?' : 'Registrierungsmail wirklich senden?';
    this.dialog.showDialog(DIALOG_TYPE.CONFIRMATION, message)?.subscribe(result => {
      if (result) {
        if (this.selected && this.selected.id) {
          this.companyservice.sendMail(Number(this.selected.id));
        }
      }
    });
  }
}
