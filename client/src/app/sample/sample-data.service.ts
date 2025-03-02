import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Sample} from './sample';
import {ApiService} from '../services/api.service';
import {LoginService} from '../login/login.service';
import {Action} from "../shared module/action/Action";
import {Supplier} from "../supplier/supplier-form/supplier";

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {

  samples: Sample[] = [];
  sample!: Sample;
  receivedFilter: EventEmitter<Sample>;

  constructor(
    private api: ApiService,
    private loginservice: LoginService
  ) {
    this.receivedFilter = new EventEmitter<Sample>();
  }

  raiseEvent(sample: Sample): void {
    this.sample = sample;
    this.receivedFilter.emit(sample);
  }

  loadSamples(filters: { property: string, value: any }[] = [], noCompany?: boolean): Observable<Sample[]> {
    const allFilters = this.addCompanyFilter(filters, noCompany);
    return this.api.getEntity('samples', '', allFilters) as Observable<Sample[]>;
  }

  countSamples(filters: { property: string, value: any }[] = []) {
    const allFilters = this.addCompanyFilter(filters);
    return this.api.getCount('samples', allFilters);
  }

  private addCompanyFilter(filters: { property: string; value: any }[], noCompany?: boolean): { property: string; value: any }[] {
    const allFilters: { property: string; value: any }[] = [];
    if (!noCompany) {
      allFilters.push({
        property: 'companyId',
        value: LoginService.getCompanyID()
      });
    }

    if (filters) {
      for (const filter of filters) {
        allFilters.push(filter);
      }
    }
    return allFilters;
  }

  fillSupplierField(supplierField: any): void {
    this.api.getEntity('suppliers')
      .subscribe(
        (next: any) => {
          const suppliers: Supplier[] = next;
          suppliers.sort((l: Supplier, u: Supplier) => {
            return l.name.toLowerCase().localeCompare(u.name.toLowerCase());
          });
          for (const supplier of suppliers) {
            supplierField.options.push({
              label: supplier.name,
              value: supplier.name
            });
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  showHideFields(value: string, formData: { fields: Array<{ name: string, hidden: boolean }> }): void {
    const single: boolean = value === 'single';
    const mix: boolean = value === 'mix';

    const startField: { name: string, hidden: boolean } = formData.fields.find((field: { name: string }) => field.name === 'deliverydatestart')!;
    const endField: { name: string, hidden: boolean } = formData.fields.find((field: { name: string }) => field.name === 'deliverydateend')!;
    startField.hidden = single;
    endField.hidden = single;

    const supplierId: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'supplierId')!;
    const deliverydate: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'deliverydate')!;
    const transportation: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'transportation')!;
    const article: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'article')!;
    const deliveredAs: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'deliveredAs')!;
    const deliveredTo: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'deliveredTo')!;
    const quarantine: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'quarantine')!;
    const silopart: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'silopart')!;
    const partlydelivered: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'partlydelivered')!;
    const singlefeed: { name: string, hidden: boolean } = formData.fields.find(field => field.name === 'singlefeed')!;

    supplierId.hidden = mix;
    deliverydate.hidden = mix;
    transportation.hidden = mix;
    article.hidden = mix;
    deliveredAs.hidden = mix;
    deliveredTo.hidden = mix;
    quarantine.hidden = mix;
    silopart.hidden = mix;
    partlydelivered.hidden = mix;
    singlefeed.hidden = mix;
  }

  mapState(state: number) {
    switch (state) {
      case 0:
        return {
          text: 'in Bearbeitung',
          class: 'in-progress',
          color: 'accent'
        };
        break;
      case 1:
        return {
          text: 'Maßnahme',
          class: 'action-decided',
          color: 'warn'
        };
        break;
      case 2:
        return {
          text: 'Abgeschlossen',
          class: 'completed',
          color: 'primary'
        };
        break;
      default:
        return {
          text: 'fehlerhaft!',
          class: 'error',
          color: 'warn'
        };
    }
  }

  setActionOnSample(selected: Sample, action: Action) {
    return this.api.sendPostRequest('samples/' + selected.id + '/action', {action});
  }
}
