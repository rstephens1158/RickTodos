import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BrowserOnlyAuthService } from "./browser-only-auth-service.service";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private authService: BrowserOnlyAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          console.error('401 error detected, initiating login redirect.');
          this.authService.loginWithRedirect();
        }
        return throwError(() => error);
      })
    );
  }
}
