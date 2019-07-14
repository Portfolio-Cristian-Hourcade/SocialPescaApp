import { Injectable }          from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';
// import firebase from 'firebase';

import { take } from 'rxjs/operators';

// import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs';

// import { BehaviorSubject} from 'rxjs/BehaviorSubject'

@Injectable()
export class MessagingService {

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    
    ) { }


  updateToken(token,userId) {
    this.afAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.db.object('fcmTokens/').update(data)
      })
  }  

  getPermission(userId) {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token,userId)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    receiveMessage() {
      this.messaging.setBackgroundMessageHandler(function(payload) {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // ...
      });
       this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload)
      });

    }
}