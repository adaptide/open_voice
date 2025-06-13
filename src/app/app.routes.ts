import { Routes } from '@angular/router';
import { HomeComponent } from './static-pages/home/home.component';
import { AboutComponent } from './static-pages/about/about.component';
import { GuidelinesComponent } from './static-pages/guidelines/guidelines.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationFormPageComponent } from './static-pages/organization-form/organization-form.component';
import { ShowOrganizationComponent } from './organizations/show-organization/show-organization.component';
import { ListenComponent } from './listen/listen.component';
import { WriteComponent } from './write/write.component';
import { SpeakComponent } from "./speak/speak.component";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { PrivacyComponent } from "./static-pages/privacy/privacy.component";
import { TermsComponent } from "./static-pages/terms/terms.component";

export const routes: Routes = [
  { path: '', redirectTo: '/kk', pathMatch: 'full' },
  {
    path: ':lang',
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'guidelines', component: GuidelinesComponent },
      { path: 'policy', component: PrivacyComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
      { path: 'speak', component: SpeakComponent },
      { path: 'organizations/add', component: OrganizationFormPageComponent },
      { path: 'organizations/:id', component: ShowOrganizationComponent },
      { path: 'organizations', component: OrganizationsComponent },
      { path: 'listen', component: ListenComponent },
      { path: 'write', component: WriteComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

