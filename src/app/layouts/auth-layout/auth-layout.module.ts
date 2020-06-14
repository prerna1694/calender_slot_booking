import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthLayoutRoutes} from './auth-layout.routing';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthModule} from '../../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
    AuthModule
  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ]
})
export class AuthLayoutModule { }
