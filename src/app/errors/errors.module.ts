import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorsHandler} from './errors-handler/errors-handler';
import {ErrorsService} from './errors-service/errors.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServerErrorsInterceptor} from './server-errors-interceptor/server-errors.interceptor';
import { ErrorsComponent } from './errors-component/errors.component';
import {RouterModule} from '@angular/router';
import {RollbarErrorHandlerService, rollbarFactory, RollbarService} from './rollbar-error-handler.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ErrorsComponent],
  providers: [
    ErrorsService,
    // RollbarErrorHandlerService,
    // {
    //   provide: ErrorHandler,
    //   useClass: ErrorsHandler
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    // {
    //   provide: RollbarService,
    //   useFactory: rollbarFactory
    // }
  ]
})
export class ErrorsModule { }
