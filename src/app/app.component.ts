import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { PwaService } from './services/pwa.service';
import { SessionService } from './services/session.service';
import { NotificationService } from './services/notification.service';
import {firebase} from '@firebase/app';
import {environment} from '../environments/environment';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private platform: Platform,
    private router: Router,
    private pwaService: PwaService,
    private session: SessionService,
    private notifications: NotificationService
  ) {

    router.events.forEach(async (event: NavigationEvent) => {

      // Berfore Navigation
      if (event instanceof NavigationStart) {
        const url = event.url;
        const routing = url.split('/');
        window.scrollTo(0, 0);
        // console.log(url);
        // console.log(routing);

        const tokens = this.session.getToken();
        this.session.isLoggedIn().subscribe(
          response => {
            // console.log(response);
            try {
              if (response['success'] === true) {
                if (routing[1] === 'login') {
                  // console.log('session true, redirect to dashboard');
                  this.router.navigate(['dashboard']);
                } else if (routing[1] === 'logout') {
                  // console.log('logouting');
                } else if (routing[1] === '404') {
                  // console.log('not found page');
                } else if (routing[1] === '500') {
                  // console.log('error page');
                } else {
                  // console.log('page');
                }
              } else {
                if (routing[1] === 'login') {
                  // console.log('login');
                } else if (routing[1] === 'logout') {
                  // console.log('logouting');
                } else if (routing[1] === '404') {
                  // console.log('not found page');
                } else if (routing[1] === '500') {
                  // console.log('error page');
                } else {
                  // console.log('session false, redirect to login');
                  this.router.navigate(['login']);
                }
              }
            } catch (error) {
              // console.log('fail check session');
              this.session.logOut();
              this.router.navigate(['login']);
            }
          },
          err => {
            // console.log('session expired, logouting...');
            this.session.logOut();
            this.router.navigate(['login']);
          }
        );
      }

    });
  }

  async ngOnInit() {

    // firebase.initializeApp(environment.firebase);
    // await this.notifications.init();

    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });
  }

  async ngAfterViewInit() {
    // await this.notifications.requestPermission();
  }
}
