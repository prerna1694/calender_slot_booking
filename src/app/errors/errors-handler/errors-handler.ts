import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../../components/notification-service/notification.service';
import {Router} from '@angular/router';
import {ErrorsService} from '../errors-service/errors.service';

/**
 * Format json error object in string
 * @param error
 */
function formatToString(error: any) {
  let message_string = '';

  // Iterate over json object
  for (const key in error) {
    // If key is the own property of error
    if (error.hasOwnProperty(key)) {
      // Append key to the message_string
      message_string += key + ': ';
      // console.log('error[key]', error[key]);
      // If value is of array type
      if (error[key] instanceof Array) {
        // Iterate over the array value
        for (const error_message in error[key]) {
          if (error[key].hasOwnProperty(error_message)) {
            // console.log('error_message', );
            // If error_message is not blank
            if (error_message !== '') {
              // Append error message with key passed to error[key]
              message_string += error[key][error_message] + ' ';
            }
          }
        }
      } else {
        // If is not array, append the value
        message_string += error[key] + ' ';
      }

      // append new line for adding next key
      message_string += '<br>';
    }
  }

  return message_string;
}

/**
 * ErrorsHandler class implements ErrorHandler interface
 * This is meant for handling all type of errors occurring in the application.
 * The proper action is taken depending on the type of error occurred.
 * The actions involves logging of error as well as notifying the user
 * about the error with proper error message.
 * Also redirect user to the required path in case of authentication and other errors
 * @class
 */
@Injectable()
export class ErrorsHandler implements ErrorHandler {

  /**
   * Constructor of ErrorsHandler
   * @param injector - Because the ErrorsHandler is created before the providers, we'll have to use the Injector to get them.
   */
  constructor(
    private injector: Injector
  ) {}

  /**
   * Handle the error thrown by the application
   * and take appropriate action depending on the type of error
   * @param error {Error | HttpErrorResponse} - The error object thrown in case of error
   */
  handleError(error: Error | HttpErrorResponse) {

    /**
     * @param notificationService {NotificationService} - Triggers the notification of different type
     */
    const notificationService = this.injector.get(NotificationService);

    /**
     * @param errorsService {ErrorsService} - Handles the logging of error
     */
    const errorsService = this.injector.get(ErrorsService);

    /**
     * @param router {Router} - Handles the redirection to respected paths depending on error type
     */
    const router = this.injector.get(Router);

    /**
     * If error is of HttpErrorResponse instance,
     * it is HTTP Error (Server or connection error), may caused by
     * 1. Network disconnected - Application is in offline mode
     * 2. HTTP Error Response other than 200 - Ex. 404, 403, etc
     */
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        // Handle offline error
        return notificationService.error({
          message: 'No internet connection',
          title: 'Connection Error'
        });
      } else {
        // Handle HTTP Error
        console.log('Http Error occurred');
        // Send the error to the server
        // console.log('bypassing _subscribe error');
        // errorsService.log(error).subscribe(errorWithContextInfo => {
        //   // bypass _subscribe not defined error, bypassed by removing subscribe
        // });
        errorsService.log(error);

        /**
         * User not authenticated, redirect to login page
         */
        if (error.status === 403 || error.status === 401) {
          router.navigate(['/auth/logout']).then();
        }

        let message = '';
        if (error.status === 400) {
          if (error.error !== null) {
            message = formatToString(error.error);
          }
        } else if (error.status === 404) {
          // resource not available
          message = 'Requested resource does not exists';
        } else {
          // handle other type of errors
          message = `${error.status} - ${error.message}`;
        }

        return notificationService.error({
          message: `${message}`,
          title: 'HTTP Error',
        });
      }
    } else {
      // Client Error Happened
      // Send the error to the server and then
      // redirect the user to the page with all the info
      console.log('Not HttpError occurred');

      /**
       * Uncommenting below snippets to remove this._subscribe is not a function.
       * This function was meant to redirect user to the error page in case of any error is occurred.
       * As of now we are going to show a error message and do not redirect user to the error page.
       *
       * In case, it is required to redirect user to the login page, uncomment below code snippets
       */
      errorsService.log(error);
      // errorsService.log(error).subscribe(errorWithContextInfo => {
      //   router.navigate(['/error'], {queryParams: errorWithContextInfo});
      // });
    }

    // Log the error in console
    console.log('It happens: ', error);
  }
}
