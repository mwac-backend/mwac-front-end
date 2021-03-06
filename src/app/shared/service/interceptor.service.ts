import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  constructor(private encrypt: EncryptionService) {
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): any {
    const encrypted = localStorage.getItem('token');
    if (encrypted) {
      // const token = this.encrypt.decryptionAES(encrypted);
      const token = encrypted
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(request);
    }else{


    }
  }
}
