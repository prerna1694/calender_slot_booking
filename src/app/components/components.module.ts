import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

// tslint:disable-next-line:max-line-length
import { AdminSidebarComponent, AuthNavbarComponent, FooterComponent, NavbarComponent, NotificationService, SidebarComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AuthNavbarComponent,
    AdminSidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AuthNavbarComponent,
    AdminSidebarComponent,
  ],
  providers: [
    NotificationService
  ]
})
export class ComponentsModule { }
