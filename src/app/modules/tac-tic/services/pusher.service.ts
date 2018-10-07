import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare const Pusher: any;


@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  pusherKey: any = environment.pusher.key;
  messagesChannel: any;


  constructor() { 
     Pusher.logToConsole = true;
     this.pusher = new Pusher('e31eef0acf7f58091bd0',{
      authEndpoint: 'http://localhost:7200/pusher/auth',
      cluster: 'ap1'
    });
    this.messagesChannel = this.pusher.subscribe('private-messages');

  }


}
