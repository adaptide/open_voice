import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private translateService: TranslateService) {
  }

  currentLanguage: any;

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl('')
  });

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }

  onSubmit() {
    if(this.form.valid) {
      this.authService.register(this.form.value).subscribe((data) => {
        console.log(data);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
