import {Component, OnInit} from '@angular/core';
import {COMPANY_FORM_DATA} from "./supplier-form-data";
import {Supplier} from "./supplier";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss'],
  standalone: false
})
export class SupplierFormComponent implements OnInit {

  supplier = new Supplier();
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

  addSupplier() {
    this.api.addEntity('suppliers/', this.supplier)
      .subscribe(
        (supplier: any) => {
          this.file.addContainer(supplier.id).subscribe(
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
          this.router.navigate(['/suppliers']);
        }
      );
  }

  cancel() {
    this.router.navigate(['/suppliers']);
  }
}
