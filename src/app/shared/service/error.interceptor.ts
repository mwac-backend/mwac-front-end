import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            showConfirmButton:false,
            title: 'Session Expired!',
            timer: 1500
          })
          this.authenticationService.onLogout();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
