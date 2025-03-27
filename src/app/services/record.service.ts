import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {environment} from "../enviroments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private api: ApiService, private http: HttpClient) { }

  private readonly apiBase = environment.apiUrl;

  getRandomText() {
    return this.api.get('/sentences?count=25');
  }

  getRandomRecord() {
    return this.api.get("/clips");
  }

  sendRecord(data: any) {
    console.log('Sending recording:', data);
    return this.http.post(`${this.apiBase}/recordings`, data);
  }

  sendEvaluation(recordId: any, data: any) {
    console.log('Sending evaluation:', data);
    return this.http.post(`${this.apiBase}/recordings/${recordId}/reviews`, data);
  }
}
