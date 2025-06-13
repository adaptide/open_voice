import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrganizationService } from '../../services/organization.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-organization-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
  template: `
    <div class="px-4 sm:px-8 md:px-20 lg:px-40 py-6 sm:py-10">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-[24px] sm:text-[36px] font-[500] mb-4">{{ 'ORGANIZATION.FORM.TITLE' | translate }}</h1>
          <p class="text-[16px] sm:text-[18px] text-gray-600">{{ 'ORGANIZATION.FORM.DESCRIPTION' | translate }}</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-white rounded-2xl shadow-sm p-8">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700">{{ 'ORGANIZATION.FORM.NAME_LABEL' | translate }}</label>
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
              <label class="text-sm font-medium text-gray-700">{{ 'ORGANIZATION.FORM.EMAIL_LABEL' | translate }}</label>
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
              <label class="text-sm font-medium text-gray-700">{{ 'ORGANIZATION.FORM.PHONE_LABEL' | translate }}</label>
              <input 
                formControlName="phone" 
                type="tel" 
                [placeholder]="'ORGANIZATION.FORM.PHONE_PLACEHOLDER' | translate"
                class="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B1AFF]"
              >
              <div *ngIf="form.get('phone')?.touched && form.get('phone')?.errors?.['required']" class="text-red-500 text-sm">
                {{ 'ORGANIZATION.FORM.PHONE_REQUIRED' | translate }}
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700">{{ 'ORGANIZATION.FORM.DESCRIPTION_LABEL' | translate }}</label>
              <textarea 
                formControlName="description" 
                [placeholder]="'ORGANIZATION.FORM.DESCRIPTION_PLACEHOLDER' | translate"
                class="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B1AFF] min-h-[150px]"
              ></textarea>
              <div *ngIf="form.get('description')?.touched && form.get('description')?.errors?.['required']" class="text-red-500 text-sm">
                {{ 'ORGANIZATION.FORM.DESCRIPTION_REQUIRED' | translate }}
              </div>
            </div>

            <div class="flex justify-end">
              <button 
                type="submit" 
                [disabled]="form.invalid || isSubmitting"
                class="py-2 px-6 sm:px-8 border border-black font-[600] rounded-[30px] w-fit text-[14px] sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ (isSubmitting ? 'ORGANIZATION.FORM.SUBMITTING' : 'ORGANIZATION.FORM.SUBMIT') | translate }}
              </button>
            </div>

            <div *ngIf="submitSuccess" class="text-green-500 text-sm text-center">
              {{ 'ORGANIZATION.FORM.SUCCESS' | translate }}
            </div>
            <div *ngIf="submitError" class="text-red-500 text-sm text-center">
              {{ submitError }}
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class OrganizationFormPageComponent {
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
      phone: ['', Validators.required]
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