import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private api: ApiService) { }

  getOrganizationList(){
    return this.api.get('/organizations');
  }

  getOrganizationProjects(id: any){
    return this.api.get(`/organizations/${id}/projects`);
  }

  downloadProjectRecords(id: any) {
    return this.api.getBlob(`/projects/download-as-zip/${id}`);
  }

  submitOrganization(data: { name: string; email: string; description: string }) {
    return this.api.post('/organizations/submit', data);
  }
}
