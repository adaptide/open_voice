import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');

    if (token) {
      router.navigate(['/kk/speak']);
      return false;
    }
  }

  return true;
};
