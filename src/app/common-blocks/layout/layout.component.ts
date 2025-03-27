import {Component, HostListener, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LanguageService} from "../../services/language.service";
import {NavComponent} from "../nav/nav.component";

const availableLanguages = [
  { code: 'kk', label: 'Қазақша' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' }
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent implements OnInit{

  protected readonly availableLanguages = availableLanguages;
  isAuth = false;
  isDropdownOpen = false;
  openDropdown: string | null = null;
  tooltipVisible: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  languageService = inject(LanguageService);
  currentUser: any;
  currentLanguage: any;

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;

    this.authService.authStatus$.subscribe((status) => {
      this.isAuth = status;

      if (this.isAuth) {
        this.authService.user().subscribe((data) => {
          this.currentUser = data;
          console.log(this.currentUser);
        });
      } else {
        this.currentUser = null;
      }
    });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleNavDropdown(dropdown: string, event: Event) {
    event.stopPropagation();
    this.openDropdown = this.openDropdown === dropdown ? null : dropdown;
  }

  switchLanguage(lang: string, event: Event) {
    event.stopPropagation();
    this.languageService.changeLanguage(lang);

    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/');
    urlSegments[1] = lang;
    this.router.navigate(urlSegments);

    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown() {
    this.openDropdown = null;
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/kk/auth/login']);
    });
  }
}
