import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  currentLanguage: any;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }



}
