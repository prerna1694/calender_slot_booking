import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageLayoutComponent } from './page-layout.component';
import {RouterModule} from '@angular/router';
import {PageRoutes} from './page-layout.routing';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageRoutes)
  ],
  declarations: [
    PageNotFoundComponent,
    PageLayoutComponent,
    TermsComponent,
    PrivacyComponent,
  ]
})
export class PageLayoutModule { }
