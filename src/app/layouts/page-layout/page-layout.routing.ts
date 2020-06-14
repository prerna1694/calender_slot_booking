import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TermsComponent} from './terms/terms.component';
import {PrivacyComponent} from './privacy/privacy.component';

export const PageRoutes: Routes = [
  { path: '', component: PageNotFoundComponent },
  { path: 'terms', component: TermsComponent},
  { path: 'privacy', component: PrivacyComponent}
];
