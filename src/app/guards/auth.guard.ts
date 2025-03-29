import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const translateService = inject(TranslateService);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');

    if (token) {
      router.navigate(['/' + translateService.currentLang]);
      return false;
    }
  }

  return true;
};
