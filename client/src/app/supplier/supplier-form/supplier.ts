export class Supplier {
  id: string = '';
  name: string = '';
  person: string = '';
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
  bioControlFacility: string = '';
  gopluszertified: boolean = false;
  rating: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
