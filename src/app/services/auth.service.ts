import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { ApiService } from './api.service';
import {BehaviorSubject, tap} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatus.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object, private api: ApiService) {
    if (isPlatformBrowser(this.platformId)) {
      this.authStatus.next(this.hasToken());
    }
  }

  private hasToken(): boolean {
    return isPlatformBrowser(this.platformId) ? !!localStorage.getItem('authToken') : false;
  }

  login(data: any) {
    return this.api.post('/login', data).pipe(
      tap((response: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
        }
        this.authStatus.next(true);
      })
    );
  }

  register(data: any) {
    return this.api.post('/register', data);
  }

  logout() {
    return this.api.post('/logout').pipe(
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('authToken');
        }
        this.authStatus.next(false);
      })
    );
  }

  user() {
    return this.api.get('/user');
  }
}
