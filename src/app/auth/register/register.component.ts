import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private translateService: TranslateService) {
  }

  currentLanguage: any;

  passwordMatchValidator: ValidatorFn = (group: AbstractControl) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  form = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password_confirmation: new FormControl('', [Validators.required]),
    },
    this.passwordMatchValidator
  );

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe((data) => {
        console.log(data);
      });
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }
}
