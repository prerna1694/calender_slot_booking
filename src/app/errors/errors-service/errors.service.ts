import {Injectable, Injector} from '@angular/core';
import {Event, NavigationError, Router} from '@angular/router';
import {ResourceProviderService} from '../../shared/resource-provider.service';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';

import * as StackTraceParser from 'error-stack-parser';
import {Observable} from 'rxjs';
import {RollbarErrorHandlerService} from '../rollbar-error-handler.service';

/**
 * ErrorsService is used to log the errors and report to
 * rollbar service using RollbarErrorHandlerService
 * @class
 */
@Injectable()
export class ErrorsService {

  /**
   * Constructor of ErrorsService
   *
   * @constructor
   * @param injector {Injector} - To inject services using injector get() function
   * @param router {Router} - To navigation to error pages
   * @param resourceProvider {ResourceProviderService} - Provides static resources like OAuth2 Credentials, endpoints, etc.
   * @param rollbarService {RollbarErrorHandlerService} - Rollbar error handling service to log error on server
   */
  constructor(
    private injector: Injector,
    private router: Router,
    private resourceProvider: ResourceProviderService,
    private rollbarService: RollbarErrorHandlerService
  ) {

    /**
     * Subscribe to the NavigationError
     */
    this.router
      .events
      .subscribe((event: Event) => {
        if (event instanceof NavigationError) {
          /**
           * Redirect to the ErrorComponent with error parameters in query
           */
          this.log(event.error)
            .subscribe((errorWithContext) => {
              this.router.navigate(['/error'], { queryParams: errorWithContext });
            });
        }
      });
  }

  /**
   * Log the error.
   * Add context info to the error before sending to the logging server.
   * After adding the context info to the error,
   * sent to the rollbar server and return with error with context
   * @param error - Error object
   */
  log(error) {
    // Log the error to the console
    // console.log('error service', error);
    // Send error to server
    const errorToSend = this.addContextInfo(error);
    // Send error log to the logging server
    this.rollbarService.post(error);

    // This function only returns the error with context to the calling function
    // This function can be removed if of no use.
    // In case of removal, replace with return statement from FakeHttpService class
    return FakeHttpService.post(errorToSend);
  }

  /**
   * Add context information to the error
   * Context added are
   *
   * name - Error name or null
   * appId - Client key of the application. Can be used to match which application error has occurred from backend
   * user - Logged in user id or null if anonymous user
   * time - Time of the occurring of the error
   * id - A unique id given to the error log. Generated with combination of appId, user id and time
   * location - Location of the error where error has occurred
   * url - URL which caused the error
   * status - Status code of the error or null if no status code
   * message - Message of the error describing what type or what error it is
   * server_response - Response from the server if any or null
   * stack - Stack of the calling flow till the error point
   * @param error - Error object
   */
  addContextInfo(error) {
    // You can include context details here (usually coming from other services: UserService...)
    const name = error.name || null;
    const appId = this.resourceProvider.client_key;
    const user = 'fakeuser';
    const time = new Date().getTime();
    const id = `${appId}-${user}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    const server_response = error.error || null;
    const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);

    return {name, appId, user, time, id, location, url, status, message, server_response, stack};
  }
}

/**
 * FakeHttpService called from log() function.
 * It can be deleted if is of no use.
 * Also remove calling function from log() function if case of removal of this class
 */
class FakeHttpService {
  static post(error): Observable<any> {
    return Observable.create(error);
  }
}
