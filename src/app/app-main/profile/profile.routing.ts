import {Routes} from '@angular/router';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

export const profileRoutes: Routes = [
  { path: 'updateprofile', component: UpdateProfileComponent },
  { path: 'resetpassword', component: ResetPasswordComponent }
];
