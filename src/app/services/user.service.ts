import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  downloadUserRecords() {
    return this.api.getBlob(`/user/download/clips`);
  }
}
