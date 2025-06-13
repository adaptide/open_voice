import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../common-blocks/footer/footer.component";
import {StatisticsService} from '../../services/statistics.service';
import {OrganizationFormComponent} from '../../common-blocks/organization-form/organization-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    FooterComponent,
    OrganizationFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  currentLanguage: any;
  statistics: any = {
    recordings: '10,000+',
    participants: '1,000+',
    hours: '500+',
    organizations: '50+'
  };

  constructor(private translateService: TranslateService, private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
    this.statisticsService.getStatistics().subscribe(
      (data: any) => {
        this.statistics = {
          recordings: this.formatNumber(data.recordings),
          participants: this.formatNumber(data.participants),
          hours: this.formatNumber(data.hours),
          organizations: this.formatNumber(data.organizations)
        };
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }

  private formatNumber(num: number): string {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}K+`;
    }
    return `${num}+`;
  }
}
