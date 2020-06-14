import { Routes } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
  { path: '', loadChildren: '../../app-main/admin/admin.module#AdminModule'},
  { path: 'profile', loadChildren: '../../app-main/profile/profile.module#ProfileModule'},
];
