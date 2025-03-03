import {Action} from "../shared module/action/Action";

export class Sample {
  id!: string;
  reportdate!: string;
  description!: string;
  type!: string;
  number!: string;
  amount!: number;
  article!: string;
  transportation!: string;
  deliverydate!: string;
  deliverydatestart!: string;
  deliverydateend!: string;
  supplierId!: number;
  user!: string;
  state!: number;
  quarantine!: boolean;
  silopart!: boolean;
  partlydelivered!: boolean;
  singlefeed!: boolean;
  deliveredAs!: string;
  deliveredTo!: string;
  companyId!: string;
  company!: any;
  documentIds!: string[];
  actions!: Action[];
  gvo!: number;
  substances!: {
    substancename: string,
    substancevalue: string
  }[];

  constructor(values?: {}) {
    Object.assign(this, values);
  }
}
