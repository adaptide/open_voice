import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class WriteService {

  constructor(private api: ApiService) { }

  getCategories() {
    return this.api.get('/categories');
  }

  submit(data: any) {
    return this.api.post('/sentences', data);
  }
}
