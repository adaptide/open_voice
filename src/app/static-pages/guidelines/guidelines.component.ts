import {Component, OnInit} from '@angular/core';
import {VoicesCollectionComponent} from "./voices-collection/voices-collection.component";
import {PhrasesCollectionComponent} from "./phrases-collection/phrases-collection.component";
import {NgIf} from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../common-blocks/footer/footer.component";

@Component({
  selector: 'app-guidelines',
  standalone: true,
  imports: [
    VoicesCollectionComponent,
    PhrasesCollectionComponent,
    NgIf,
    TranslatePipe,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './guidelines.component.html',
  styleUrl: './guidelines.component.scss'
})
export class GuidelinesComponent implements OnInit {
  activeTab: string = 'voices';

  constructor(private translateService: TranslateService) {
  }

  currentLanguage: any;

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }
}
