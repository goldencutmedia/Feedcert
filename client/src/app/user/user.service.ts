import {Injectable} from '@angular/core';
import {ApiService} from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) {
  }
}
