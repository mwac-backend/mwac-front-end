import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl} from "@angular/forms";
import { io } from 'socket.io-client';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-follow-up-message',
  templateUrl: './follow-up-message.component.html',
  styleUrls: ['./follow-up-message.component.scss'],
  animations: [
    trigger('popOverState', [
      state(
        'show',
        style({
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('200ms ease-in')),
    ]),
  ],
})
export class FollowUpMessageComponent implements OnInit, OnDestroy {

  @Input() submissionControlID: string = ''
  show = false;
  hideRequiredControl = new FormControl(false);
  socket: any = null;
  isConnectSocket = false;
  listMessage: any[] = [];
  readonly url: string = 'http://68.183.236.106:1191/chat';
  staff: any;
  messageText: string | null = '';

  constructor() { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') || "";
    if(this.submissionControlID) {
      this.connectChat(this.submissionControlID, token);
    }
  }

  ngOnDestroy(): void {
    if(this.socket) this.socket.disconnect();
  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    this.show = !this.show;
  }


  connectChat(submissionControlID: string, token: string) {

    this.socket = io(this.url, {
      extraHeaders: {
        'authorization': `Bearer ${token}`
      },
      query: {
        'submissionControlID': submissionControlID
      },
      reconnection: true
    });

    this.socket.on('error', (data: any) => {
      console.error(data)
    })

    this.socket.on('connect-info', (data: any) => {
      this.staff = data;
    })

    this.socket.on('on-get-message', (data: any) => {
      this.listMessage = data;
    })

    this.socket.on('on-leave', (data: any) => {
      this.listMessage = [...this.listMessage, {isActivate: true, name: data.fullName, action: 'leave'}]
    });

    this.socket.on('on-join', (data: any) => {
      this.listMessage = [...this.listMessage, {isActivate: true, name: data.fullName, action: 'join'}]
    })

  }


  sendMessage(event: any) {
    if(this.messageText) {
      //@ts-ignore
      if(this.socket) {
        this.socket.emit('send-message', {
          message: this.messageText,
          messageTypeID: 1
        });
        this.getMessage();
        this.messageText = null;
      }
    }

  }

  getMessage() {
    if(this.socket) {
      this.socket.emit('get-message', (data: any) => {
        this.listMessage = data;
      });
    }
  }


  changeTextMessage(event: any) {
    console.log(event)
  }


}
