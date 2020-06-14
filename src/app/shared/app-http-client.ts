import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ResourceProviderService} from './resource-provider.service';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

export function appHttpClientCreator(http: HttpClient, resource: ResourceProviderService) {
  return new AppHttpClient(http, resource);
}

@Injectable({
  providedIn: 'root'
})

/**
 * AppHttpClient Class
 * Custom request class extending HttpClient class
 *
 * Custom request class is used to modify request data and append
 * other parameters like Authorization headers, etc
 */
export class AppHttpClient {

  private apiUrl = this.resource.url;

  // Extending the HttpClient through the Angular DI.
  constructor(
    public http: HttpClient,
    private resource: ResourceProviderService
  ) {
    // If you don't want to use the extended versions in some case you can access
    // the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param endPoint it doesn't need / in front of the end point
   * @param options options of the request like headers, body, etc.
   *
   */
  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.apiUrl + endPoint, options);
  }

  /**
   * POST request
   * @param endPoint end point of the api
   * @param params body of the request
   * @param options options of the request like headers, body, etc
   *
   */
  public Post<T>(endPoint: string, params: object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(this.apiUrl + endPoint, params, options);
      // .pipe(
      //   catchError(this.handleError('post', endPoint, null))
      // );
  }

  /**
   * PUT request
   * @param endPoint end point of the api
   * @param params body of the request
   * @param options options of the request like headers, body, etc.
   *
   */
  public Put<T>(endPoint: string, params: object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(this.apiUrl + endPoint, params, options);
  }

  /**
   * Patch request
   * @param endPoint end point of the api
   * @param params body of the request
   * @param options options of the request like headers, body, etc.
   *
   */
  public Patch<T>(endPoint: string, params: object, options?: IRequestOptions): Observable<T> {
    return this.http.patch<T>(this.apiUrl + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param endPoint end point of the api
   * @param options options of the request like headers, body, etc.
   *
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(this.apiUrl + endPoint, options);
  }

  private handleError<T>(operation = 'operation', endpoint = '', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(error.message);
      console.log(operation);
      console.log(endpoint);

      return of(result as T);
    };
  }
}
