import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {DIALOG_TYPE, DialogService} from './dialog.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private dialog: DialogService
  ) {
  }

  API_URL = environment.apiUrl;
  BACKEND_URL = environment.backendUrl;

  static getFileUrl(container: string, file: string) {
    if (!file || file === '') {
      return '';
    }
    return '/containers/' + container + '/download/' + file;
  }

  private getUrl(url: string) {
    return this.API_URL + '/' + url;
  }

  addEntity(url: string, entity: any) {
    return this.httpClient.post(this.getUrl(url), entity);
  }

  getEntity(url: string, id?: string, filters?: { property: string, value: string }[]) {
    return this.httpClient.get(this.getIdFilterUrl(url, filters || [], id));
  }

  modifyEntity(url: string, entity: any) {
    return this.httpClient.patch(this.getUrl(url + '/' + entity.id), entity);
  }

  deleteEntity(url: string, entity: any) {
    return this.httpClient.delete(this.getUrl(url + '/' + entity.id), entity);
  }

  getCount(url: string, filters?: { property: string, value: any }[]) {
    return this.httpClient.get(this.getCountUrl(url + '/count', filters || []));
  }

  uploadFile(formData: FormData, containerID: string) {
    // create a http-post request and pass the form
    // tell it to report the upload progress
    const url = this.API_URL + '/containers/upload';
    const req: HttpRequest<FormData> = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });

    // send the http-request and subscribe for progress-updates
    return this.httpClient.request(req);
  }

  public startPing() {
    this.sendPingRequest();
  }

  private sendPingRequest() {
    this.sendGetRequest('ping').subscribe(
      next => {

      },
      error => {
        this.dialog.showDialog(DIALOG_TYPE.MESSAGE, 'Der Server scheint nicht erreichbar zu sein. Bitte wenden Sie sich an den Administrator!');
      },
      () => {
        setTimeout(this.sendPingRequest.bind(this), 1000 * 30);
      }
    )
  }

  private getIdFilterUrl(url: string, filters: { property: string; value: string }[], id?: string) {
    let fullUrl = this.getUrl(url);
    if (id) {
      fullUrl += '/' + id;
    }
    if (filters) {
      let idx = 0;
      for (const filter of filters) {
        const concatinator = idx === 0 ? '?' : '&';
        fullUrl += concatinator + 'filter[where][and][' + idx + '][' + filter.property + ']=' + filter.value;
        idx++;
      }
    }
    return fullUrl;
  }

  private getCountUrl(url: string, filters: { property: string; value: string }[], id?: string) {
    let fullUrl = this.getUrl(url);
    if (id) {
      fullUrl += '/' + id;
    }
    if (filters) {
      let idx = 0;
      for (const filter of filters) {
        const concatinator = idx === 0 ? '?' : '&';
        fullUrl += concatinator + 'where[' + filter.property + ']=' + filter.value;
        idx++;
      }
    }
    return fullUrl;
  }

  public sendBackendRequest(subroute: string, data: {}, options?: {}) {
    return this.sendPostRequest(this.BACKEND_URL + '/' + subroute, data, options);
  }

  public sendPostRequest(subroute: string, data: {}, options?: {}) {
    if (!subroute) {
      subroute = '';
    }
    return this.httpClient.post(this.API_URL + '/' + subroute + '/', data);
  }

  public sendGetRequest(subroute: string, data?: {}, options?: {}) {
    if (!subroute) {
      subroute = '';
    }
    return this.httpClient.get(this.API_URL + '/' + subroute + '/', data);
  }
}
