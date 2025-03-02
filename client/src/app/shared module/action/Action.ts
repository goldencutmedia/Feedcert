export class Action {
  description: string = '';
  state: number = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
