import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {publish, refCount} from 'rxjs/operators';

/**
 * NotificationObjects interface
 * message {String} - Message describing the error.
 * title {String} - Short Title of the error like, Authentication Failed, HTTP Error, etc
 * type {String} - Message type. Eg., error, success, info, warning
 */
export interface NotificationObjects {
  message: string;
  title?: string;
  type?: string;
}

/**
 * NotificationService class.
 * Responsible for displaying various messages to the user.
 * Handles notification services created from other components which is further
 * handled by app.component to display the message to the user.
 */
@Injectable()
export class NotificationService {
  /**
   * BehaviourSubject that registers the message to be displayed on next call.
   * The values set are available for one time only.
   */
  private notification: BehaviorSubject<NotificationObjects> = new BehaviorSubject<NotificationObjects>({
    message: null,
    title: null,
    type: null
  });

  /**
   * Readonly observable of BehaviourSubject object
   */
  readonly notification$: Observable<NotificationObjects> = this.notification.asObservable().pipe(
    publish(),
    refCount()
  );

  /**
   * Constructor of NotificationService
   */
  constructor() {}

  /**
   * Call this function with all the parameters of NotificationObjects.
   * This function can be used to assign all types of messages manually like
   * error, success, info, warning
   * @param message {NotificationObjects} - Message with body and title and type of message
   */
  notify(message: NotificationObjects) {
    this.notification.next(message);
  }

  /**
   * Call this function to generate a notification of info type.
   * Passing message.type is optional, it will default set notification type to info.
   * If any other type is passed to this function, this will override the notification type.
   */
  info(message: NotificationObjects) {
    message.type = 'info';
    this.notification.next(message);
  }

  /**
   * Call this function to generate a notification of error type.
   * Passing message.type is optional, it will default set notification type to error.
   * If any other type is passed to this function, this will override the notification type.
   */
  error(message: NotificationObjects) {
    message.type = 'error';
    this.notification.next(message);
  }

  /**
   * Call this function to generate a notification of success type.
   * Passing message.type is optional, it will default set notification type to success.
   * If any other type is passed to this function, this will override the notification type.
   */
  success(message: NotificationObjects) {
    message.type = 'success';
    this.notification.next(message);
  }

  /**
   * Call this function to generate a notification of warning type.
   * Passing message.type is optional, it will default set notification type to warning.
   * If any other type is passed to this function, this will override the notification type.
   */
  warning(message: NotificationObjects) {
    message.type = 'warning';
    this.notification.next(message);
  }
}
