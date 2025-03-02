import {Component, OnInit, ViewChild} from '@angular/core';
import {COMPANY_FORM_DATA} from './company-form-data';
import {Company} from './company';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {FileService} from '../../services/file.service';
import { MatAnchor } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent } from '@angular/material/card';
import { BaseFormComponent } from '../../shared module/base-form/base-form.component';
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
    styleUrls: ['./company-form.component.scss'],
    imports: [MatAnchor, MatGridList, MatGridTile, MatCard, BaseFormComponent, MatCardContent, FlexModule]
})
export class CompanyFormComponent implements OnInit {

  @ViewChild('file') fileInput: any;
  records: any[] = [];

  company = new Company();
  formData = COMPANY_FORM_DATA;

  constructor(private router: Router, private api: ApiService, private file: FileService) {
    // const formData = {
    //   fields: [],
    //   buttons: []
    // };
    //
    // Object.assign(formData, COMPANY_FORM_DATA);
    // for (const field of formData.fields) {
    //   field.readOnly = false;
    // }
    // this.formData = formData;
  }

  ngOnInit() {
  }

  addCompany(company?: Company) {
    this.api.addEntity('companies/', company || this.company)
      .subscribe(
        (companyResult: any) => {
          this.file.addContainer(companyResult.id).subscribe(
            next => {
            },
            error => {
              console.log('ERROR', error);
            },
          );
        },
        error => {
          console.log('ERROR', error);
        },
        () => {
          this.router.navigate(['/companies']);
        }
      );
  }

  writeCompanies() {
    this.api.getCount('companies').subscribe(
      (next: any) => {
        let tempNumber = next.count + 1;
        for (const company of this.records) {
          if (company.name && company.name !== '') {
            company.tempNumber = tempNumber;
            tempNumber++;
            this.addCompany(company);
          }
        }
      }
    );
  }

  cancel() {
    this.router.navigate(['/companies']);
  }

  csvImportClicked() {
    this.fileInput.nativeElement.click();
  }

  csvImport(event: any): void {
    const text = [];
    const files = event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.writeCompanies();
      };

      reader.onerror = () => {
        alert('Fehler beim Lesen der Datei!');
        this.fileReset();
      };

    } else {
      alert('Bitte eine gültige csv-Datei importieren!');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const currentRecord = (csvRecordsArray[i]).split(';');
      if (currentRecord.length === headerLength) {
        const csvRecord: Company = new Company();
        csvRecord.name = currentRecord[0] && currentRecord[0].trim();
        csvRecord.person = (currentRecord[1] && currentRecord[1].trim()) + ' ' + (currentRecord[2] && currentRecord[2].trim());
        csvRecord.street = currentRecord[3] && currentRecord[3].trim();
        csvRecord.countrycode = currentRecord[4] && currentRecord[4].trim();
        csvRecord.postalcode = currentRecord[5] && currentRecord[5].trim();
        csvRecord.city = currentRecord[6] && currentRecord[6].trim();
        csvRecord.phone = currentRecord[7] && currentRecord[7].trim();
        csvRecord.fax = currentRecord[8] && currentRecord[8].trim();
        csvRecord.email = currentRecord[9] && currentRecord[9].trim();
        csvRecord.web = currentRecord[10] && currentRecord[10].trim();
        csvRecord.traderegisternumber = currentRecord[11] && currentRecord[11].trim();
        csvRecord.registercourt = currentRecord[12] && currentRecord[12].trim();
        csvRecord.bioControlFacility = currentRecord[13] && currentRecord[13].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(';');
    const headerArray = [];
    for (const header of headers) {
      headerArray.push(header);
    }
    return headerArray;
  }

  fileReset() {
    this.fileInput.nativeElement.value = '';
    this.records = [];
  }
}
