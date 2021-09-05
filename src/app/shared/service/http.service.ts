import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpWithoutInterceptor: HttpClient;

  getHeader() {
    const headerSettings: any = {};
    return new HttpHeaders(headerSettings);
  }

  constructor(
    private http: HttpClient, private httpBackend: HttpBackend) {
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }


  get(url: string, params: any) {
    const token_head = this.getHeader();
    return this.http.get<any>(url, {params: params, headers: token_head}).pipe(catchError(HttpService.handleError));
  }


  post(url: string, body: any) {
    const token_head = this.getHeader();
    return this.http.post<any>(url, body, {headers: token_head}).pipe(catchError(HttpService.handleError));
  }

  put(url: string,body: FormData | any,) {
    const token_head = this.getHeader();
    return this.http.put<any>(url, body, {headers: token_head,}).pipe(catchError(HttpService.handleError));
  }

  delete(url: string, params: any) {
    const token_head = this.getHeader();
    return this.http.delete<any>(url, {params: params, headers: token_head}).pipe(catchError(HttpService.handleError));
  }

  get_no_token(url: string, params: any) {
    const token_head = this.getHeader();
    return this.httpWithoutInterceptor.get<any>(url, {
      params: params,
      headers: token_head
    }).pipe(catchError(HttpService.handleError));
  }

  post_no_token(url: string, body: any) {
    const token_head = this.getHeader();
    return this.httpWithoutInterceptor.post<any>(url, body, {headers: token_head}).pipe(catchError(HttpService.handleError));
  }


  private static handleError(error: HttpErrorResponse) {
    return throwError(error);
  }


}
