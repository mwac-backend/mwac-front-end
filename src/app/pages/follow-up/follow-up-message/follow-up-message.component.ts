import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl} from "@angular/forms";
import { io } from 'socket.io-client';

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
  readonly url: string = 'http://localhost:3006/chat';


  constructor() { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') || "";
    this.connectChat(this.submissionControlID, token);
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
      auth: {
        'authorization': `Bearer ${token}`
      },
      query: {
       submissionControlID,
      }
    });

    this.socket.on('on-get-message', (data: any) => {
      console.log(data);
    })

    this.socket.on('error', (data: any) => {
      console.log(data);
    })

  }


}
