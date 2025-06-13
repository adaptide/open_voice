import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrganizationService } from '../../services/organization.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-organization-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <input 
          formControlName="name" 
          type="text" 
          [placeholder]="'ORGANIZATION.FORM.NAME_PLACEHOLDER' | translate"
          class="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B1AFF]"
        >
        <div *ngIf="form.get('name')?.touched && form.get('name')?.errors?.['required']" class="text-red-500 text-sm">
          {{ 'ORGANIZATION.FORM.NAME_REQUIRED' | translate }}
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <input 
          formControlName="email" 
          type="email" 
          [placeholder]="'ORGANIZATION.FORM.EMAIL_PLACEHOLDER' | translate"
          class="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B1AFF]"
        >
        <div *ngIf="form.get('email')?.touched && form.get('email')?.errors?.['required']" class="text-red-500 text-sm">
          {{ 'ORGANIZATION.FORM.EMAIL_REQUIRED' | translate }}
        </div>
        <div *ngIf="form.get('email')?.touched && form.get('email')?.errors?.['email']" class="text-red-500 text-sm">
          {{ 'ORGANIZATION.FORM.EMAIL_INVALID' | translate }}
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <textarea 
          formControlName="description" 
          [placeholder]="'ORGANIZATION.FORM.DESCRIPTION_PLACEHOLDER' | translate"
          class="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B1AFF] min-h-[100px]"
        ></textarea>
        <div *ngIf="form.get('description')?.touched && form.get('description')?.errors?.['required']" class="text-red-500 text-sm">
          {{ 'ORGANIZATION.FORM.DESCRIPTION_REQUIRED' | translate }}
        </div>
      </div>

      <button 
        type="submit" 
        [disabled]="form.invalid || isSubmitting"
        class="py-2 px-6 sm:px-8 border border-black font-[600] rounded-[30px] w-fit text-[14px] sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ (isSubmitting ? 'ORGANIZATION.FORM.SUBMITTING' : 'ORGANIZATION.FORM.SUBMIT') | translate }}
      </button>

      <div *ngIf="submitSuccess" class="text-green-500 text-sm">
        {{ 'ORGANIZATION.FORM.SUCCESS' | translate }}
      </div>
      <div *ngIf="submitError" class="text-red-500 text-sm">
        {{ submitError }}
      </div>
    </form>
  `
})
export class OrganizationFormComponent {
  form: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      this.submitSuccess = false;

      this.organizationService.submitOrganization(this.form.value).subscribe({
        next: () => {
          this.submitSuccess = true;
          this.form.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitError = error.error?.message || 'ORGANIZATION.FORM.ERROR';
          this.isSubmitting = false;
        }
      });
    }
  }
} 