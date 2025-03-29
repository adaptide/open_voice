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

  sendRecord(data: any) {
    console.log('Sending recording:', data);
    return this.http.post(`${this.apiBase}/sentences`, data);
  }

  skipSpeakText(id: any) {
    return this.api.post(`/sentences/${id}/skipped`);
  }

  sendSpeakReport(id: any, data: any) {
    return this.http.post(`${this.apiBase}/sentences/${id}/reports`, data);
  }

  getRandomRecord() {
    return this.api.get("/clips");
  }

  sendEvaluation(recordId: any, data: any) {
    return this.http.post(`${this.apiBase}/clips/${recordId}/reviews`, data);
  }

  sendListenReport(id: any, data: any) {
    return this.http.post(`${this.apiBase}/clips/${id}/reports`, data);
  }

  skipListenText(id: any) {
    return this.api.post(`/clips/${id}/skipped`);
  }
}
