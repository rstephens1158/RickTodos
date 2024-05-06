import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  AuthService,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  PopupConfigOptions, PopupLoginOptions, RedirectLoginOptions
} from '@auth0/auth0-angular';
import { Observable, of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowserOnlyAuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {}

  // Proxy for isAuthenticated$
  get isAuthenticated$(): Observable<boolean> {
    return isPlatformBrowser(this.platformId) ? this.authService.isAuthenticated$ : of(false);
  }

  // Proxy for user$
  get user$(): Observable<any> {
    return isPlatformBrowser(this.platformId) ? this.authService.user$ : of(null);
  }

  // Proxy for idTokenClaims$
  get idTokenClaims$(): Observable<any> {
    return isPlatformBrowser(this.platformId) ? this.authService.idTokenClaims$ : of(null);
  }

  // Proxy for error$
  get error$(): Observable<Error> {
    return isPlatformBrowser(this.platformId) ? this.authService.error$ : EMPTY;
  }

  // Proxy for appState$
  get appState$(): Observable<any> {
    return isPlatformBrowser(this.platformId) ? this.authService.appState$ : of(null);
  }

  // Proxy for loginWithRedirect
  loginWithRedirect(options?: RedirectLoginOptions<any>): Observable<void> {
    return isPlatformBrowser(this.platformId) ? this.authService.loginWithRedirect(options) : EMPTY;
  }

  // Proxy for loginWithPopup
  loginWithPopup(options?: PopupLoginOptions, config?: PopupConfigOptions): Observable<void> {
    return isPlatformBrowser(this.platformId) ? this.authService.loginWithPopup(options, config) : EMPTY;
  }

  // Proxy for logout
  logout(options?: LogoutOptions): Observable<void> {
    return isPlatformBrowser(this.platformId) ? this.authService.logout(options) : EMPTY;
  }

  // Proxy for getAccessTokenSilently
  getAccessTokenSilently(options?: GetTokenSilentlyOptions & {
    detailedResponse: true;
  }): Observable<any> {
    return isPlatformBrowser(this.platformId) ? this.authService.getAccessTokenSilently(options) : of(null);
  }



  // Simplified getAccessTokenSilently without detailedResponse
  getAccessTokenSilentlySimple(options?: GetTokenSilentlyOptions): Observable<string> {
    return isPlatformBrowser(this.platformId) ? this.authService.getAccessTokenSilently(options) : of('');
  }

  // Proxy for getAccessTokenWithPopup
  getAccessTokenWithPopup(options?: GetTokenWithPopupOptions): Observable<string | undefined> {
    return isPlatformBrowser(this.platformId) ? this.authService.getAccessTokenWithPopup(options) : of(undefined);
  }

  // Proxy for handleRedirectCallback
  handleRedirectCallback(url?: string): Observable<any> {
    return isPlatformBrowser(this.platformId) ? this.authService.handleRedirectCallback(url) : of(null);
  }
}
