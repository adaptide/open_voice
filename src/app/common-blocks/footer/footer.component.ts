import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  currentLanguage: any;

  constructor(public translateService: TranslateService, private router: Router) {
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }
}
