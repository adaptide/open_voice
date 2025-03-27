import {Component, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import {filter} from "rxjs";
import {LanguageService} from "./services/language.service";
import {LayoutComponent} from "./common-blocks/layout/layout.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, LayoutComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private languageService = inject(LanguageService);

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const lang = this.route.snapshot.firstChild?.paramMap.get('lang') || 'kk';
      this.languageService.changeLanguage(lang);
    });
  }
}
