import {Component, OnInit} from '@angular/core';
import {OrganizationService} from "../services/organization.service";

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export class OrganizationsComponent implements OnInit {

  constructor(private organizationService: OrganizationService) {
  }

  organizations: any;


  ngOnInit() {
    this.organizationService.getOrganizationList().subscribe((data: any) => {
      this.organizations = data;
    });
  }

}
