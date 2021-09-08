import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;
  readonly url: string = "http://localhost:3006/chat";

  constructor() {
  }

  connectChat() {

  }


}
