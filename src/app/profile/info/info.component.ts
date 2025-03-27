import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  isImportanceOpen = false;
  isChangeHelpOpen = false;
  isAccentHelpOpen = false;

  accent = new FormControl('');
  accents: string[] = [];
  newAccent: string = '';
  languageForms: FormGroup[] = [];

  isAuth: any;
  currentUser: any;

  constructor(private authService: AuthService) {
    this.addLanguageForm();
  }

  ngOnInit() {
    this.authService.authStatus$.subscribe((status) => {
      this.isAuth = status;
    });

    this.authService.user().subscribe((data) => {
      this.currentUser = data;
    });
  }

  addLanguageForm(): void {
    if (this.canAddLanguage()) {
      this.languageForms.push(
        new FormGroup({
          language: new FormControl(''),
          accent: new FormControl(''),
          accents: new FormControl([])
        })
      );
    }
  }

  canAddLanguage(): boolean {
    if (this.languageForms.length === 0) return true;
    return this.languageForms[this.languageForms.length - 1].get('language')?.value.trim() !== '';
  }

  updateButtonState(): void {}


  onAccentInputChange(event: Event): void {
    this.newAccent = (event.target as HTMLInputElement).value
  }

  addNewAccent(index: number): void {
    const form = this.languageForms[index];
    const accentsControl = form.get('accents');
    const accentInputControl: any = form.get('accent');

    if (accentInputControl?.value.trim() !== '') {
      const currentAccents: string[] = accentsControl?.value || [];
      accentsControl?.setValue([...currentAccents, accentInputControl.value]);

      console.log(`Форма ${index} - акценты:`, accentsControl?.value);

      accentInputControl.setValue('');
    }
  }

  removeAccent(accent: string, index: number): void {
    const accentsControl = this.languageForms[index].get('accents');
    const currentAccents = accentsControl?.value || [];

    const updatedAccents = currentAccents.filter((a: string) => a !== accent);
    accentsControl?.setValue(updatedAccents);
  }
}
