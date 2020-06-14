import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ErrorsComponent } from './errors/errors-component/errors.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { PageNotFoundComponent } from './layouts/page-layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthLayoutComponent, children: [
      { path: '', loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule' }
    ]
  },
  { path: 'error', component: ErrorsComponent },
  {
    path: 'owner/dashboard', component: AdminLayoutComponent, children: [
      { path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule' }
    ],
    
  },
  
  
  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: '', component: PageLayoutComponent, children: [
      { path: '', loadChildren: './layouts/page-layout/page-layout.module#PageLayoutModule' }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
