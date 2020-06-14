import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FileUploadModule} from 'ng2-file-upload';
import {ImageCropperModule} from 'ng2-img-cropper';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from './components/components.module';
import {PageLayoutModule} from './layouts/page-layout/page-layout.module';
import {ErrorsModule} from './errors/errors.module';
import {ToastrModule} from 'ngx-toastr';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ComponentsModule,
    PageLayoutModule,
    ErrorsModule,
    FileUploadModule,
    ImageCropperModule,
    ToastrModule.forRoot({
      // timeOut: 80000,
      closeButton: true,
      enableHtml: true,
      positionClass: 'toast-' + 'top' + '-' +  'right',
    }),
    MultiSelectModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
