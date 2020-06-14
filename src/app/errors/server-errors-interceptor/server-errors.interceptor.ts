import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {ErrorsService} from '../errors-service/errors.service';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {Injectable} from '@angular/core';

/**
 * ServiceErrorsInterceptor implementing HttpInterceptor
 * @class
 *
 * This class meant to intercept the error and retry up to specified number of attempts
 * before throwing any error that will be handled further by Error handler and Error Services
 */
@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  constructor() {}

  /**
   * Intercept function.
   * If call fails, retry for 5 times before throwing any error
   * @param request {HttpRequest} - HttpRequest object to handle the request
   * @param next {HttpHandler} - HttpHandler object
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(0)      // Set how many times to retry if request fails
    );
  }
}
