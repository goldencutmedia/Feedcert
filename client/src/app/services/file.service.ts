import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private api: ApiService) {
  }

  addContainer(name: string) {
    return this.api.addEntity('containers',
      {
        id: name,
        name
      });
  }

  deleteContainer(name: string) {
    return this.api.deleteEntity('containers',
      {
        id: name,
        name
      });
  }
}
