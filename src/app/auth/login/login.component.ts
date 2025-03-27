import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService) {
  }

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  currentLanguage: any;

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }

  onSubmit() {
    if(this.form.valid) {
      this.authService.login(this.form.value).subscribe((response: any) => {
        this.router.navigate(['/kk/speak']);
      },
        (error) => {
          console.error("Ошибка авторизации:", error);
        }
      );
    }
  }

}
