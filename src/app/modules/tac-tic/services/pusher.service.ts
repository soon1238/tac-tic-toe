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
    //  Pusher.logToConsole = true;
     this.pusher = new Pusher(this.pusherKey,{
      authEndpoint: environment.pusher.endpoint,
      cluster: environment.pusher.cluster
    });
    this.messagesChannel = this.pusher.subscribe('private-messages');

  }


}
