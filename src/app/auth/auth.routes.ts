import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "../guards/auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
];
