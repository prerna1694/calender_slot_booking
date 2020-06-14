import {Injectable, InjectionToken, Injector} from '@angular/core';
import * as Rollbar from 'rollbar';

/**
 * Rollback API configurations
 * Logging Dashboard: https://rollbar.com/anujsharma9196/koober-angular
 * Application: koober-angular
 * Login using: Google
 *
 * For more info visit: https://rollbar.com
 */
const rollbarConfig = {
  accessToken: '8892aeb670594ee2b613b176ade541ee',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

/**
 * Rollbar Error handler class to log error to the rollbar logging server
 * @class
 */
@Injectable()
export class RollbarErrorHandlerService {

  /**
   * Constructor of RollbarErrorHandlerService class
   * @constructor
   * @param injector {Injector} - Inject services using Injector get() function
   */
  constructor(
    private injector: Injector
  ) {}

  /**
   * Post the error to the rollbar logging server
   * @param error
   */
  post(error) {
    // Inject RollbarService
    const rollbar = this.injector.get(RollbarService);
    // send error to the logging server
    // rollbar.error(error);
  }
}

/**
 * Rollback factory to create factory provider and initialize rollbar API credentials
 */
export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

/**
 * Create RollbarService to inject in the class and
 * send error to the logging server using error() function
 */
export const RollbarService = new InjectionToken<Rollbar>('rollbar');
