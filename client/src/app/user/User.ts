import {Company} from '../company/company-form/company';

export class User {
  username: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  id: string = '';
  company!: Company;
  roles!: string[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
