import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {OrganizationService} from "../../services/organization.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-show-organization',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './show-organization.component.html',
  styleUrl: './show-organization.component.scss'
})
export class ShowOrganizationComponent implements OnInit {

  constructor(private authService: AuthService, private organizationService: OrganizationService, private route: ActivatedRoute) {
  }

  organizationId!: number;
  currentUser: any;
  projects: any[] = [];
  filteredProjects: any[] = [];
  searchQuery: string = '';
  loadingMap: { [key: number]: boolean } = {};

  ngOnInit() {
    this.authService.user().subscribe(auth => {
      this.currentUser = auth;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.organizationId = +id;
        console.log(this.organizationId);
        this.getOrganizationProjects(this.organizationId);
      }
    });
  }

  getOrganizationProjects(id: number) {
    this.organizationService.getOrganizationProjects(id).subscribe((projects: any) => {
      this.projects = projects;
      this.filteredProjects = projects;
    });
  }

  onSearchChange() {
    this.filteredProjects = this.projects.filter(project =>
      project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  downloadProjectRecords(id: number, name: string) {
    this.loadingMap[id] = true;

    const parsedName = name.replace(/\s+/g, '_').toLowerCase();
    this.organizationService.downloadProjectRecords(id).subscribe({
      next: (response) => {
        const fileName = `${parsedName}.zip`;
        saveAs(response, fileName);
        this.loadingMap[id] = false;
      },
      error: () => {
        this.loadingMap[id] = false;
      }
    });
  }

}
