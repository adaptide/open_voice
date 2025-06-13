import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, OrganizationFormComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  currentLanguage: string;

  constructor(private translateService: TranslateService) {
    this.currentLanguage = this.translateService.currentLang;
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }
}
