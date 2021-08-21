import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpParams,
  HttpHeaders,
} from "@angular/common/http";
import {
  Observable,
  throwError as observableThrowError,
  BehaviorSubject,
} from "rxjs";
import { EncryptionService } from "./encryption.service";
import { take, filter, catchError, switchMap } from "rxjs/operators";
import { AuthService } from "./../_services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private encrypt: EncryptionService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const localStorage_token = localStorage.getItem("token");
    const localStorage_companyID = localStorage.getItem("companyID");
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${token.token}`,
    //   },
    // });
    
    // return next.handle(request);
    if (localStorage_token && localStorage_companyID) {
      const token = JSON.parse(
        this.encrypt.decryptionAES(localStorage.getItem("token"))
      );
      const companyID = JSON.parse(
        this.encrypt.decryptionAES(localStorage.getItem("companyID"))
      );
      return next
        .handle(this.addToken(request, token.access_token, companyID))
        .pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse) {
              switch ((<HttpErrorResponse>error).status) {
                case 500:
                  return this.handleError(error);
                case 401:
                  return this.handle401Error(request, next);
                case 403:
                  return this.handle401Error(request, next);
                default:
                  return observableThrowError(error);
              }
            } else {
              return this.handleError(error);
            }
          })
        );
    }
    return;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          const tokenList = this.encrypt.encryptionAES(JSON.stringify(token));
          localStorage.setItem("token", tokenList);
          const companyID = JSON.parse(
            this.encrypt.decryptionAES(localStorage.getItem("companyID"))
          );
          this.isRefreshingToken = false;
          this.tokenSubject.next(token.access_token);

          return next.handle(
            this.addToken(request, token.access_token, companyID)
          );
        })
      );
    } else {
      const companyID = JSON.parse(
        this.encrypt.decryptionAES(localStorage.getItem("companyID"))
      );
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt, companyID));
        })
      );
    }
  }

  private addToken(
    request: HttpRequest<any>,
    token: string,
    companyID: string
  ) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        packagename: "web-smart-clinic",
        companyid: `${companyID}`,
        // packagename: "com.fintechinno.tablet24hosManagement",
        // companyid: "KDMS01",
      },
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      return observableThrowError("Unauthorized!");
    } else {
      return observableThrowError(error);
    }
  }
}
