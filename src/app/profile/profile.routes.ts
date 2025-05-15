import { Routes } from '@angular/router';
import {InfoComponent} from "./info/info.component";
import {SettingsComponent} from "./settings/settings.component";
import {ProfileComponent} from "./profile.component";
import {DownloadComponent} from "./download/download.component";
import {DeleteProfileComponent} from "./delete-profile/delete-profile.component";

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: InfoComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'download', component: DownloadComponent },
      { path: 'delete', component: DeleteProfileComponent },
    ],
  },
];
