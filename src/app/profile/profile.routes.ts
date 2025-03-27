import { Routes } from '@angular/router';
import {InfoComponent} from "./info/info.component";
import {SettingsComponent} from "./settings/settings.component";
import {ProfileComponent} from "./profile.component";

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: InfoComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];
