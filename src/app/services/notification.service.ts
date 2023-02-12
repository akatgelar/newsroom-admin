import {Injectable} from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/messaging';
import {environment} from '../../environments/environment';
import { SessionService } from './session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

  constructor(
    private httpClient: HttpClient,
    private session: SessionService
  ) {}

  // init(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //       navigator.serviceWorker.ready.then((registration) => {
  //           // Don't crash an error if messaging not supported
  //           if (!firebase.messaging.isSupported()) {
  //                  resolve();
  //                  return;
  //           }

  //           const messaging = firebase.messaging();

  //           // Register the Service Worker
  //           messaging.useServiceWorker(registration);

  //           // Initialize your VAPI key
  //           messaging.usePublicVapidKey(
  //                 environment.firebase.vapidKey
  //           );

  //           // Optional and not covered in the article
  //           // Listen to messages when your app is in the foreground
  //           messaging.onMessage((payload) => {
  //               // console.log(payload);
  //           });
  //           // Optional and not covered in the article
  //           // Handle token refresh
  //           messaging.onTokenRefresh(() => {
  //               messaging.getToken().then(
  //               (refreshedToken: string) => {
  //                   // console.log(refreshedToken);
  //               }).catch((err) => {
  //                   // console.error(err);
  //               });
  //           });

  //           resolve();
  //       }, (err) => {
  //           reject(err);
  //       });
  //   });
  // }

  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        if (!Notification) {
            resolve();
            return;
        }
        if (!firebase.messaging.isSupported()) {
            resolve();
            return;
        }
        try {
            const messaging = firebase.messaging();
            // tslint:disable-next-line: deprecation
            await messaging.requestPermission();
            const token: string = await messaging.getToken();
            // console.log('User notifications token:', token);

            const jwt = this.session.getToken().toString();
            // console.log(jwt);
            if (jwt) {
              this.sendToken(token);
            }
        } catch (err) {
            // No notifications granted
        }

        resolve();
    });
  }

  sendToken(token) {
    const url = environment.apiUrl + 'firebase_token';
    const formValue = {'token': token};
    const jsonValue = JSON.stringify(formValue);
    const option = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'zAuth': 'ra4486a867cb66c2659d3',
        'zLanguage': 'en',
        'zToken': this.session.getToken().toString()
      })
    };

    this.httpClient
    .post(url, jsonValue, option)
    .subscribe(
      response => {
        // console.log('success', response);
      },
      error => {
        // console.log('error', error);
      }
    );
  }
}
