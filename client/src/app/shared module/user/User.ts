import {Company} from "../../company/company-form/company";

export class User {
  username!: string;
  string!: string;
  firstname!: string;
  lastname!: string;
  id!: string;
  company!: Company;
  roles!: [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
