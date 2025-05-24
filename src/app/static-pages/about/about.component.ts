import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FooterComponent} from "../../common-blocks/footer/footer.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import { RouterLink } from '@angular/router';

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

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }

}
