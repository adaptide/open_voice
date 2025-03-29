import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private translateService: TranslateService) {
  }

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
  );

  currentLanguage: any;

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }

  onSubmit() {
    if(this.form.valid) {
      this.authService.login(this.form.value).subscribe((response: any) => {
        this.router.navigate(['/' + this.currentLanguage]);
      },
        (error) => {
          console.error("Ошибка авторизации:", error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }

}
