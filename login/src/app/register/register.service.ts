import {Injectable} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';
import {UrlService} from '../services/url.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private api: ApiService,
    private router: Router
  ) {
  }

  register(username: string, password: string, companyId?: string) {

    return this.api.sendBackendRequest('register',
      {
        username,
        password,
        companyId
      }
    ).subscribe(
      response => {
        this.router.navigate(['/']);
      },
      error => {
        return error;
      }
    );
  }

  getCompany() {
    const params = UrlService.getAllUrlParams(decodeURI(window.location.hash));
    // @ts-ignore
    return params.c;
  }
}
