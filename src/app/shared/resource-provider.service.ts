import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * ResourceProviderService Class
 * Service class to provide static data to be used by API request
 */
export class ResourceProviderService {

  private apiURL = 'http://ec2-3-216-2-8.compute-1.amazonaws.com:3000/';
  private clientKey = '';
  private clientSecret = '';

  private userAgent = '';
  private grantType = 'password';
  private grantTypeRefreshToken = 'refresh_token';

  constructor() {
  }

  /**
   * get _url
   */
  get url(): string {
    return this.apiURL;
  }

  /**
   * get _client_key;
   */
  get client_key(): string {
    return this.clientKey;
  }

  /**
   * get _client_secret
   */
  get client_secret(): string {
    return this.clientSecret;
  }

  /**
   * get _user_agent
   */
  get user_agent(): string {
    return this.userAgent;
  }

  /**
   * get _grant_type
   */
  get grant_type(): string {
    return this.grantType;
  }

  /**
   * get _grant_type_refresh_token
   */
  get grant_type_refresh_token(): string {
    return this.grantTypeRefreshToken;
  }
}

