import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  VAPID_PUBLIC_KEY = 'replace-with-your-public-key';

  constructor(private snackBar: MatSnackBar, private ngswUpdate: SwUpdate, private ngswPush: SwPush) { }

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      (document.querySelector('body') as any).style = '';
    } else {
      (document.querySelector('body') as any).style = 'filter: grayscale(1)';
    }
  }

  SubcribeToPush() {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        this.ngswPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
          .then((registration: PushSubscription) => {
            console.log(registration);
            // TODO: Send that object to our server
          });
      }
    });
  }

  ngOnInit() {

    // Checking SW Update Status
    this.ngswUpdate.available.subscribe(update => {
      if (update.type === 'UPDATE_AVAILABLE') {
        const sb = this.snackBar.open('There is an Update available', 'Install Now', { duration: 4000 });
        sb.onAction().subscribe(() => {
          this.ngswUpdate.activateUpdate().then(event => {
            console.log('The App was updated');
            location.reload();
          });
        });
      }
    });
    this.ngswUpdate.checkForUpdate();

    // Checking Network Status
    this.updateNetworkStatusUI();
    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);

    // Checking Installation Status
    if ((navigator as any).standalone === false) {
      // This is an iOS device and we are in the browser
      this.snackBar.open('You can add this PWA to the Home Screen',
        '', { duration: 3000 });
    }

    if ((navigator as any).standalone === undefined) {
      // It's not iOS
      if (window.matchMedia('(display-mode: browser').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          const sb = this.snackBar.open('Do you want to install this App?', 'Install',
            { duration: 5000 });

          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then(result => {
              if (result.outcome === 'dismissed') {
                // TODO: Track no installation
              } else {
                // TODO: It was installed
              }
            });
          });
          return false;
        });
      }
    }
  }
}
