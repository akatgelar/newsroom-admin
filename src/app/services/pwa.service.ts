import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { PromptComponent } from '../prompt/prompt.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform,
    private readonly updates: SwUpdate,
    private snackBar: MatSnackBar
  ) {
    this.updates.available.subscribe(event => {
      this.showAppUpdateAlert();
    });
  }

  initPwaPrompt() {
    // console.log(this.platform);

    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }

    if (this.platform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
    .pipe(take(1))
    .subscribe(() => {
      // console.log(mobileType);
      this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } });
    });
  }

  showAppUpdateAlert() {
    const header = 'App Update available';
    const message = 'Update Now';
    const action = this.doAppUpdate;
    const caller = this;
    // Use MatDialog or ionicframework's AlertController or similar
    // presentAlert(header, message, action, caller);
    // console.log('show snackbar');
    const snackBarRef = this.snackBar.open(header, message);
    snackBarRef.onAction().subscribe(() => {
      // console.log('Update');
      this.doAppUpdate();
    });
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }

}

