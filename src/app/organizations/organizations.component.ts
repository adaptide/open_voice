import {Component, OnInit} from '@angular/core';
import {OrganizationService} from "../services/organization.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {RouterLink} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export class OrganizationsComponent implements OnInit {

  constructor(private organizationService: OrganizationService, private authService: AuthService, private translateService: TranslateService) {
  }

  isAuth = false;

  organizations: any[] = [];
  filteredOrganizations: any[] = [];
  searchQuery: string = '';
  currentUser: any;
  currentLanguage: any;


  ngOnInit() {
    this.authService.authStatus$.subscribe((status) => {
      this.isAuth = status;

      if (this.isAuth) {
        this.authService.user().subscribe((data) => {
          this.currentUser = data;
        });
      } else {
        this.currentUser = null;
      }
    });

    this.currentLanguage = this.translateService.currentLang;

    this.organizationService.getOrganizationList().subscribe((data: any) => {
      this.organizations = data;
      this.filteredOrganizations = data;
    });
  }

  onSearchChange() {
    this.filteredOrganizations = this.organizations.filter(org =>
      org.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}
