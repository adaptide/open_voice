import {Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  languageService = inject(LanguageService)
}
