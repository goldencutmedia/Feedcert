export class Company {
  id: string = '';
  name: string = '';
  person: string = '';
  countrycode: string = '';
  street: string = '';
  postalcode: string = '';
  city: string = '';
  phone: string = '';
  fax: string = '';
  email: string = '';
  web: string = '';
  traderegisternumber: string = '';
  registercourt: string = '';

  number: string = '';
  tempNumber: number = 0;

  bioControlFacility: string = '';
  firstAudit: Date = new Date();
  certification: Date = new Date();
  nextAudit: Date = new Date();
  control: Date = new Date();

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
