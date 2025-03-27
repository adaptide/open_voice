import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../common-blocks/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    FooterComponent
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
