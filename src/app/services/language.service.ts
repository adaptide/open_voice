import { Injectable, Signal, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  currentLang = signal('kk');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') || 'kk';
      this.currentLang.set(savedLang);
      this.translate.use(savedLang);
    }
  }

  changeLanguage(lang: string) {
    this.currentLang.set(lang);
    this.translate.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }

  getLanguageFieldOf(name: any, object: any) {
    let locale = this.getLocale();
    locale = locale[0].toUpperCase() + locale.slice(1);

    const fieldName = name + locale;

    return object && object.hasOwnProperty(fieldName) ? object[fieldName] : '';
  }

  getLocale() {
    return this.translate.currentLang;
  }
}
