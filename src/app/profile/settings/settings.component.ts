import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  isAuth: any;
  currentUser: any;

  ngOnInit() {
    this.authService.authStatus$.subscribe((status) => {
      this.isAuth = status;
    });

    this.authService.user().subscribe((data) => {
      this.currentUser = data;
    });
  }
}
