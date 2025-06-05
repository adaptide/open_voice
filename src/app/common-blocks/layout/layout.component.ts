import {Component, HostListener, inject, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Router, RouterLink, RouterOutlet, NavigationEnd} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LanguageService} from "../../services/language.service";
import {NavComponent} from "../nav/nav.component";
import {Subscription, filter} from 'rxjs';

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

export class LayoutComponent implements OnInit, OnDestroy {
  protected readonly availableLanguages = availableLanguages;
  isAuth = false;
  isDropdownOpen = false;
  openDropdown: string | null = null;
  tooltipVisible: boolean = true;
  isMobileMenuOpen = false;
  currentLanguage: string;
  currentUser: any;
  private routerSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
    public languageService: LanguageService
  ) {
    this.currentLanguage = this.languageService.currentLang();
    
    // Подписываемся на изменения маршрута
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Закрываем мобильное меню при переходе на новую страницу
      if (this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  ngOnInit() {
    // Check if user has auth token
    this.isAuth = this.authService['hasToken']();
    if (this.isAuth) {
      // Get user data
      this.authService.user().subscribe(
        (user: any) => {
          this.currentUser = user;
        }
      );
    }
  }

  ngOnDestroy() {
    // Отписываемся от подписки при уничтожении компонента
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll(): void {
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
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
    this.isDropdownOpen = false;
    this.currentLanguage = lang;
    // Перезагрузка текущего маршрута с новым языком
    const currentUrl = this.router.url;
    const newUrl = currentUrl.replace(/^\/[^\/]+/, '/' + lang);
    this.router.navigateByUrl(newUrl);
  }

  @HostListener('document:click', ['$event'])
  closeDropdown() {
    this.openDropdown = null;
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/', this.languageService.currentLang(), 'auth', 'login']);
    });
  }
}
