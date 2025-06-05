import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { FooterComponent } from "../common-blocks/footer/footer.component";
import { LanguageService } from '../services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TranslatePipe,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentLang: string;

  constructor(private route: ActivatedRoute, private languageService: LanguageService) {
    this.route.params.subscribe(params => {
      this.currentLang = params['lang'] || 'kk';
    });
    this.currentLang = this.languageService.currentLang();
  }

  ngOnInit() {
  }
}
