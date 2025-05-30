import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {FooterComponent} from "../common-blocks/footer/footer.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  currentLang: string = 'kk';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currentLang = params['lang'] || 'kk';
    });
  }
}
