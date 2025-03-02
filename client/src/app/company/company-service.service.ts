import {Injectable} from '@angular/core';
import {ApiService} from "../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private api: ApiService) {
  }

  sendMail(id: number) {
    this.api.sendPostRequest('companies/sendmail', {id}).subscribe(
      result => {
        console.log(result);
      }
    );
  }
}
