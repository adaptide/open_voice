import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FooterComponent} from "../../common-blocks/footer/footer.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import { RouterLink } from '@angular/router';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgForOf,
    TranslatePipe,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{
  currentLanguage: any;
  statistics: any = {
    recordings: '50+',
    participants: '10K+',
    hours: '500+',
    open: '100%'
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
          open: '100%' // This is a fixed value
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
