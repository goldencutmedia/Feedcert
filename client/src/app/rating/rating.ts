export class Rating {
  id: string = '';
  position: string = '';
  defect: string = '';
  description: string = '';
  points: string = '';
  taskforceMessage: boolean = false;
  companyMessage: boolean = false;
  governmentMessage: boolean = false;
  lockSupplier: boolean = false;


  constructor(values?: {}) {
    Object.assign(this, values);
  }
}
